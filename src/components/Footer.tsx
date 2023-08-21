import Link from "next/link";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const t = useTranslations();
  
  return (
    <footer className="px-8 py-4 bg-gray-100">
      <div className="flex justify-between">
        <div className="flex space-x-8 items-center">
          <h2 className="text-lg">
            <Link href="/">My Social Network</Link>
          </h2>
          <ul className="flex space-x-2">
            <li>
              <Link href="/about">{t("About.about")}</Link>
            </li>
            <li>
              <Link href="/register">{t("Form.register")}</Link>
            </li>
            <li>
              <Link href="/login">{t("Form.login")}</Link>
            </li>
          </ul>
        </div>
        <LanguageSwitcher />
      </div>
    </footer>
  );
}
