export default async function useCrudGatherData() {
    const data = await $fetch('http://localhost:8000/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer 4Ah-kTd7gR71RTZgtecIJrFS2ahlv3Aj2ZzCvc56zQJm2ni9lTfECvwMOpk9EglCysDNq53PsfznojADNjv0PpGpyEzO2q9WQYlUu87XncPeow8kSAx3lgQn6pkAM3I4BNtNF9iuMhp1-vBaIHNbG55-1V5pk7V4X5TLy772XPHIJy6fMm8hTm3dAqQp6LezQfSrTh2xuAp1PW9Hq7ktqP4XYrPuh5tn0q4cqsLkHNEwEObrjnbXMn6gsatb1rFcJGZWMVSY08VcSghs8rxQOMJ7UjVZE93MWx4DzWvgk-hXF7XYwpuz9wadyzbEyM5aH_cT7Qv4Ulc7NF3ETXtDGw'
        }
    })

    return data
}