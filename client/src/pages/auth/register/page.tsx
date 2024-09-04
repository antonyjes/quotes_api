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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [picture, setPicture] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setPicture(file);
        }
    }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    if (picture) {
      formData.append("picture", picture);
    }

    const response = await fetch("http://localhost:3003/user/register", {
      method: "POST",
      body: formData,        
    });

    const data = await response.json();

    if (data) {
        navigate("/login");
        toast.success("Registrado exitosamente");
    }
  };

  return (
    <RootLayout>
      <div className="flex flex-col h-[70vh]">
        <div className="flex items-center justify-center space-y-4 p-8 pt-6 h-full">
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md">
              <form onSubmit={onSubmit}>
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
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Apellidos</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="photo">Foto de perfil</Label>
                    <Input id="photo" type="file" onChange={handleImageChange}/>
                  </div>
                </CardContent>
                <CardFooter className="grid gap-2">
                  <Button type="submit" className="w-full">
                    Enviar
                  </Button>
                  <div className="mt-4 text-center text-sm">
                    Si ya tienes una cuenta,{" "}
                    <a href="/login" className="underline">
                      inicia sesión
                    </a>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default RegisterPage;
