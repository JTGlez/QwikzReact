import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

export default function Header() {
  const { email, displayName, photoURL } = useSelector((state) => state.auth);

  console.log(email, displayName, photoURL);

  if (!email) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <a href="/" className="flex items-center space-x-1">
            <img
              src={"/lightning.png"}
              width={32}
              height={32}
              alt="qwikz-logo"
            />
            <span className="font-bold text-2xl">Qwikz</span>
          </a>
          <nav className="flex items-center">
            <Button asChild variant="ghost" size="icon">
              <a
                href={"https://github.com/chow-chow/Qwikz"}
                target="_blank"
                rel="noreferrer"
              >
                <GitHubLogoIcon className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <ModeToggle />
            <Button asChild variant="ghost">
              <Link to="/auth/login">
                <span>Login</span>
              </Link>
            </Button>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <a href="/" className="flex items-center space-x-1">
          <img src={"/lightning.png"} width={32} height={32} alt="qwikz-logo" />
          <span className="font-bold text-2xl">Qwikz</span>
        </a>
        <nav className="flex items-center">
          <Label className="mr-2">Bienvenido, {displayName}</Label>
          <Button asChild variant="ghost" size="icon">
            <a
              href={"https://github.com/chow-chow/Qwikz"}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubLogoIcon className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <ModeToggle />

          <Avatar className="ml-3 h-6 w-6">
            <AvatarImage
              src={photoURL ? photoURL : "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </nav>
      </div>
    </header>
  );
}
