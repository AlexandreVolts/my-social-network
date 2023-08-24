import Link from "next/link";
import { Button } from "./ui/Button";
import { useTranslations } from "next-intl";

interface HeaderProps {
  isLoggedIn?: boolean;
}
export function Header(props: HeaderProps) {
  const t = useTranslations("Form");
  // TODO: Replace labels with translations
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gray-100">
      <h2 className="text-2xl">
        <Link href="/">My Social Network</Link>
      </h2>
      <ul className="flex space-x-2">
        {!props.isLoggedIn ? (
          <>
            <li>
              <Link href="/register">
                <Button label={t("register")} secondary />
              </Link>
            </li>
            <li>
              <Link href="/login">
                <Button label={t("login")} />
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
    </header>
  );
}
