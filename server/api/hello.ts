import axios from "axios"
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    try {
        const response = await axios.get(`http://localhost:8000/api/users`,{
            headers: {
                'application-type': 'application/json',
                'Authorization': `Bearer ${config.apiToken}`
            }
        });
        return response.data;
    } catch (error) {
        return { error: 'Failed to fetch data' };
    }
})