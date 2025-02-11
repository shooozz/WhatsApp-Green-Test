import { useState } from "react";
import { sendMessageRequest } from "@/shared/api/greenApi";
import { useFetchMessages } from "../fetchMessages";

export const useSendMessage = (
    idInstance: string,
    apiTokenInstance: string,
    phoneNumber: string,
    message: string,
    setMessage: Function,
    setChatHistory: Function
) => {
    const sendMessage = async () => {
        if (!idInstance || !apiTokenInstance || !phoneNumber || !message) {
            alert("Please fill all the fields.");
            return;
        }

        try {
            await sendMessageRequest(
                idInstance,
                apiTokenInstance,
                phoneNumber,
                message
            );
            // setChatHistory((prev: any) => [
            //     ...prev,
            //     { sender: "You", text: message },
            // ]);
            setMessage("");
            useFetchMessages(
                idInstance,
                apiTokenInstance,
                phoneNumber,
                setChatHistory
            );
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please check your credentials.");
        }
    };

    return { message, setMessage, sendMessage };
};
