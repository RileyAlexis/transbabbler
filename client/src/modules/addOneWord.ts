import axios from "axios"

export const addOneWord = async (database: string, collection: string, word: string): Promise<any[]> => {
    const response = await axios.post(`/api/words/addOneWord`, { databaseName: database, type: collection, word: word });
    return response.data;
}