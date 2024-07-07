# Backend - Node.js Documentation

## Description

This backend, developed using Node.js, aims to facilitate a seamless data flow interface for a Virtual Chat Agent. This agent utilizes the capabilities of Large Language Models (LLMs) to provide cutting-edge, real-time responses pertinent to the Crio Module associated with the Qkart Frontend Modules.

## Features

- **Authentication functionalities**: Includes user login and registration capabilities.
- **Conversation management**: Allows users to start new conversations.
- **Message management**: Enables adding new messages to conversations, complete with timestamps.
- **Conversation retrieval**: Fetches a list of conversations for a specific user.
- **Message retrieval**: Retrieves all messages from a specific conversation.

## Base URL

The base URL for all API requests is:

`https://virutal-agent-crio-hackathon-ika5.onrender.com`

## Endpoints

### `POST /register`

Registers a new user in the database.

#### Request
- **URL**: `/register`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  \`\`\`json
  {
    "username": "string",
    "password": "string",
  }
  \`\`\`

#### Response
- **Status**: `201 Created`
- **Body**:
  \`\`\`json
{
  "_id": {
    "$oid": "String"
  },
  "username": "String",
  "password": "String",
  "conversations": [
    {
      "$oid": "String"
    }
  ],
  "__v": Number
}
  \`\`\`

### `POST /login`

Authenticates a user and returns a token.

#### Request
- **URL**: `/login`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  \`\`\`json
  {
    "username": "string",
    "password": "string"
  }
  \`\`\`

#### Response
- **Status**: `200 OK`
- **Body**:
  \`\`\`json
  {
    "verified": Boolean
  }
  \`\`\`

### `POST /conversations`

Creates a new conversation for a user.

#### Request
- **URL**: `/conversations/new`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`
- **Body**:
  \`\`\`json
  {
    "username": "string",
    question": "string",
    "response": "string"
  }
  \`\`\`

#### Response
- **Status**: `201 Created`
- **Body**:
  \`\`\`json
  {
    "title": "string",
    "id": "string",
  }
  \`\`\`

