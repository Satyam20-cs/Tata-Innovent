import AppHeader from "@/components/layout/app-header";
import { ChatInterface } from "@/components/assistant/chat-interface";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

export default function AssistantPage() {
    return (
        <div className="flex flex-col h-dvh">
            <AppHeader title="AI Diagnostic Assistant" />
            <div className="flex-1 p-4 sm:p-6 lg:p-8">
                <Card className="h-full flex flex-col">
                    <CardHeader className="flex-row items-start gap-4 space-y-0">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                            <Bot className="w-6 h-6 text-primary"/>
                        </div>
                        <div>
                            <CardTitle>Diagnostic Assistant</CardTitle>
                            <CardDescription>
                                Ask me anything about your vehicle's issues, error codes, or maintenance.
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col-reverse overflow-hidden p-0">
                       <ChatInterface />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
