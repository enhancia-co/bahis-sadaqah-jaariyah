import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        try {
            // TODO: Replace with actual authentication API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Mock successful login
            toast({
                title: "Login Successful",
                description: "Welcome back to Bahis!",
            });

            navigate('/');
        } catch (error) {
            toast({
                title: "Login Failed",
                description: "Invalid email or password. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-background">
            {/* Islamic Pattern Background */}
            <div className="absolute inset-0 islamic-pattern opacity-50" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10" />

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 text-9xl text-primary/5 select-none pointer-events-none hidden lg:block">
                ☪
            </div>
            <div className="absolute bottom-10 right-10 text-9xl text-accent/5 select-none pointer-events-none hidden lg:block rotate-180">
                ☪
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex min-h-screen items-center justify-center safe-padding-x safe-padding-y">
                <div className="w-full max-w-md space-y-6 animate-fade-in">
                    {/* Header Section */}
                    {/* <div className="text-center space-y-3">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary text-primary-foreground mb-2 shadow-glow">
                            <span className="text-3xl">☪</span>
                        </div>
                        <h1 className="text-responsive-3xl font-bold gradient-primary bg-clip-text text-transparent">
                            Bahis
                        </h1>
                        <p className="text-sm text-muted-foreground font-islamic text-lg">
                            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                        </p>
                        <p className="text-responsive-base text-muted-foreground">
                            Swadakathun Jariyaah Fund Management
                        </p>
                    </div> */}

                    {/* Login Card */}
                    <Card className="shadow-lg border-primary/20 gradient-card">

                        <CardHeader className="space-y-1 text-center ">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-glow">
                                    <span className="text-3xl">☪</span>
                                </div>
                                <h1 className="text-responsive-3xl font-bold gradient-primary bg-clip-text text-transparent">
                                    Bahis
                                </h1>
                            </div>
                            <CardDescription>
                                Swadakathun Jariyaah Fund Management
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium">
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="your.email@example.com"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="pl-10 h-11 transition-smooth focus:shadow-glow border-input"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2 ">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-sm font-medium">
                                            Password
                                        </Label>
                                        {/* <Link
                                            to="/forgot-password"
                                            className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                                        >
                                            Forgot password?
                                        </Link> */}
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="pl-10 pr-10 h-11 transition-smooth focus:shadow-glow border-input"
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                            disabled={isLoading}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Sign In Button */}
                                <Button
                                    type="submit"
                                    className="w-full h-11 gradient-primary btn-glow gap-2 font-semibold"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="h-4 w-4" />
                                            Sign In
                                        </>
                                    )}
                                </Button>
                            </form>

                            {/* Divider */}
                            {/* <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-card px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                            </div> */}

                            {/* Alternative Sign In Options */}
                            {/* <div className="grid grid-cols gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="gap-2 h-11"
                                    disabled={isLoading}
                                >
                                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    <span className="hidden sm:inline">Google</span>
                                </Button>
                            </div> */}
                        </CardContent>
                    </Card>

                    {/* Sign Up Link */}
                    {/* <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="text-primary font-semibold hover:text-primary/80 transition-colors inline-flex items-center gap-1 group"
                            >
                                Sign up
                                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
