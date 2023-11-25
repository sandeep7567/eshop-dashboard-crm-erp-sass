import { Github, LogOut } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropDownMenu";

import { profileItemsTypes } from "@/components/Dashboard/Navbar";
import { Link } from "react-router-dom";

interface DropDownProps {
  avatar: React.ReactElement;
  header: string;
  profileItems: profileItemsTypes;
}

export function DropDown({ avatar, profileItems, header }: DropDownProps) {
  // const onOpen = useLogoutModal((state) => state.onOpen);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="rounded-full" size="icon">
          {/* <img
            src={avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full border-slate-800 border-2"
          /> */}
          {avatar}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 absolute right-10 h-fit">
        <DropdownMenuLabel>{header}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {profileItems.map((profileItem, i) => (
          <DropdownMenuGroup key={profileItem.id || i}>
            <DropdownMenuItem>
              <Link
                to={profileItem.link}
                className="flex justify-center items-center"
              >
                {profileItem.icon}
                <span>{profileItem.item}</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={""} className="flex justify-center items-center">
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          // onClick={onOpen}
        >
          <Link to={"#"} className="flex justify-center items-center gap-x-3">
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
