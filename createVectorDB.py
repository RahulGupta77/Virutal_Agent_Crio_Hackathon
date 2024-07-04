from langchain.document_loaders.csv_loader import CSVLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceInstructEmbeddings
from langchain.vectorstores import FAISS
from langchain.document_loaders.csv_loader import CSVLoader

# Load data for each column separately
data_question = CSVLoader(file_path='Qkart_FAQs.csv', source_column="Question").load()
data_sprint =  CSVLoader(file_path='Qkart_FAQs.csv', source_column="Sprint").load()
data_micro_exp = CSVLoader(file_path='Qkart_FAQs.csv', source_column="Micro Experience").load()
data_module = CSVLoader(file_path='Qkart_FAQs.csv', source_column="Module").load()
data_milestone = CSVLoader(file_path='Qkart_FAQs.csv', source_column="Milestone").load()

# Concatenate the loaded data
data = data_question + data_sprint + data_micro_exp + data_module + data_milestone

# Split the text into Chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=20)
text_chunks = text_splitter.split_documents(data)

# Download Sentence Transformers Embedding From Hugging Face
embeddings = HuggingFaceInstructEmbeddings(model_name="hkunlp/instructor-large")

DB_FAISS_PATH = "vectorDatabase/db_faiss"
# COnverting the text Chunks into embeddings and saving the embeddings into FAISS Knowledge Base
docsearch = FAISS.from_documents(text_chunks, embeddings)

docsearch.save_local(DB_FAISS_PATH)