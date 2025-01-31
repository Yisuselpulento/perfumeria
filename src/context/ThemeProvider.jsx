import { createContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const localTheme = window.localStorage.getItem('theme')
    if (localTheme) {
      return localTheme
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })


  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html').classList.add('dark')
    } else {
      document.querySelector('html').classList.remove('dark')
    }

    window.localStorage.setItem('theme', theme)
  }, [theme])

  const handleChangeMode = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{
      handleChangeMode,
      theme,
    }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider }
export default ThemeContext
