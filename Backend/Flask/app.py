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

def initialize_llm(api_key, temperature=0.2):
    return GooglePalm(google_api_key=api_key, temperature=temperature)

def create_prompt_template():
    prompt_template = """Given the following context and a question, provide a response based on the context only.
    If the answer is not found in the context, kindly state "I don't know." Don't try to make up an answer.

    CONTEXT: {context}

    QUESTION: {question}"""
    
    return PromptTemplate(template=prompt_template, input_variables=["context", "question"])

def initialize_conversational_chain(llm, docsearch):
    prompt = create_prompt_template()
    chain_type_kwargs = {"prompt": prompt}
    return ConversationalRetrievalChain.from_llm(
        llm,
        chain_type="stuff",
        retriever=docsearch.as_retriever(),
        combine_docs_chain_kwargs=chain_type_kwargs
    )

# Initialize everything once at the start
load_environment_variables()
DB_FAISS_PATH = "vectorDatabase/db_faiss_technical"
embeddings = initialize_embeddings()
docsearch = load_faiss_index(DB_FAISS_PATH, embeddings)
llm = initialize_llm(os.environ['GOOGLE_API_KEY'])
qa = initialize_conversational_chain(llm, docsearch)
chat_history = []

@app.route('/query', methods=['POST'])
def query():
    if request.content_type != 'application/json':
        return jsonify({'error': 'Content-Type must be application/json'}), 415

    data = request.get_json()
    question = data.get('question')
    if not question:
        return jsonify({'error': 'No question provided'}), 400

    result = qa({"question": question, "chat_history": chat_history})
    answer = result['answer']
    
    # Update chat history
    chat_history.append((question, answer))
    
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
