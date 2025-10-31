'use client';

import { useState, useRef, useEffect } from 'react';
import { useUserData } from '@/hooks/useUserData';
import { AIChat } from '@/types/medflow';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Send, Bot, User } from 'lucide-react';

export default function AIAssistant() {
  const { user } = useUserData();
  const [messages, setMessages] = useState<AIChat[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Simulated initial message
  useEffect(() => {
    setMessages([
      {
        id: '1',
        timestamp: new Date().toISOString(),
        role: 'assistant',
        content: `Hello ${user?.name}! I'm your MedFlow AI assistant. I can help you with:
- Patient data analysis
- Treatment recommendations
- Ward allocation suggestions
- Staff scheduling optimization
- Medical record summaries

How can I assist you today?`,
      },
    ]);
  }, [user?.name]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: AIChat = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response - replace with actual API call
    setTimeout(() => {
      const aiResponse: AIChat = {
        id: (Date.now() + 1).toString(),
        timestamp: new Date().toISOString(),
        role: 'assistant',
        content: 'I understand you need assistance. Let me analyze the available data and provide you with a detailed response. [This is a placeholder response - integrate with Claude API for actual AI interactions]',
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="p-6 h-[calc(100vh-6rem)]">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>AI Assistant</CardTitle>
          <CardDescription>
            Get intelligent insights and assistance for patient care
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'assistant' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {message.role === 'assistant' ? (
                      <Bot size={20} className="text-blue-600" />
                    ) : (
                      <User size={20} className="text-gray-600" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-4 max-w-[80%] ${
                      message.role === 'assistant'
                        ? 'bg-blue-50 text-blue-900'
                        : 'bg-gray-50 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.context && (
                      <div className="mt-2 text-sm opacity-70">
                        {message.context.patientId && (
                          <span className="mr-2">Patient: {message.context.patientId}</span>
                        )}
                        {message.context.wardId && (
                          <span>Ward: {message.context.wardId}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot size={20} className="text-blue-600" />
                  </div>
                  <div className="rounded-lg p-4 bg-blue-50">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="mt-4 flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="flex gap-2"
            >
              <Send size={16} />
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}