import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RootLayout from "@/pages/layout"

const LoginPage = () => {
    return(
        <RootLayout>
            <div className="flex flex-col h-[70vh]">
                <div className="flex items-center justify-center space-y-4 p-8 pt-6 h-full">
                    <div className="flex items-center justify-center">
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
                                <CardDescription>
                                    Ingresa tu email y contraseña para ingresar a tu cuenta
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="example@ex.com" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input id="password" type="password" placeholder="********" required />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Ingresar</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </RootLayout>
    )
}

export default LoginPage;