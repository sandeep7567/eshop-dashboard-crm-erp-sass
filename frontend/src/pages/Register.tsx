import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState<string | "">("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const onHandleSubmit = (ev: React.SyntheticEvent) => {
    ev.preventDefault();

    console.log({ email, password, cPassword, name});
  };

  return (
    <div className="h-full min-h-screen bg-[#fafafa] mx-auto font-[Nunito] ">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="bg-[#fafafa]">j</div>
        <section className="bg-white">
          <form
            onSubmit={onHandleSubmit}
            className="w-full md:max-w-md flex flex-col gap-y-6
          px-8 pt-32 pb-[13.75rem] p-8 mx-auto"
          >
            <h1 className="text-4xl font-bold ">Sign Up</h1>
            <hr className="flex justify-center items-center " />
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder="Name"
              verify={"name"}
            />

            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              placeholder="Email Address"
              verify={"email"}
            />

            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              placeholder="password"
              verify={"password"}
            />

            <Input
              type="password"
              id="cPassword"
              name="cPassword"
              value={cPassword}
              onChange={(ev) => setCpassword(ev.target.value)}
              placeholder="Confirm Password"
              verify={"cPassword"}
            />

            <Button type="submit" className="">Register</Button>

            <div className="space-x-2 ">
              <span className="text-sm font-bold">Or</span>
              <Link
                className="text-sm tracking-tight font-bold text-primary 
                hover:text-primary/60 transition-all duration-200"
                to={"/"}
              >
                Already Have Account Login
              </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Register;
