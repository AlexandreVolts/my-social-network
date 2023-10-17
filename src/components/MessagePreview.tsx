import { useElapsedDelayFormat } from "@/hooks/useElapsedDelayFormat";
import { Avatar } from "./ui/Avatar";
import { Pin } from "./ui/Pin";

interface MessagePreviewProps {
  name: string;
  surname: string;
  message: string;
  createdAt: Date;
  unread?: boolean;
}
export function MessagePreview(props: MessagePreviewProps) {
  const formater = useElapsedDelayFormat();
  const font = props.unread ? "font-bold" : "font-normal";

  return (
    <Pin disabled={!props.unread}>
      <div className="flex p-2 space-x-2 w-full cursor-pointer hover:bg-gray-100 border-b-2">
        <div>
          <Avatar name={props.name} surname={props.surname} />
        </div>
        <div className="flex flex-col justify-around">
          <h5 className="font-bold">
            {props.name} {props.surname}
          </h5>
          <div className="flex space-x-2">
            <p className={`line-clamp-1 ${font}`}>{props.message}</p>
            <p className="whitespace-nowrap text-gray-500">
              {formater(props.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </Pin>
  );
}
