import { useTranslations } from "next-intl";
import { useState } from "react";

interface ReadMoreTextProps {
  text: string;
  charLimit?: number;
}

export function ReadMoreText(props: ReadMoreTextProps) {
  const t = useTranslations("Post");
  const [isFullyDisplayed, setIsFullyDisplayed] = useState(false);
  const isTextOverflow = props.text.length >= (props.charLimit ?? 250);

  return (
    <p className={`break-words block text-justify`}>
      <span>
        {isFullyDisplayed
          ? props.text
          : props.text.slice(0, props.charLimit ?? 250) +
            (isTextOverflow ? "... " : " ")}
      </span>
      {isTextOverflow ? (
        !isFullyDisplayed ? (
          <span
            onClick={() => setIsFullyDisplayed(true)}
            className="cursor-pointer font-bold"
          >
            {t("see-more")}
          </span>
        ) : (
          <span
            onClick={() => setIsFullyDisplayed(false)}
            className="cursor-pointer font-bold"
          >
            {" " + t("see-less")}
          </span>
        )
      ) : (
        <></>
      )}
    </p>
  );
}
