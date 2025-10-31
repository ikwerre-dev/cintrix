import fs from 'fs';
import path from 'path';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

const CONVERSATIONS_DIR = path.join(process.cwd(), 'data', 'conversations');

// Ensure the conversations directory exists
export const ensureConversationsDir = () => {
  if (!fs.existsSync(CONVERSATIONS_DIR)) {
    fs.mkdirSync(CONVERSATIONS_DIR, { recursive: true });
  }
};

// Get a conversation by ID
export const getConversation = (conversationId: string): Conversation | null => {
  ensureConversationsDir();
  const filePath = path.join(CONVERSATIONS_DIR, `${conversationId}.json`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading conversation file:', error);
    return null;
  }
};

// Create a new conversation
export const createConversation = (): Conversation => {
  ensureConversationsDir();
  const conversationId = Date.now().toString();
  
  const conversation: Conversation = {
    id: conversationId,
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  saveConversation(conversation);
  return conversation;
};

// Save a conversation to file
export const saveConversation = (conversation: Conversation): void => {
  ensureConversationsDir();
  const filePath = path.join(CONVERSATIONS_DIR, `${conversation.id}.json`);
  
  try {
    fs.writeFileSync(filePath, JSON.stringify(conversation, null, 2));
  } catch (error) {
    console.error('Error saving conversation file:', error);
  }
};

// Add a message to a conversation
export const addMessageToConversation = (
  conversationId: string,
  message: Omit<Message, 'id'>
): Conversation => {
  let conversation = getConversation(conversationId);
  
  if (!conversation) {
    conversation = createConversation();
  }
  
  const newMessage: Message = {
    ...message,
    id: Date.now().toString()
  };
  
  conversation.messages.push(newMessage);
  conversation.updatedAt = new Date();
  
  saveConversation(conversation);
  return conversation;
};

// Get all conversations
export const getAllConversations = (): Conversation[] => {
  ensureConversationsDir();
  
  try {
    const files = fs.readdirSync(CONVERSATIONS_DIR);
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filePath = path.join(CONVERSATIONS_DIR, file);
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  } catch (error) {
    console.error('Error reading conversations directory:', error);
    return [];
  }
};