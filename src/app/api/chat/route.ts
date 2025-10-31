import { NextRequest, NextResponse } from 'next/server';
import { 
  getConversation, 
  addMessageToConversation, 
  createConversation 
} from '@/lib/conversation';
import { callGeminiAPI, generateSystemPrompt } from '@/lib/anthropic';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get or create conversation
    let conversation = conversationId ? getConversation(conversationId) : null;
    
    if (!conversation) {
      conversation = createConversation();
    }

    // Add user message to conversation
    conversation = addMessageToConversation(conversation.id, {
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    // Generate system prompt with context
    const systemPrompt = generateSystemPrompt();

    // Call Gemini API
    const aiResponse = await callGeminiAPI(conversation.messages, systemPrompt);

    // Add AI response to conversation
    conversation = addMessageToConversation(conversation.id, {
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    });

    return NextResponse.json({
      conversationId: conversation.id,
      message: {
        id: conversation.messages[conversation.messages.length - 1].id,
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const conversationId = url.searchParams.get('conversationId');

    if (!conversationId) {
      return NextResponse.json(
        { error: 'Conversation ID is required' },
        { status: 400 }
      );
    }

    const conversation = getConversation(conversationId);

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(conversation);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversation' },
      { status: 500 }
    );
  }
}