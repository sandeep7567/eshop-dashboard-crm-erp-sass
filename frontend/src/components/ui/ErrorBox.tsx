import { cn } from "@/lib/utils";

type ErrorBoxProps = {
  err?: string;
  _id?: string;
  verify?: string;
  className?: string;
}

const ErrorBox = ({err, _id, verify, className, ...props}:ErrorBoxProps) => {
  return (
    <p
      {...props}
      className={cn(
      "block text-sm antialiased font-bold text-red-500 w-[80%]",
      className,
    )}>
      {_id === verify && err}
    </p>
  )
};

export default ErrorBox;