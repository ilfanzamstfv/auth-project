import api from "@/lib/api"

// ======= Endpoint Auth =============

//login user 
export const login = (data) => api.post("/login", data)
//create user
export const register = (data) => api.post("/user/create", data)
