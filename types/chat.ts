
export interface ChatMessage {
  userId: string;
  message: string;
  timestamp?: number;
}

export interface ServerToClientEvents {
  chatList: (chatIds: string[]) => void;
  sendMessage: (message: ChatMessage) => void;
  listMessageGroup: (limit?: number) => ChatMessage[];
  listMessagePrivate: (limit?: number) => ChatMessage[];
  newMessage: (message: ChatMessage) => void;
}

export interface ClientToServerEvents {
  listGroup: () => string[];

}

export interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}