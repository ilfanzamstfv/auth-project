import api from "@/lib/api"

// ======= Endpoint Auth =============

//login user 
export const login = (data) => api.post("/login", data)
//create user
export const register = (data) => api.post("/user/create", data)
//get user by id
export const me = (id) => api.get("/user/" + id)

// send email if forgot password
export const forgotPassword = (data) => api.post("/forgot-password", data)

// verify code
export const verifyCode = (data) => api.post("/verify-reset-code", data)

// reset password
export const resetPassword = (data) => api.post("/reset-password", data)