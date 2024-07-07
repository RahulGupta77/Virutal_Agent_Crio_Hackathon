export interface Message {
  id: string;
  message: string;
  senderId: string;
}

export interface Conversation {
  id: string;
  title: string;
  messageId: string[];
}

export interface User {
  username: string;
  password: string;
}

export interface LoginRes {
  verified: boolean;
  username: string;
}

export interface NewConversation {
  sprint: string;
  microExperience: string;
  module: string;
  query: string;
  username: string;
  milestone: string;
  response: string;
}

export interface AllConversationRes {
  _id: string;
  conversations: ConversationRes[];
}

export interface ConversationRes {
  _id: string;
  title: string;
  sprint: string;
  microExperience: string;
  module: string;
  milestone: string;
  message: string[];
  __v: number;
}

export interface  Converse{
  title:string;
  id:string
}
