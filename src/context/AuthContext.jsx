import { createContext, useContext, useState, useEffect } from "react"
import { me } from "@/services/auth"

const AuthContext = createContext(null)

function decodeToken(token) {
    try {
        const payload = token.split(".")[1]
        return JSON.parse(atob(payload))
    } catch {
        return null
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            setLoading(false)
            return
        }
        try {
            const decoded = decodeToken(token)
            console.log("JWT decoded:", decoded)
            if (!decoded) throw new Error("Invalid token")
            const userId = decoded.id || decoded.userId || decoded.sub
            console.log("User ID:", userId)
            const res = await me(userId)
            console.log("User response:", res.data)
            setUser(res.data.data || res.data)
        } catch {
            localStorage.removeItem("token")
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, fetchUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
