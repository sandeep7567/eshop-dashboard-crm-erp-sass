import { User } from "lucide-react";
import { DropDown } from "@/components/ui/DropDown";

export type profileItemsTypes = {
  id: string;
  icon: React.ReactNode;
  item: string;
  link: string;
}[];

const Navbar = () => {
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
      avatar={
        <div className="flex w-10 h-10 mx-auto bg-orange-200 bg-opacity-100 font-bold text-orange-500
        ml-auto rounded-full text-sm text-center justify-center items-center">
          S
        </div>
      }
      header={"hello"}
      profileItems={profileItems}
    />
  );
};

export default Navbar;
