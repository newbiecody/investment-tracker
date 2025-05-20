import { Link } from "react-router-dom";

interface INavbarItem {
  label: string;
  to: string;
}
export default function NavbarItem({ label, to }: INavbarItem) {
  return (
    <li>
      <Link to={to}>{label}</Link>
    </li>
  );
}
