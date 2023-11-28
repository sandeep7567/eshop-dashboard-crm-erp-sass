import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks.ts";
import { userLoggedIn } from "@/redux/features/auth/authSlice.ts";
import { Loader2 } from "lucide-react";
import { emailVerify } from "@/verifiyer/verifyFormData.ts";
import { ErrorBox } from "@/components/ui/ErrorBox.tsx";

export type TError = {
  _id?: string;
  err?: string;
  serverErr?: string;
};

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useAppDispatch();
  const { userInfo, isLoggedIn, isLoggedOut } = useAppSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  const [email, setEmail] = useState<string | "">("");
  const [password, setPassword] = useState<string | "">("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<TError[]>([]);

  useEffect(() => {
    if (userInfo && isLoggedOut === false && isLoggedIn) {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  }, [userInfo?.isLoggedIn, isLoggedIn, isLoggedOut, navigate]);

  const onChangePassword = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setPassword(ev.target.value);
  };

  const onChangeEmail = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (!emailVerify(ev.target.value)) {
      return (
        setError(true),
        setErrorMessage([
          { err: "email is not valid", _id: "email" },
          { err: "", _id: "password" },
        ]),
        setEmail(ev.target.value)
      );
    } else {
      return setError(false), setErrorMessage([]), setEmail(ev.target.value);
    }
  };

  const onHandleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!email || !password) {
      return (
        setError(true),
        setErrorMessage([
          { err: "Please enter Email", _id: "email" },
          { err: "Please enter Password", _id: "password" },
        ])
      );
    }

    setError(false);
    try {
      const res = await login({ email, password }).unwrap();
      const userInfo = res?.data?.admin;
      if (res.success && userInfo?.isLoggedIn && userInfo?.isAdmin) {
        dispatch(userLoggedIn({ ...userInfo }));
        navigate("/admin/dashboard");
      }
    } catch (err: any) {
      if (!err.data.success) {
        const errorMessage = err?.data?.message;
        return (
          setError(true),
          setErrorMessage([
            {
              err: `${errorMessage || "Error: " + err?.message}`,
              _id: "isServerErr",
            },
            { err: "" },
          ])
        );
      }
      console.log(err);
    }
  };

  return (
    <div className="h-full min-h-screen bg-[#fafafa] mx-auto font-[Nunito] ">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="bg-[#fafafa]">j</div>
        <section className="bg-white">
          <form
            onSubmit={onHandleSubmit}
            className="relative w-full md:max-w-md flex flex-col gap-y-2 
          px-8 pt-32 pb-[13.75rem] p-8 mx-auto"
          >
            <h1 className="text-4xl font-bold">Sign In</h1>
            <hr className="flex justify-center items-center mt-4" />
            <Label htmlFor="email" className="mt-4">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(ev) => onChangeEmail(ev)}
              placeholder="admin@admin.com"
              className=""
              error={error}
              errorMessage={errorMessage}
              verify={"email"}
            />

            <Label className="mt-4">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              placeholder="1234"
              error={error}
              errorMessage={errorMessage}
              verify={"password"}
            />
            <div className="h-0">
              {errorMessage.map((errAlert, i) => {
                return (
                  <ErrorBox
                    key={errAlert._id || errAlert.err || i}
                    {...errAlert}
                    verify={"isServerErr"}
                    className=""
                  />
                );
              })}
            </div>

            <div className="w-full flex items-center mt-4">
              <h1 className="flex flex-grow justify-start items-center gap-x-1.5 text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 p-0 m-0 text-center bg-purple-800 flex justify-start items-center mr-auto"
                  id="vehicle1"
                  name="vehicle1"
                  value={""}
                  onChange={(ev) => console.log(ev.target.checked)}
                />
                <span className="text-sm font-bold">Remember Me</span>
              </h1>
              <Link
                className="flex justify-end items-center text-sm font-bold text-primary hover:text-primary/60 transition-all duration-200"
                to={"/"}
              >
                Forgot Password
              </Link>
            </div>

            <Button className="mt-4" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Log In
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
