import * as React from "react";

import { cn } from "@/lib/utils";
import { TError } from "@/pages/Login";
import { ErrorBox } from "./ErrorBox";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | undefined;
  errorMessage?: TError[] | undefined;
  verify?: string | undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, errorMessage, verify, ...props }, ref) => {
    return (
      <div
        className="w-full" 
        {...props}
      >
        <input
          type={type}
          className={cn(
            `flex h-10 w-full rounded-md border transition-all duration-300
          border-input bg-background px-4 py-2
          outline-none focus-within:outline-none font-bold text-base
          focus:outline-none ring-offset-background 
          file:border-0 file:bg-transparent file:text-base 
          file:font-bold placeholder:text-muted-foreground/60 placeholder:font-bold
          focus-visible:outline-none focus:border-primary/60
          disabled:cursor-not-allowed disabled:opacity-50`,
            error && "border-red-500/60",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="h-0">
          {error && errorMessage && errorMessage.length > 0
            && errorMessage.map((errAlert, i) => {
                return (
                  <ErrorBox
                    key={errAlert._id || errAlert.err || i}
                    {...errAlert}
                    verify={verify}
                    className=""
                    {...props}
                  />
                );
              })
            }
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
