import { NavLink, matchPath, useLocation } from "react-router-dom";

import { icons } from "lucide-react";

import { SiderBarLinkProps } from "@/helpers/data";
import { cn } from "@/lib/utils";

interface IStringIndex {
  [key: string]: React.ComponentType<{ className?: string }>; // Assuming lucide-react icons are React components
}

const Icon: IStringIndex = icons;

const SiderBarLink = ({ path, icon, name }: SiderBarLinkProps) => {
  const SidebarIcon = Icon[icon];
  const location = useLocation();

  const matchRoute = (route:string) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={path}
      className={`w-full  gap-x-0.5 justify-center md:pl-6 rounded-md flex items-center h-10 my-1 px-1 transition-all duration-200 cursor-pointer ${
        matchRoute(path)
          ? "bg-sky-400/20 text-primary rounded-md "
          : "hover:bg-slate-600 hover:bg-opacity-10 hover:transition-all  hover:duration-200 transition-all duration-200 bg-transparent"
      }`}
    >
      {/* {icon} */}
      {SidebarIcon && (
        <SidebarIcon className={`w-5 h-5 fill-[#fff]`} />
      )}
      <h5 className={cn(`${matchRoute(path) ? "text-primary" : "text-slate-950"}`,
          " pl-2 font-bold md:block text-sm hidden font-[Nunito,sans-serif,sans]")}
      >
        {name}
      </h5>
    </NavLink>
  );
};

export default SiderBarLink;