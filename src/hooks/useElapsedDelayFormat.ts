import { useTranslations } from "next-intl";

export function useElapsedDelayFormat() {
  const t = useTranslations("PublishedTime");

  return (postDate: Date) => {
    //@ts-ignore
    const refDate = new Date(new Date() - postDate);
    const refDay = refDate.getDate();
    const refHour = refDate.getHours();
    const refMinutes = refDate.getMinutes();

    //if we're at most 3 days after the post
    if (
      refDate.getFullYear() === 1970 &&
      refDate.getMonth() === 0 &&
      refDay <= 4
    ) {
      //if we're at most 1 day after the post
      if ((refDay === 2 && refHour < 1) || refDay === 1) {
        //if we're at most 1 hour after the post
        if (refHour < 2 && refHour >= 1) {
          //if we're at most 1 minute after the post
          if (refMinutes === 0) {
            return t("in-seconds");
          }
          return t("in-minutes", {minutes: refMinutes});
        }
        return t("in-hours", {hours: (refHour !== 0 ? refHour - 1 : 23)});
      }
      return t("in-days", {days: (refDay-1 + (refHour < 1 ? 1 : 0))});
    }
    return t("long-ago", {date: postDate.toLocaleDateString()});
  };
}
