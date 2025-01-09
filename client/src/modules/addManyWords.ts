import axios from "axios"

export const addManyWords = async (database: string, collection: string, words: string[]): Promise<any[]> => {
    const response = await axios.post(`/api/words/addManyWords`, { databaseName: database, type: collection, words: words });
    return response.data;
}