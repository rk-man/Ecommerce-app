import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserContext from "@/context/UserContext";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";

function VerifyUserPage() {
  const { authUser, resetAuthUser, verifyUser, userLoading } =
    useContext(UserContext);
  let [OTP, setOTP] = useState(["", "", "", "", "", "", "", ""]);

  const router = useRouter();

  useEffect(() => {
    if (authUser.user && authUser.user.isVerified && authUser.success) {
      router.push("/");
      toast.success("Successfully Verified! Enjoy");
      resetAuthUser();
    } else if (authUser.error && authUser.message) {
      //  router.push("/");
      toast.error(authUser.message);
      resetAuthUser();
    }
  }, [authUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let otp_str = OTP.join("");
    if (otp_str.length < 8) return;

    verifyUser(otp_str);
  };

  return (
    <div className="my-[40px] flex w-full items-start justify-center">
      {authUser.user?.isVerified ? (
        <h1>You are already verified! Go to homepage</h1>
      ) : !userLoading ? (
        <form
          className="mb-[48px] min-w-[576px] divide-solid rounded-[20px] border-[1px] border-[#C1C1C1] px-[60px] py-[40px]"
          onSubmit={handleSubmit}
        >
          <h1 className="mb-[32px] text-center text-[32px] font-[600]">
            Verify your email
          </h1>

          <p className="mb-[16px] text-center">
            Enter the 8 digit code you have received on{" "}
            {authUser ? (authUser.user ? authUser.user.email : "") : ""}
          </p>

          <div className="otp-field mb-[32px]">
            <input
              data-id="0"
              type="text"
              maxLength={1}
              value={OTP[0]}
              onChange={(e) => {
                setOTP((prev) => {
                  return prev.map((digit, idx) => {
                    if (e.target.dataset.id === String(idx))
                      return e.target.value;

                    return digit;
                  });
                });
              }}
            />
            <input
              type="text"
              value={OTP[1]}
              data-id="1"
              maxLength={1}
              onChange={(e) => {
                setOTP((prev) => {
                  return prev.map((digit, idx) => {
                    if (e.target.dataset.id === String(idx))
                      return e.target.value;

                    return digit;
                  });
                });
              }}
            />
            <input
              type="text"
              value={OTP[2]}
              data-id="2"
              maxLength={1}
              onChange={(e) => {
                setOTP((prev) => {
                  return prev.map((digit, idx) => {
                    if (e.target.dataset.id === String(idx))
                      return e.target.value;

                    return digit;
                  });
                });
              }}
            />
            <input
              type="text"
              value={OTP[3]}
              data-id="3"
              maxLength={1}
              onChange={(e) => {
                setOTP((prev) => {
                  return prev.map((digit, idx) => {
                    if (e.target.dataset.id === String(idx))
                      return e.target.value;

                    return digit;
                  });
                });
              }}
            />
            <input
              type="text"
              value={OTP[4]}
              data-id="4"
              maxLength={1}
              onChange={(e) => {
                setOTP((prev) => {
                  return prev.map((digit, idx) => {
                    if (e.target.dataset.id === String(idx))
                      return e.target.value;

                    return digit;
                  });
                });
              }}
            />
            <input
              type="text"
              value={OTP[5]}
              data-id="5"
              maxLength={1}
              onChange={(e) => {
                setOTP((prev) => {
                  return prev.map((digit, idx) => {
                    if (e.target.dataset.id === String(idx))
                      return e.target.value;

                    return digit;
                  });
                });
              }}
            />
            <input
              type="text"
              value={OTP[6]}
              data-id="6"
              maxLength={1}
              onChange={(e) => {
                setOTP((prev) => {
                  return prev.map((digit, idx) => {
                    if (e.target.dataset.id === String(idx))
                      return e.target.value;

                    return digit;
                  });
                });
              }}
            />
            <input
              type="text"
              value={OTP[7]}
              data-id="7"
              maxLength={1}
              onChange={(e) => {
                setOTP((prev) => {
                  return prev.map((digit, idx) => {
                    if (e.target.dataset.id === String(idx))
                      return e.target.value;

                    return digit;
                  });
                });
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-[6px] bg-black p-[18px] font-[500] text-[#FFFFFF]"
          >
            VERIFY
          </button>
        </form>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default VerifyUserPage;
