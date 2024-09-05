import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/lib/data";
import {
  AlignJustifyIcon,
  Bookmark,
  Edit,
  LogOut,
  UserCircle,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { setLogout } from "@/state";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuth = Boolean(
    useSelector((state: { token: string }) => state.token)
  );
  const user = useSelector((state: { user: User }) => state.user);

  const routes = [
    {
      href: "/",
      label: "Página principal",
      active: useLocation().pathname === "/",
    },
    {
      href: "/authors",
      label: "Autores",
      active: useLocation().pathname === "/authors",
    },
    {
      href: "/topics",
      label: "Temas",
      active: useLocation().pathname === "/topics",
    },
    {
      href: "/day-quote",
      label: "Cita del día",
      active: useLocation().pathname === "/day-quote",
    },
  ];

  return (
    <div>
      <div className="flex h-16 items-center px-4 justify-between">
        <div className="flex items-center">
          <img src="/logo.png" alt="logo" className="w-[5rem] h-[5rem]" />
          <h1 className="text-3xl font-bold uppercase">Frases diarias</h1>
        </div>
        <nav className="hidden lg:flex items-center space-x-4 lg:space-x-6 mx-[2rem]">
          {routes.map((route) => (
            <a
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex ml-auto items-center space-x-4">
          <ModeToggle />
          {isAuth ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {user.picturePath ? (
                  <img
                    className="w-[3rem] h-[3rem] rounded-full object-cover"
                    src={`http://localhost:3003/assets/${user?.picturePath}`}
                    alt={`${user?.firstName}`}
                  />
                ) : (
                  <UserCircle className="w-[3rem] h-[3rem] rounded-full" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user?.firstName} {user?.lastName}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Bookmark className="mr-2 h-4 w-4" />
                  Guardados
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar perfil
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    dispatch(setLogout());
                    navigate("/");
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <nav className="flex items-center space-x-2 lg:space-x-4">
              <a
                href="/login"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "px-4 py-2"
                )}
              >
                Iniciar sesión
              </a>
              <a
                href="/register"
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "px-4 py-2"
                )}
              >
                Registrarse
              </a>
            </nav>
          )}
        </div>
        <div className="block lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <AlignJustifyIcon className="h-6 w-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {routes.map((route) => (
                <DropdownMenuItem key={route.href}>
                  <a
                    href={route.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      route.active
                        ? "text-black dark:text-white"
                        : "text-muted-foreground"
                    )}
                  >
                    {route.label}
                  </a>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              {isAuth ? (
                <>
                  <DropdownMenuItem>Guardados</DropdownMenuItem>
                  <DropdownMenuItem>Editar perfil</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      dispatch(setLogout());
                      navigate("/");
                    }}
                  >
                    Cerrar sesión
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => navigate("/login")}>
                    Iniciar sesión
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/register")}>
                    Registrarse
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
