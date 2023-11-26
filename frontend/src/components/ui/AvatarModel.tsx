
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./Avatar";

interface AvatarProps {
  avatar: string;
  avatarName: string;
  className: string;
}

export function AvatarModel({ avatar, avatarName, className }: AvatarProps) {
  return (
    <Avatar>
      <AvatarImage
        className={cn("", className)}
        src={avatar || "https://github.com/shadcn.png"}
        alt={"@shadcn"}
      />
      <AvatarFallback className={cn("", className)}>
        {avatarName}
      </AvatarFallback>
    </Avatar>
  );
}
