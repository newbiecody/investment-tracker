import { useState } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../components/ui/navigation-menu";
import SettingsNavItem from "./SettingsNavItem";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const components: { title: string; href: string; description: string }[] = [
    {
      title: "What politicians trade",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
  ];

  return (
    <nav className="navbar p-2 border-b">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Strategies</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components that you can copy and
                        paste into your apps. Accessible. Customizable. Open
                        Source.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <Link to="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </Link>
                <Link to="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </Link>
                <Link to="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </Link>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <SettingsNavItem />
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
