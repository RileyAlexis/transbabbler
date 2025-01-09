import axios from "axios"

export const loadCollection = async (database: string, collection: string): Promise<string[]> => {
    const response = await axios.get(`/api/words/loadCollection`, { params: { databaseName: database, type: collection } });
    return response.data;
}