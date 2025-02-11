import axios from "axios";

export const sendMessageRequest = async (
    idInstance: string,
    apiTokenInstance: string,
    phoneNumber: string,
    message: string
) => {
    const apiUrl = `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;
    return axios.post(apiUrl, { chatId: `${phoneNumber}@c.us`, message });
};

export const fetchMessagesRequest = async (
    idInstance: string,
    apiTokenInstance: string,
    phoneNumber: string
) => {
    const apiUrl = `https://api.green-api.com/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`;
    return axios.post(apiUrl, {
        chatId: `${phoneNumber}@c.us`,
    });
};
