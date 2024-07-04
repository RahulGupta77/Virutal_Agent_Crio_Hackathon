from langchain.llms import GooglePalm
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain.prompts import PromptTemplate
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceInstructEmbeddings
from dotenv import load_dotenv
import os

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

def main():
    load_environment_variables()
    
    # Path to the saved FAISS index
    DB_FAISS_PATH = "vectorDatabase/db_faiss"
    
    # Initialize the embeddings
    embeddings = initialize_embeddings()
    
    # Load the FAISS index
    docsearch = load_faiss_index(DB_FAISS_PATH, embeddings)
    
    # Initialize the language model
    llm = initialize_llm(os.environ['GOOGLE_API_KEY'])
    
    # Initialize the Conversational Retrieval Chain
    qa = initialize_conversational_chain(llm, docsearch)
    
    # Chat history
    chat_history = []

    while True:
        query = input("Input Prompt: ")
        if query == 'exit':
            print('Exiting')
            break  
        if query == '':
            continue

        result = qa({"question": query, "chat_history": chat_history})
        print("Response: ", result['answer'])
        
        # Update chat history
        chat_history.append((query, result['answer']))

if __name__ == "__main__":
    main()
