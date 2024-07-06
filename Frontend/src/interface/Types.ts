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
