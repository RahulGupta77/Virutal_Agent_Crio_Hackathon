from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.llms import GooglePalm
from langchain.chains import ConversationalRetrievalChain
from langchain.prompts import PromptTemplate
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceInstructEmbeddings
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

def load_environment_variables():
    load_dotenv()
    os.environ['GOOGLE_API_KEY'] = os.getenv("GOOGLE_API_KEY")

def initialize_embeddings(model_name="hkunlp/instructor-large"):
    return HuggingFaceInstructEmbeddings(model_name=model_name)

def load_faiss_index(db_faiss_path, embeddings):
    return FAISS.load_local(db_faiss_path, embeddings)

def initialize_llm(api_key, temperature=0.5):
    return GooglePalm(google_api_key=api_key, temperature=temperature)

def create_prompt_template():
    prompt_template = """Given the following context and a question, provide a response based on the context only.
    If the answer is not found in the context, kindly state "My human colleague will help you here, so kindly give me a moment 😊" Don't try to make up an answer.

    CONTEXT: {context}

    QUESTION: {question}"""
    
    return PromptTemplate(template=prompt_template, input_variables=["context", "question"])

def initialize_conversational_chain(llm, docsearch, prompt_template):

    chain_type_kwargs = {"prompt": prompt_template}

    return ConversationalRetrievalChain.from_llm(
       llm,
        chain_type="stuff",
        retriever=docsearch.as_retriever(),
        combine_docs_chain_kwargs=chain_type_kwargs
    )

# Loading the environment variables 
load_environment_variables()

# For QKart FAQs
DB_FAISS_PATH_QKART = "./vectorDatabase/db_faiss_Qkart" 
embeddings_qkart = initialize_embeddings()
docsearch_qkart = load_faiss_index(DB_FAISS_PATH_QKART, embeddings_qkart)
llm_qkart = initialize_llm(os.environ['GOOGLE_API_KEY'])
prompt_template_qkart = create_prompt_template()
qa_qkart = initialize_conversational_chain(llm_qkart, docsearch_qkart, prompt_template_qkart)
chat_history_qkart = []

# For Sales FAQs
DB_FAISS_PATH_SALES = "./vectorDatabase/db_faiss_Sales"  
embeddings_sales = initialize_embeddings()
docsearch_sales = load_faiss_index(DB_FAISS_PATH_SALES, embeddings_sales)
llm_sales = initialize_llm(os.environ['GOOGLE_API_KEY'])
prompt_template_sales = create_prompt_template()
qa_sales = initialize_conversational_chain(llm_sales, docsearch_sales, prompt_template_sales)
chat_history_sales = []

@app.route('/qkart-faqs', methods=['POST'])
def qkart_faqs():
    try:
        if request.content_type != 'application/json':
            return jsonify({'error': 'Content-Type must be application/json'}), 415

        data = request.get_json()
        question = data.get('question')
        if not question:
            return jsonify({'error': 'No question provided'}), 400

        result = qa_qkart({"question": question, "chat_history": chat_history_qkart})
        answer = result['answer']
        
        # Updating qkart-faqs chat history
        chat_history_qkart.append((question, answer))
        
        return jsonify({'answer': answer})
    except Exception as e:
        return jsonify({'Please provide an appropriate  question!! 🙁'}), 500

@app.route('/sales-faqs', methods=['POST'])
def sales_faqs():
    try:
        if request.content_type != 'application/json':
            return jsonify({'error': 'Content-Type must be application/json'}), 415

        data = request.get_json()
        question = data.get('question')
        if not question:
            return jsonify({'error': 'No question provided'}), 400

        result = qa_sales({"question": question, "chat_history": chat_history_sales})
        answer = result['answer']
        
        # Updating sales chat history
        chat_history_sales.append((question, answer))
        
        return jsonify({'answer': answer})
    except Exception as e:
        return jsonify({'Please provide an appropriate  question!! 🙁'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
