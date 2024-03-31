import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import Header from "@/components/Header";
import { UserProvider } from "@/context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans ${inter.variable}`}>
      <UserProvider>
        <Header />
        <Component {...pageProps} />
        <ToastContainer />
      </UserProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
