import { User } from "lucide-react";
import { DropDown } from "@/components/ui/DropDown";
import { useAppSelector } from "@/hooks/reduxHooks";
import { AvatarModel } from "../ui/AvatarModel";
import { adminInfo } from "@/redux/features/auth/authSlice";
// import { UserInfoProps } from "@/types/types";

export type profileItemsTypes = {
  id: string;
  icon: React.ReactNode;
  item: string;
  link: string;
}[];

const AvatarProfile = ({userName, ...props}:adminInfo) => {
  return (
    <AvatarModel {...props}
      className="bg-avatar text-textavatar"
      avatar={userName && userName.charAt(0)}
      avatarName={userName && userName.charAt(0)}
    />
  );
};

const Navbar = () => {
  // const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);

  const profileItems: profileItemsTypes = [
    {
      id: "1",
      icon: <User className="mr-2 h-4 w-4" />,
      item: "Profile Settings",
      link: "admin/profile",
    },
  ];

  return (
    <DropDown
      avatar={<AvatarProfile {...userInfo} />}
      header={
        <>
          <header className="w-full py-2 flex justify-center items-center gap-x-3 cursor-pointer mx-auto">
            <AvatarProfile {...userInfo} />
            <section>
              <p>{userInfo?.userName && userInfo?.userName.toLowerCase() || "sandeep thakur"}</p>
              <p>{userInfo?.email && userInfo?.email?.toLowerCase() || "admin@demo.com"}</p>
            </section>
          </header>
        </>
      }
      profileItems={profileItems}
    />
  );
};

export default Navbar;
