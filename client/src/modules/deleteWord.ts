import axios from "axios"

export const deleteWord = async (database: string, collection: string, word: string): Promise<any[]> => {
    const response = await axios.delete(`/api/words/deleteWord`, { data: { databaseName: database, type: collection, word: word } });
    return response.data;
}