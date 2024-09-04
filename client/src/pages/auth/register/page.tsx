import RootLayout from "@/pages/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  return (
    <RootLayout>
      <div className="flex flex-col h-[70vh]">
        <div className="flex items-center justify-center space-y-4 p-8 pt-6 h-full">
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-2xl">Registrarse</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2 grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">Nombres</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Apellidos</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@ex.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                  />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="photo">Foto de perfil</Label>
                    <Input
                      id="photo"
                      type="file"
                      required 
                    />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Enviar</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default RegisterPage;
