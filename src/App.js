import React, { useCallback, useEffect, useState } from 'react'
import LoginPage from './authentication/LoginPage'
import { initToken } from './requests/TokenizedHttpMethods'
import MainContainer from './container/MainContainer'

const storageName = 'tokenData'

function App() {
  const [token, setToken] = useState(null)
  const [error, setError] = useState('')

  const logout = useCallback((message) => {
    setError(message)
    setToken(null)
    localStorage.removeItem(storageName)
  }, [])

  const login = useCallback(
    (token_) => {
      if (token_) {
        setToken(token_)
        initToken(token_, logout)
        localStorage.setItem(storageName, token_)
      }
    },
    [logout]
  )

  useEffect(() => {
    const token_ = localStorage.getItem(storageName)
    if (token_) {
      login(token_)
    }
  }, [login])

  return (
    <>
      {token ? (
        <MainContainer onLogout={logout} />
      ) : (
        <LoginPage onLogin={login} errorMessage={error} />
      )}
    </>
  )
}

export default App
