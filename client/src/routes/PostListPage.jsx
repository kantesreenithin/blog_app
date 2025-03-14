import React, { useState } from "react";
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";
import { useSearchParams } from "react-router-dom";
function PostListPage() {
  const [open, SetOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const cur_category = searchParams.get("cat");
  const cur_nav = searchParams.get("sort");
  let category_obj = {
    title: "",
    description: "",
  };
  switch (cur_category) {
    case "web-design":
      category_obj.title = "Web Design";
      category_obj.description = "Explore the world of Web-design technologies";
      break;
    case "development":
      category_obj.title = "Development";
      category_obj.description =
        "Explore the world of development technologies";
      break;
    case "databases":
      category_obj.title = "Databases";
      category_obj.description = "Explore how data is managed in databases";
      break;
    case "seo":
      category_obj.title = "Seo";
      category_obj.description = "Explore about search engine optimisation";
      break;
    case "marketing":
      category_obj.title = "Marketing";
      category_obj.description = "Explore the latest marketing tools";
      break;
    default:
      category_obj.title = "Explore";
      category_obj.description =
        "Choose from a wide range of topics to explore";
      break;
  }
  switch (cur_nav) {
    case "trending":
      category_obj.title = "Trending";
      category_obj.description = "Explore the world of Web-design technologies";
      break;
    case "popular":
      category_obj.title = "Most Popular";
      category_obj.description =
        "Explore the world of development technologies";
      break;
    case "oldest":
      category_obj.title = "Old Posts";
      category_obj.description =
        "Explore the world of development technologies";
      break;
    case "newest":
      category_obj.title = "New Posts";
      category_obj.description =
        "Explore the world of development technologies";
      break;
    default:
      break;
  }

  return (
    <div className="">
      <div className="mb-8 text-2xl">
        <div>
          <h1 className="text-gray-800 text-xl md:text-3xl lg:text-4xl font-bold">
            {category_obj.title}
          </h1>
          <p className="text-secondary-text-color font-medium text-md md:text-xl mt-4 mb-4">
            {category_obj.description}
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          SetOpen((prev) => !prev);
        }}
        className="md:hidden bg-blue-800 text-sm text-white px-4 py-2 rounded-2xl mb-4  "
      >
        {open ? "Close" : "Fliter or Search"}
      </button>
      <div className="flex flex-col-reverse gap-8 md:flex-row">
        <div className="">
          <PostList />
        </div>
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <SideMenu />
        </div>
      </div>
    </div>
  );
}

export default PostListPage;
