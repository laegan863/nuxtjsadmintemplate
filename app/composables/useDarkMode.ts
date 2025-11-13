export const useDarkMode = () => {
  // Use useState inside the composable function
  const isDarkMode = useState<boolean>('darkMode', () => false)

  const applyTheme = (dark: boolean) => {
    if (process.client) {
      if (dark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  const initTheme = () => {
    if (process.client) {
      const saved = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const shouldBeDark = saved ? saved === 'dark' : prefersDark
      
      isDarkMode.value = shouldBeDark
      applyTheme(shouldBeDark)
    }
  }

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    applyTheme(isDarkMode.value)
    
    if (process.client) {
      localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
    }
  }

  // Initialize on first call
  onMounted(() => {
    initTheme()
  })

  return {
    isDark: isDarkMode,
    toggleTheme
  }
}