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
  verified:boolean;
  username:string;
}