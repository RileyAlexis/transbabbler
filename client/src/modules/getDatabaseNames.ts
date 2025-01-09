import axios from "axios";

export const getDatabaseNames = async (): Promise<any> => {
    const response = await axios.get('/api/data/databaseNames');
    const namesArray = response.data.map((item: { name: string }) => item.name);
    return namesArray;
}