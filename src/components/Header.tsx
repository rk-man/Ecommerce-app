import Link from "next/link";
import React, { useContext } from "react";
import {
  FaGreaterThan,
  FaLessThan,
  FaSearch,
  FaShoppingCart,
} from "react-icons/fa";
import { useRouter } from "next/router";
import UserContext from "@/context/UserContext";

function Header() {
  const { authUser, logoutUser } = useContext(UserContext);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logoutUser();
  };

  const router = useRouter();
  return (
    <header>
      <div className="text-[rgba(51, 51, 51, 1)] flex items-center justify-end gap-[20px] px-[40px] py-[12px]">
        <Link href="#">Help</Link>
        <Link href="#">Orders & Return</Link>

        {authUser.user ? (
          <>
            {" "}
            <Link href="#">Hi {authUser.user?.name.split(" ")[0]}</Link>{" "}
            <button
              className="divide-solid rounded-[4px] border-[1px] border-black bg-black px-[16px] py-[4px] text-white hover:bg-transparent hover:text-black"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : null}
      </div>

      <div className="flex items-center justify-between px-[40px] py-[7px]">
        <h1
          className="flex-1 cursor-pointer text-[32px] font-[700]"
          onClick={(e) => {
            e.preventDefault();
            router.push("/");
          }}
        >
          ECOMMERCE
        </h1>
        <nav className="flex w-[500px] items-center justify-center gap-[32px]">
          <Link href="/category" className="text-[16px] font-[500]">
            Categories
          </Link>
          <Link href="#" className="text-[16px] font-[500]">
            Sale
          </Link>
          <Link href="#" className="text-[16px] font-[500]">
            Clearance
          </Link>
          <Link href="#" className="text-[16px] font-[500]">
            New Stock
          </Link>
          <Link href="#" className="text-[16px] font-[500]">
            Trending
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-[32px]">
          <FaSearch size={"32px"} />
          <FaShoppingCart size={"32px"} />
        </div>
      </div>
      <div className="flex items-center justify-center gap-[24px] bg-[#F4F4F4] p-[12px]">
        <FaGreaterThan />
        <p className="text-[14px] font-[500]">
          Get 10% off on business sign up
        </p>
        <FaLessThan />
      </div>
    </header>
  );
}

export default Header;
