
'use client';

import { useState, useRef, useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getDiagnosticAdviceAction } from '@/app/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Loader2, Send, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  text: string;
};

const initialState = {
  advice: null,
  error: null,
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [state, formAction] = useActionState(getDiagnosticAdviceAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.advice) {
      setMessages(prev => [
        ...prev.filter(m => m.id !== -1), // remove loading
        { id: Date.now(), role: 'assistant', text: state.advice },
      ]);
    }
    if (state.error) {
        setMessages(prev => [...prev.filter(m => m.id !== -1)]); // remove loading
        // Optionally show a toast or an error message in chat
    }
  }, [state]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);


  const handleFormSubmit = (formData: FormData) => {
    const query = formData.get('query') as string;
    if (!query) return;

    setMessages(prev => [
      ...prev,
      { id: Date.now(), role: 'user', text: query },
      { id: -1, role: 'assistant', text: '...' } // Temporary loading message
    ]);

    formAction(formData);
    formRef.current?.reset();
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map(message => (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-4',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-9 w-9">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Bot className="h-5 w-5" />
                    </div>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-[75%] rounded-lg p-3 text-sm whitespace-pre-wrap',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                {message.id === -1 ? (
                    <div className="flex items-center justify-center p-1">
                        <Loader2 className="h-4 w-4 animate-spin"/>
                    </div>
                ) : message.text}
              </div>
              {message.role === 'user' && (
                <Avatar className="h-9 w-9">
                  <AvatarFallback><User/></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4 bg-card">
        <form
          ref={formRef}
          action={handleFormSubmit}
          className="flex items-center gap-2"
        >
          <Input
            name="query"
            placeholder="Type your question..."
            className="flex-1"
            autoComplete="off"
          />
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
    </Button>
  );
}
