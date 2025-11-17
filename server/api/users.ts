export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    
    try {
        // Fetch from external API with token on server-side
        const data = await $fetch('http://localhost:8000/api/users', {
            headers: {
                'Authorization': `Bearer ${config.apiToken}`
            }
        })
        
        return data
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch users'
        })
    }
})
