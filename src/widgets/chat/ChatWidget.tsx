import { Button, Card, CardContent, Input } from "@mui/material";
import { Message } from "entities/message/types";
import { useFetchMessages } from "@/features/fetchMessages";
import { useSendMessage } from "@/features/sendMessage";
import { useMemo, useState } from "react";
import { ChatHistory } from "@/shared/ui/ChatHistory";

export const ChatWidget = () => {
    const [idInstance, setIdInstance] = useState("");
    const [apiTokenInstance, setApiTokenInstance] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [message, setMessage] = useState("");

    const MemoizedChatHistory = useMemo(
        () => <ChatHistory chatHistory={chatHistory} />,
        [chatHistory]
    );

    const { sendMessage } = useSendMessage(
        idInstance,
        apiTokenInstance,
        phoneNumber,
        message,
        setMessage,
        setChatHistory
    );
    const { fetchMessages } = useFetchMessages(
        idInstance,
        apiTokenInstance,
        phoneNumber,
        setChatHistory
    );

    return (
        <div className="p-4">
            <Card className="mb-4">
                <CardContent>
                    <div className="grid gap-4">
                        <Input
                            placeholder="idInstance"
                            value={idInstance}
                            onChange={(e) => setIdInstance(e.target.value)}
                        />
                        <Input
                            placeholder="apiTokenInstance"
                            value={apiTokenInstance}
                            onChange={(e) =>
                                setApiTokenInstance(e.target.value)
                            }
                        />
                        <Input
                            placeholder="Recipient Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex gap-2">
                <Input
                    className="flex-grow"
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button onClick={sendMessage}>Send</Button>
                <Button variant="outlined" onClick={fetchMessages}>
                    Refresh
                </Button>
            </div>

            {MemoizedChatHistory}
        </div>
    );
};
