import React from "react";
import PostListItem from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import SkeletonLoader from "./SkeletonLoader";
const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams]);
  // console.log(searchParamsObj);

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, limit: 10, ...searchParamsObj },
    // posts?page=1&limit=2
  });
  return res.data;
};

function PostList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });
  // console.log(data);
  if (isFetching) return <SkeletonLoader />;

  if (error) return "Something went wrong!";

  // -1
  // posts:[1,2]
  // -2
  // posts:[3,4]
  // -3
  // posts:[5,6]
  //[1,2,3,4,5,6]

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];
  // console.log(allPosts);

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<SkeletonLoader />}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>All Posts Loaded!</b>
        </p>
      }
    >
      {allPosts.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </InfiniteScroll>
    // <div className="flex flex-col gap-12 mb-8">
    // </div>
  );
}

export default PostList;
