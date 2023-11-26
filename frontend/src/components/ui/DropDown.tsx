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
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/redux/features/auth/authApi";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { userLoggedOut } from "@/redux/features/auth/authSlice";

interface DropDownProps {
  avatar: React.ReactElement;
  header: React.ReactElement;
  profileItems: profileItemsTypes;
}

export function DropDown({ avatar, profileItems, header }: DropDownProps) {
  const [ logoutApiCall ] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = async (ev:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.stopPropagation();
    try {
      await logoutApiCall(undefined).unwrap();
      dispatch(userLoggedOut());

       // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      // dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="rounded-full" size="icon">
          {avatar}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 absolute right-10 h-fit">
        <DropdownMenuLabel className="px-2 py-1.5 focus:bg-accent hover:bg-accent">
          {header}
        </DropdownMenuLabel>
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
        <DropdownMenuItem onClick={(ev) => logoutHandler(ev)}>
          <Link to={"#"} className="flex justify-center items-center gap-x-3">
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
