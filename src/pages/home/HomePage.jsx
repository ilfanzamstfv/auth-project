import { Link, useNavigate } from "react-router-dom"
import { Rocket, BookOpen, Search, FingerprintPattern } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/AuthContext"

const features = [
    {
        icon: Rocket,
        title: "Fast & Reliable",
        description: "Lightning-fast performance with built-in reliability. Your content loads instantly."
    },
    {
        icon: BookOpen,
        title: "Rich Content",
        description: "Explore a vast library of articles and knowledge curated for curious minds."
    },
    {
        icon: Search,
        title: "Smart Discovery",
        description: "Find exactly what you need with intelligent search and personalized recommendations."
    }
]

export default function HomePage() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    console.log("user data:", user)

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                    <Link to="#" className="text-2xl font-bold text-primary flex items-center gap-2">
                        <FingerprintPattern className="w-8 h-8" />
                        Authora
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link to="#" className="text-md font-semibold text-muted-foreground transition-colors hover:text-foreground">
                            Home
                        </Link>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" size="lg" className="hover:text-red-500">
                                    Logout
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You will be logged out from your account.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">Logout</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
                <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
                    Hello! <span className="text-primary">{user?.name || "Guest"}</span> <br />
                    Welcome to Authora
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                    A clean, distraction-free space for readers and knowledge seekers.
                    Explore curated content designed to inspire and inform.
                </p>
                <div className="mt-8 flex gap-4">
                    <Button size="lg" asChild>
                        <Link to="/home">Get Started</Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <a href="https://github.com/ilfanzamstfv" target="_blank" rel="noopener noreferrer">
                            Learn More
                        </a>
                    </Button>
                </div>
            </section>

            <Separator className="mx-auto max-w-5xl" />

            {/* Feature Cards */}
            <section className="mx-auto max-w-5xl px-6 py-20">
                <h2 className="text-center text-2xl font-semibold text-foreground">Why Authora?</h2>
                <p className="mt-2 text-center text-muted-foreground">
                    Built for readers who value clarity and focus.
                </p>
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <Card key={feature.title} className="border-border bg-card transition-colors hover:border-primary/50">
                            <CardHeader>
                                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <feature.icon className="h-5 w-5 text-primary" />
                                </div>
                                <CardTitle className="text-lg">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-muted-foreground">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border">
                <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                    <span className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Authora. All rights reserved.
                    </span>
                    <span className="text-sm text-muted-foreground">
                        Built with care for readers.
                    </span>
                </div>
            </footer>
        </div>
    )
}
