import api from "@/lib/api"

// ======= Endpoint Auth =============

//login user 
export const login = (data) => api.post("/login", data)
//create user
export const register = (data) => api.post("/user/create", data)
//get user by id
export const me = (id) => api.get("/user/" + id)