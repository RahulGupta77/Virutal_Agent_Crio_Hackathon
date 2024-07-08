# QKart and Sales FAQs API

This project is a Flask-based web service that provides answers to frequently asked questions (FAQs) about QKart and Sales using pre-built vector databases and a conversational AI model.

## Project Structure

The project consists of the following components:

- **Flask Application**: A web server that handles incoming HTTP requests and provides responses.
- **Embeddings**: Utilizes HuggingFace's Instruct Embeddings model for generating vector embeddings from text.
- **FAISS**: Facebook AI Similarity Search library for efficient similarity search.
- **GooglePalm**: A language model from Google used to generate responses.
- **ConversationalRetrievalChain**: A chain that combines a conversational model with a retriever for retrieving relevant documents and generating answers.

## Features

### Vector Database

Two FAISS vector databases are used, one for QKart FAQs and one for Sales FAQs. These databases are created prior to running this code and stored at the specified paths.

### Embeddings

The `HuggingFaceInstructEmbeddings` model is used to generate embeddings from text. This is initialized with the `hkunlp/instructor-large` model.

### Conversational AI Model

The `GooglePalm` model is used to generate responses to the questions. This model is initialized with the API key and a specified temperature for response variability.

### Prompt Template

A prompt template is defined to instruct the model on how to generate responses based on the provided context and question.

### Conversational Retrieval Chain

Two instances of `ConversationalRetrievalChain` are created, one for QKart FAQs and one for Sales FAQs. These chains use the respective FAISS vector databases and the conversational AI model to generate answers.

## API Endpoints

| **Q-Kart FAQs**                   | **Sales FAQs**                   |
|-----------------------------------|----------------------------------|
| ```http://localhost:5000/qkart-faqs``` |  ```http://localhost:5000/sales-faqs```
| **Method**: `POST`                | **Method**: `POST`               |
| **Content-Type**: `application/json` | **Content-Type**: `application/json` |
| **Request Body**:                 | **Request Body**:                |
| {                                 | {                                |
|     "question": "Your question here" |     "question": "Your question here" |
| }                                 | }                                |



## Installation 

Follow these steps to install and run the Flask application:

## Prerequisites

- Python 3.7 or higher

## Steps

    

1. **Create a Virtual Environment**:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

2. **Install Dependencies**:
    ```sh
    pip install -r requirements.txt
    ```

3. **Set Up Environment Variables**:
    - Create a `.env` file in the project root directory.
    - Add your Google API key to the `.env` file:
      ```env
      GOOGLE_API_KEY=your_google_api_key
      ```
    - You can use this api key for testing purpose, use your crio email-id and refer to [this document](https://docs.google.com/document/d/17KDU6o3SNafn1w1s3r3BVGT2D4WxE-QixIvPS43icjk/edit?usp=sharing)

4. **Run the Application**:
    ```sh
    python app.py
    ```

The application will be accessible at `http://0.0.0.0:5000`.


## Example Questions


| QKart FAQs                                                                       | Sales FAQs                                                                      |
|----------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| 1. What is QKart?                                                                | 1. What information do I need to provide when using the RTGS funds transfer service? |
| 2. Do we have to implement the backend?                                          | 2. How do I read my statement?                                                   |
| 3. What are the prerequisites/eligibility for this project?                      | 3. How do I cancel my auto-pay instruction?                                      |
| 4. What is the duration/time needed to complete this project?                    | 4. How to redeem the reward points?                                              |
| 5. What is the architecture of this project?                                     | 5. Can I use my Debit Card to pay online?                                        |
| 6. How to get the starter code?                                                  | 6. How do I reset my password?                                                   |
| 7. I cannot see my website even though I gave the correct URL.                   | 7. What is the validity of the offers?                                           |
| 8. What does the `src/__tests__` folder contain?                                 | 8. How can I register for Autopay?                                               |
| 9. What to do in the authentication module?                                      | 9. When will I receive my changed ATM PIN?                                       |
| 10. How to start my application/react app?                                       | 10. What should I do if I've entered the wrong Credit Card number?               |


Feel free to try asking the bot these questions in different ways while keeping the meaning the same. This will help you get more accurate and useful responses.

