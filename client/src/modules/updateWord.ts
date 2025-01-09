import axios from "axios"

export const updateWord = async (database: string, collection: string, newWord: string, originalWord: string): Promise<any[]> => {
    const response = await axios.post(`/api/words/updateWord`, { databaseName: database, type: collection, originalWord: originalWord, newWord: newWord });
    return response.data;
}