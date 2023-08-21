import { Select } from "./ui/Select";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next-intl/client";

export function LanguageSwitcher() {
  const t = useTranslations("Languages");
  const curLanguage = useLocale();
  const router = useRouter();
  const path = usePathname();

  const supportedLanguages: ("en"| "fr"| "eo"| "es")[]  = ["en", "fr", "eo", "es"];

  return (
    <div className="flex w-64">
      <Select
        label={t("language")}
        value={curLanguage}
        onChange={(locale) => router.replace(path, { locale })}
      >
        {supportedLanguages.map((lang, index) => {
          return (
            <Select.Option key={index} value={lang}>
              <span className="flex space-x-2">
                <Image
                  src={lang==="eo"?"/esperanto.png":(`https://hatscripts.github.io/circle-flags/flags/${
                    lang === "en" ? "uk" : lang
                  }.svg`)}
                  alt={`${lang}`}
                  height={20}
                  width={20}
                />
                <span>{t(lang)}</span>
              </span>
            </Select.Option>
          );
        })}
      </Select>
    </div>
  );
}
