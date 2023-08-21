import Link from "next/link";
import { Button } from "./ui/Button";

export function Header() {
  // TODO: Replace labels with translations
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gray-100">
      <h2 className="text-2xl">
        <Link href="/">My Social Network</Link>
      </h2>
      <ul className="flex space-x-4">
        <li>
          <Link href="/register">
            <Button label="S'inscrire" secondary />
          </Link>
        </li>
        <li>
          <Link href="/login">
            <Button label="Se connecter" />
          </Link>
        </li>
      </ul>
    </header>
  );
}
