import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserContext from "@/context/UserContext";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";

function RegisterPage() {
  const { authUser, registerUser, resetAuthUser, userLoading } =
    useContext(UserContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (authUser.user && authUser.success && !authUser.user.isVerified) {
      router.push("/user/verify");
      toast.success("Successfully Registered. Confirm your mail");
      resetAuthUser();
    } else if (authUser.error && authUser.message) {
      //  router.push("/");
      toast.error(authUser.message);
      resetAuthUser();
    }
  }, [authUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) return;
    await registerUser(email, name, password);
  };

  return (
    <div className="my-[40px] flex w-full items-start justify-center">
      <div className="min-w-[576px] divide-solid rounded-[20px] border-[1px] border-[#C1C1C1] px-[60px] py-[40px]">
        {userLoading ? (
          <Spinner />
        ) : (
          <>
            <form className="mb-[48px] w-full" onSubmit={handleSubmit}>
              <h1 className="mb-[32px] text-center text-[32px] font-[600]">
                Create your account
              </h1>
              <div className="mb-[32px] flex w-full flex-col items-start gap-[7px]">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter"
                  className="w-full divide-solid rounded-[6px] border-[1px] border-[#C1C1C1] p-[14px] text-[16px]"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              </div>

              <div className="mb-[32px] flex w-full flex-col items-start gap-[7px]">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter"
                  className="w-full divide-solid rounded-[6px] border-[1px] border-[#C1C1C1] p-[14px] text-[16px]"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </div>

              <div className="mb-[32px] flex w-full flex-col items-start gap-[7px]">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter"
                  className="w-full divide-solid rounded-[6px] border-[1px] border-[#C1C1C1] p-[14px] text-[16px]"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-[6px] bg-black p-[18px] font-[500] text-[#FFFFFF]"
              >
                CREATE ACCOUNT
              </button>
            </form>

            <p className="text-center text-[16px] text-[#333333]">
              Have an account?{" "}
              <span
                className="cursor-pointer font-[500] text-black"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/user/login");
                }}
              >
                LOGIN
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
