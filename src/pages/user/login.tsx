import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserContext from "@/context/UserContext";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";

function LoginPage() {
  const { authUser, loginUser, resetAuthUser, userLoading } =
    useContext(UserContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (authUser.user && authUser.success && authUser.user.isVerified) {
      router.push("/");
      toast.success("Successfully Logged In");
      resetAuthUser();
    } else if (authUser.user && authUser.success && !authUser.user.isVerified) {
      router.push("/user/verify");
      toast.warning("Please verify your mail to continue");
      resetAuthUser();
    } else if (authUser.error && authUser.message) {
      //  router.push("/");
      toast.error(authUser.message);
      resetAuthUser();
    }
  }, [authUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    loginUser(email, password);
  };

  return (
    <div className="my-[40px] flex w-full items-start justify-center">
      <div className="min-w-[576px] divide-solid rounded-[20px] border-[1px] border-[#C1C1C1] px-[60px] py-[40px]">
        {userLoading ? (
          <Spinner />
        ) : (
          <>
            <form className="mb-[48px] w-full" onSubmit={handleSubmit}>
              <h1 className="mb-[36px] text-center text-[32px] font-[600]">
                Login
              </h1>
              <h2 className="mb-[13px] text-center text-[24px] font-[500]">
                Welcome back to ECOMMERCE
              </h2>
              <h3 className="mb-[32px] text-center text-[16px]">
                The next gen business marketplace
              </h3>

              <div className="mb-[32px] flex w-full flex-col items-start gap-[7px]">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter"
                  className="w-full divide-solid rounded-[6px] border-[1px] border-[#C1C1C1] p-[14px] text-[16px]"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="mb-[32px] flex w-full flex-col items-start gap-[7px]">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter"
                  className="w-full divide-solid rounded-[6px] border-[1px] border-[#C1C1C1] p-[14px] text-[16px]"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-[6px] bg-black p-[18px] font-[500] text-[#FFFFFF]"
              >
                Login
              </button>
            </form>

            <div className="mb-[30px] w-full divide-solid border-t-[1px] border-t-[#C1C1C1]"></div>

            <p className="text-center text-[16px] text-[#333333]">
              Don't have an account?{" "}
              <span
                className="cursor-pointer font-[500] text-black"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/user/register");
                }}
              >
                SIGN UP
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
