import Image from "next/image";

interface AvatarProps {
  src?: string;
  name: string;
  surname: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar(props: AvatarProps) {
  const size = {
    sm: "h-10 w-10 text-xl",
    md: "h-16 w-16 text-3xl",
    lg: "h-40 w-40 text-8xl",
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center ${size[props.size??"md"]}`}
      style={{ backgroundColor: props.color??"#000000" }}
    >
      {props.src ? (
        <Image src={props.src} alt="user_avatar" width={320} height={320} />
      ) : (
        <p className={`text-center text-white`}>
          {props.name[0].toUpperCase()}
          {props.surname[0].toUpperCase()}
        </p>
      )}
    </div>
  );
}
