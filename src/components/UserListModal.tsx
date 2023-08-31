import Link from "next/link";
import { Modal } from "./ui/Modal";
import { useTranslations } from "next-intl";
import { UserData } from "@/types/UserData";
import { Avatar } from "./ui/Avatar";

interface UserListModalProps {
  opened: boolean;
  title: string;
  list?: UserData[];
  onClose: () => void;
}

export function UserListModal(props: UserListModalProps) {
  const t = useTranslations("Profile");
  return (
    <Modal
      opened={props.opened}
      onClose={props.onClose}
      title={props.title}
      closeOnClickOutside
    >
      <ul className="space-y-2">
        {props.list?.map((user, index) => {
          return (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar 
                  name={user.name}
                  surname={user.surname}
                  src={user.avatar_src}
                  size="sm"
                />
                <p className="font-bold">{user.name + " " + user.surname}</p>
              </div>
              <Link
                href={`/profile/${user.id}`}
                className="italic hover:underline"
              >
                {t("view-profile")}
              </Link>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
