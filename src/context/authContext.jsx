import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
  const [token, setToken] = useState(localStorage.getItem("token")  || null)

  const login = (userData, tokenData) => {

    setUser(userData)
    setToken(tokenData)

    localStorage.setItem("user", JSON.stringify(userData))
    localStorage.setItem("token", tokenData)
  }

  const logout = () => {
    setUser(null)
    setToken(null)

    localStorage.removeItem("user")
    localStorage.removeItem("token")
    navigate('/login')
  }

  return <AuthContext.Provider value={{ user, token, login, logout }}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider