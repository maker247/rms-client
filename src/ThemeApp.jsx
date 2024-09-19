import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react"

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import { App } from "./App"

import { authenticate } from "./lib/admin/authFetcher"

const initialState = {
  theme: "system",
  setTheme: () => null,
}

export const queryClient = new QueryClient()

const ThemeProviderContext = createContext(initialState)

export const AppContext = createContext()

export const useApp = () => useContext(AppContext)

export function ThemeApp({
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [auth, setAuth] = useState(false)

  const [theme, setTheme] = useState(
    () => (localStorage.getItem(storageKey)) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  useEffect(() => {
    authenticate()
      .then(user => user && setAuth(user))
  }, [])

  const value = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      <QueryClientProvider
        client={queryClient}
      >
        <AppContext.Provider
          value={{
            auth,
            setAuth
          }}
        >
          <App />
        </AppContext.Provider>
      </QueryClientProvider>
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
