import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string | undefined;
}


const Spinner = ({className}:SpinnerProps) => {
  return (
    <div className="flex justify-center items-center h-screen my-auto">
      <div className={cn(
        "w-12 h-12 border-blue-600 border-[0.175rem] border-solid rounded-full border-l-transparent animate-spin",
        className
      )}></div>
    </div>
  );
};

export default Spinner;