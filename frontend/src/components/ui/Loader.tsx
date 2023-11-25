import { LucideLoader } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex bg-global justify-center items-center h-screen w-screen">
      <LucideLoader size={48} className="animate-spin text-primary" />
    </div>
  );
};

export default Loader;
