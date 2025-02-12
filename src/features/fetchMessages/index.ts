import { fetchMessagesRequest } from '@/shared/api/greenApi'

export const useFetchMessages = (idInstance: string, apiTokenInstance: string, phoneNumber: string, setChatHistory: Function) => {
    const fetchMessages = async () => {
        if (!idInstance || !apiTokenInstance) {
            alert('Please fill in your credentials.')
            return
        }

        try {
            const response = await fetchMessagesRequest(idInstance, apiTokenInstance, phoneNumber)
            setChatHistory(response.data)
        } catch (error) {
            console.error('Error fetching messages:', error)
            alert('Failed to fetch messages.')
        }
    }

    return { fetchMessages }
}
