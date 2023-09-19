import Link from "next/link";
import { Button } from "./ui/Button";
import { useTranslations } from "next-intl";
import { ActionIcon } from "./ui/ActionIcon";
import { useState } from "react";
import { IconHome, IconMenu2, IconSend, IconUser } from "@tabler/icons-react";
import { Drawer } from "./ui/Drawer";

interface HeaderProps {
  userId?: string;
}
export function Header(props: HeaderProps) {
  const [opened, setOpened] = useState(false);
  const tForm = useTranslations("Form");
  const tMenu = useTranslations("Menu");

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gray-100">
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        closeOnClickOutside
      >
        <ul>
          <li>
            <Link
              href="/home"
              className="p-4 flex space-x-2 hover:font-bold hover:bg-gray-100 transition-colors"
            >
              <IconHome />
              <span>{tMenu("home")}</span>
            </Link>
          </li>
          <li>
            <Link
              href={`/profile/${props.userId}`}
              className="p-4 flex space-x-2 hover:font-bold hover:bg-gray-100 transition-colors"
            >
              <IconUser />
              <span>{tMenu("profile")}</span>
            </Link>
          </li>
          <li>
            <Link
              href="/messages"
              className="p-4 flex space-x-2 hover:font-bold hover:bg-gray-100 transition-colors"
            >
              <IconSend />
              <span>{tMenu("messages")}</span>
            </Link>
          </li>
        </ul>
      </Drawer>
      <div className="flex space-x-2">
        {props.userId ? (
          <ActionIcon onClick={() => setOpened(true)}>
            <IconMenu2 />
          </ActionIcon>
        ) : (
          <></>
        )}
        <h2 className="text-2xl">
          <Link href="/">My Social Network</Link>
        </h2>
      </div>
      <ul className="flex space-x-2">
        {!props.userId ? (
          <>
            <li>
              <Link href="/register">
                <Button label={tForm("register")} secondary />
              </Link>
            </li>
            <li>
              <Link href="/login">
                <Button label={tForm("login")} />
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
