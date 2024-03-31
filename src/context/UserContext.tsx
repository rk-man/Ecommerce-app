import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { type_authUser } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type Props = {
  children: ReactNode;
};

export type type_UserContext = {
  authUser: type_authUser;
  // setAuthUser: Dispatch<SetStateAction<type_authUser>>;
  registerUser: (
    email: string,
    name: string,
    password: string,
  ) => Promise<void>;

  userLoading: boolean;

  resetAuthUser: () => void;

  verifyUser: (verificationCode: string) => Promise<void>;

  loginUser: (email: string, password: string) => Promise<void>;

  logoutUser: () => Promise<void>;
};

const initialValue = {
  authUser: {
    user: null,
    success: false,
    error: false,
    message: "",
  },

  registerUser: (email: string, name: string, password: string) =>
    Promise.resolve(),

  userLoading: false,
  resetAuthUser: () => {
    return;
  },

  verifyUser: (verificationCode: string) => Promise.resolve(),

  loginUser: (email: string, password: string) => Promise.resolve(),
  logoutUser: () => Promise.resolve(),
};

const UserContext = createContext<type_UserContext>(initialValue);

export function UserProvider({ children }: Props) {
  const [userLoading, setUserLoading] = useState<boolean>(true);

  const [authUser, setAuthUser] = useState<type_authUser>({
    user: null,
    success: false,
    error: false,
    message: "",
  });

  const router = useRouter();

  useEffect(() => {
    getCurrentlyLoggedInUser();
  }, []);

  useEffect(() => {
    if (authUser.success || authUser.error) setUserLoading(false);
  }, [authUser]);

  async function registerUser(email: string, name: string, password: string) {
    try {
      setUserLoading(true);
      const api_res = await axios.post(
        "/api/user/register",
        { email, name, password },
        {
          withCredentials: true,
        },
      );

      setAuthUser((prev) => {
        return {
          ...prev,
          user: api_res.data.data,
          success: true,
        };
      });
    } catch (err: any) {
      setAuthUser((prev) => {
        return {
          ...prev,
          error: true,
          message: err.response.data.message,
        };
      });
    }
  }

  async function loginUser(email: string, password: string) {
    try {
      setUserLoading(true);
      const api_res = await axios.post(
        "/api/user/login",
        { email, password },
        {
          withCredentials: true,
        },
      );

      setAuthUser((prev) => {
        return {
          ...prev,
          user: api_res.data.data,
          success: true,
        };
      });
    } catch (err: any) {
      setAuthUser((prev) => {
        return {
          ...prev,
          error: true,
          message: err.response.data.message,
        };
      });
    }
  }

  async function logoutUser() {
    setUserLoading(true);
    try {
      await axios.post(
        "/api/user/logout",
        {},
        {
          withCredentials: true,
        },
      );
      setAuthUser((prev) => {
        return {
          ...prev,
          user: null,
        };
      });

      toast.success("Successfully Logged out! Please log in to continue");
      router.push("/user/login");
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message);
    }
    setUserLoading(false);
  }

  async function getCurrentlyLoggedInUser() {
    try {
      const api_res = await axios.get("/api/user/me", {
        withCredentials: true,
      });

      setAuthUser((prev) => {
        return {
          ...prev,
          user: api_res.data.data,
        };
      });
    } catch (err) {
      console.log(err);
    }
    setUserLoading(false);
  }

  async function verifyUser(verificationCode: string) {
    setUserLoading(true);
    try {
      const api_res = await axios.patch(
        "/api/user/verify-user",
        { verificationCode },
        { withCredentials: true },
      );

      setAuthUser((prev) => {
        return {
          ...prev,
          user: api_res.data.data,
          success: true,
        };
      });
    } catch (err: any) {
      setAuthUser((prev) => {
        return {
          ...prev,
          error: true,
          message: err.response.data.message,
        };
      });
    }
    setUserLoading(false);
  }

  function resetAuthUser() {
    setAuthUser((prev) => {
      return {
        ...prev,
        success: false,
        message: "",
        error: false,
      };
    });
  }

  return (
    <UserContext.Provider
      value={{
        authUser: authUser,
        registerUser,
        userLoading,
        resetAuthUser,
        verifyUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
