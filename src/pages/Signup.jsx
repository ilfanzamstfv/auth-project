import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { register } from "@/services/auth"

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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Field } from "@/components/ui/field"

export default function Signup() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: "", email: "", password: "" })
    const [agreed, setAgreed] = useState(false)
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
            const res = await register(form)
            localStorage.setItem("token", res.data.token)
            navigate("/home")
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-screen h-screen bg-linear-to-r from-slate-800 to-slate-700">
            <div className="flex justify-center items-center h-screen">
                <Card className="w-full max-w-sm mx-4">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                        <CardDescription className="text-sm">Already have an account? <Link to="/" className="underline hover:text-black font-medium">Log in</Link></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
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
                                        <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="text-muted-foreground text-sm">
                                        Must be at least 8 characters.
                                    </div>
                                </div>
                                <Field orientation="horizontal">
                                    <Checkbox id="terms-checkbox" name="terms-checkbox" checked={agreed} onCheckedChange={setAgreed} />
                                    <Label htmlFor="terms-checkbox">I agree with terms and conditions</Label>
                                </Field>
                            </div>
                            <Button type="submit" className="w-full mt-6" disabled={loading || !agreed}>
                                {loading ? "Loading..." : "Create account"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
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