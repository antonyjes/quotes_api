import { Button } from "@/components/ui/button";
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
import RootLayout from "@/pages/layout";
import { setLogin } from "@/state";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3003/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error || "Error al iniciar sesión");
        throw new Error("Error al iniciar sesión");
      }

      const loggedIn = await response.json();

      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );

        const role = loggedIn.user.role;

        if (role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      toast.error((error as Error).message || "Un error inesperado");
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
                  <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
                  <CardDescription>
                    Ingresa tu email y contraseña para ingresar a tu cuenta
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
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
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="grid gap-2">
                  <Button type="submit" className="w-full">
                    Ingresar
                  </Button>
                  <div className="mt-4 text-center text-sm">
                    Si no tienes una cuenta,{" "}
                    <a href="/register" className="underline">
                      regístrate
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

export default LoginPage;
