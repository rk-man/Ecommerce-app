import React, { useContext, useEffect, useState } from "react";
import Paginate from "react-paginate";
import { api } from "@/utils/api";
import UserContext from "@/context/UserContext";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

function checkIfUserSelectedCategory(
  item: {
    users: {
      user_id: string;
      category_id: string;
    }[];
  } & {
    id: string;
    title: string;
  },

  logged_in_user_id: string,
) {
  if (!logged_in_user_id) {
    return false;
  }
  let filtered_users = item.users.filter((user) => {
    return user.user_id === logged_in_user_id;
  });

  if (filtered_users.length === 0) return false;

  return true;
}

function index() {
  const { authUser, userLoading } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(true);

  let [items, setItems] = useState<
    ({
      users: {
        user_id: string;
        category_id: string;
      }[];
    } & {
      id: string;
      title: string;
    })[]
  >([]);

  const [itemOffset, setItemOffset] = useState(0);

  const router = useRouter();
  useEffect(() => {
    if (!authUser.user && !userLoading) {
      router.push("/user/login");
    } else if (authUser.user && !userLoading && !authUser.user.isVerified) {
      router.push("/user/verify");
    }
  }, [authUser, userLoading]);

  useEffect(() => {
    if (authUser.user) {
      handleGetCategories();
    }
  }, [authUser]);

  useEffect(() => {
    if (items.length > 0) setLoading(false);
  }, [items]);

  const endOffset = itemOffset + 6;
  const currentItems = items?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items?.length / 6);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 6) % items.length;

    setItemOffset(newOffset);
  };

  const handleChooseCategories = async (selectedCategory: string) => {
    try {
      setLoading(true);
      await axios.post(
        "/api/category/choose",
        {
          category_id: selectedCategory,
        },
        {
          withCredentials: true,
        },
      );

      await handleGetCategories();
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const handleDeselectCategories = async (selectedCategory: string) => {
    try {
      setLoading(true);
      await axios.post(
        "/api/category/deselect",
        {
          category_id: selectedCategory,
        },
        {
          withCredentials: true,
        },
      );

      await handleGetCategories();
    } catch (err) {}
  };

  const handleGetCategories = async () => {
    try {
      const api_res = await axios.get("/api/category", {
        withCredentials: true,
      });
      setItems(api_res.data.data);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="my-[40px] flex w-full items-start justify-center">
      <div className="min-w-[576px] divide-solid rounded-[20px] border-[1px] border-[#C1C1C1] px-[60px] py-[40px]">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h1 className="mb-[24px] text-center text-[32px] font-[600]">
              Please mark your interests
            </h1>

            <p className="mb-[36px] text-center text-[16px]">
              We will keep you notified!
            </p>

            <h3 className="mb-[28px] text-[20px] font-[500]">
              My saved interests!
            </h3>

            <div>
              <div className="mb-[67px]">
                {currentItems.length > 0 &&
                  currentItems.map((item) => (
                    <div
                      key={item.id}
                      className="mb-[23px] flex items-center justify-start gap-[10px]"
                    >
                      <input
                        id={item.id}
                        type="checkbox"
                        className="category-checkbox h-[24px] w-[24px] accent-black"
                        checked={checkIfUserSelectedCategory(
                          item,
                          authUser.user ? authUser.user.id : "",
                        )}
                        onChange={(e) => {
                          if (e.target.checked === false)
                            handleDeselectCategories(e.target.id);
                          else handleChooseCategories(e.target.id);
                        }}
                      />
                      <p className="text-[16px]">{item.title}</p>
                    </div>
                  ))}
              </div>
              <Paginate
                pageCount={pageCount}
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                renderOnZeroPageCount={null}
                previousLabel="< previous"
                className="flex items-center  justify-center gap-[10px] text-[20px] font-[500] text-[#ACACAC]"
                activeClassName="text-[#000000]"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default index;
