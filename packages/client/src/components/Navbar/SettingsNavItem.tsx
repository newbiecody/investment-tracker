import { Moon } from "lucide-react";
import useLightMode from "../../hooks/UseLightMode";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Toggle } from "../ui/toggle";

function SettingsNavItem() {
  const { theme, setTheme } = useLightMode();
  const toggleTheme = () => {
    if (theme === "dark") setTheme("light");
    if (theme === "light") setTheme("dark");
  };
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Settings</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="w-[375px] text-sm justify-center align-middle">
          Dark Mode:{" "}
          <Toggle
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            pressed={theme === "dark"}
          >
            <Moon className="w-2 h-2" />
          </Toggle>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export default SettingsNavItem;
