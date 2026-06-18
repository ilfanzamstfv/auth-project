import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "@/services/auth"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import googleIcon from "@/assets/icons/googleIcons.svg"
import githubIcon from "@/assets/icons/githubIcons.svg"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await login(form)
      localStorage.setItem("token", res.data.token)
      navigate("/home")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-screen h-screen bg-linear-to-r from-slate-800 to-slate-700">
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-sm mx-4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Login to your account</CardTitle>
            <CardDescription className="text-sm">Don't have an account? <Link to="/signup" className="underline hover:text-black font-medium">Sign up</Link></CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full mt-6" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <div className="space-y-4">
              <div className="flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or login with
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Login with Google <img src={googleIcon} alt="Google" className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="w-full">
              Login with Github <img src={githubIcon} alt="Github" className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}