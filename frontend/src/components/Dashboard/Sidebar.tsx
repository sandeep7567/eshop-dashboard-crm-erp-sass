import { sidebarLinks } from "@/helpers/data";
import SiderBarLink from "@/components/Dashboard/SiderBarLink";

const Sidebar = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="w-full mb-8 flex flex-col mx-auto pl-12 justify-center items-center text-black">
        <h2 className="font-bold font-[Nunito,sans-serif,sans] text-2xl mx-auto">ADMIN</h2>
        <p className="flex justify-center pr-10 items-center mx-auto font-thin font-[Nunito,sans-serif,sans] text-base" >logo</p>
      </div>
      <div>
        {sidebarLinks.map((link) => {
          return <SiderBarLink key={link.id} {...link} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
