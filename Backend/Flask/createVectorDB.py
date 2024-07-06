from langchain.document_loaders.csv_loader import CSVLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceInstructEmbeddings
from langchain.vectorstores import FAISS

def load_csv_data(file_path, columns):
    """
    Load data from a CSV file for the specified columns.
    """
    data = []
    for column in columns:
        data += CSVLoader(file_path=file_path, source_column=column).load()
    return data

def split_text_into_chunks(data, chunk_size=500, chunk_overlap=20):
    """
    Split text into chunks using RecursiveCharacterTextSplitter.
    """
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    return text_splitter.split_documents(data)

def generate_embeddings_and_create_db(text_chunks, model_name, db_path):
    """
    Generate embeddings from text chunks and create a FAISS vector database.
    """
    embeddings = HuggingFaceInstructEmbeddings(model_name=model_name)
    docsearch = FAISS.from_documents(text_chunks, embeddings)
    docsearch.save_local(db_path)

def process_csv_to_vector_db(file_path, columns, model_name, db_path, chunk_size=500, chunk_overlap=20):
    """
    Process a CSV file and create a FAISS vector database.
    """
    data = load_csv_data(file_path, columns)
    text_chunks = split_text_into_chunks(data, chunk_size, chunk_overlap)
    generate_embeddings_and_create_db(text_chunks, model_name, db_path)

# Example usage:
columns_faq = ["Question", "Sprint", "Micro Experience", "Module", "Milestone"]
file_path_faq = 'csv_files/Qkart_FAQs.csv'
db_path_faq = "vectorDatabase/db_faiss_faq"

columns_delivery = ["Question", "Response"]
file_path_delivery = 'csv_files/delivery_faqs.csv'
db_path_delivery = "vectorDatabase/db_faiss_delivery"

# Process Qkart FAQs CSV
process_csv_to_vector_db(file_path_faq, columns_faq, "hkunlp/instructor-large", db_path_faq)

# Process Delivery FAQs CSV
process_csv_to_vector_db(file_path_delivery, columns_delivery, "hkunlp/instructor-large", db_path_delivery)
