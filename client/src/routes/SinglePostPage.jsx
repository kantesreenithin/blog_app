import React from "react";
import Image from "../components/Image";
import { Link, useParams } from "react-router-dom";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comment from "../components/Comment";
import Comments from "../components/Comments";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet-async";
import parse from "react-html-parser";
import SkeletonLoader from "../components/SkeletonLoader";
const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};
function SinglePostPage() {
  const { slug } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return <SkeletonLoader/>;
  if (error) return "Something Went Wrong!" + error.message;
  if (!data) return "Post not Found!";

  // console.log(data);

  {
    /* SEO Metadata */
  }
  <Helmet>
    <title>{data.title} | My Blog</title>
    <meta name="description" content={data.desc || data.title} />
    <meta property="og:title" content={data.title} />
    <meta property="og:description" content={data.desc || data.title} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={window.location.href} />
    {data.img && <meta property="og:image" content={data.img} />}
    <link rel="canonical" href={window.location.href} />
  </Helmet>;

  // Sanitize the React Quill content to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(data.content);

  return (
    <div className="flex flex-col gap-8">
      {/*detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-800">{data.user.username}</Link>
            <span>on</span>
            <Link className="text-blue-800">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">{data.desc}</p>
        </div>
        {data.img && (
          <div className="hidden lg:block w-2/5">
            <Image src={data.img} className="rounded-2xl" />
          </div>
        )}
      </div>
      {/*content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/*text */}
        {/*  Render React Quill Content */}
        {/* <div className="lg:text-lg flex flex-col gap-6 text-justify ql-editor">
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </div>*/}
        {
          <div className="lg:text-lg flex flex-col gap-6 text-justify ql-editor">
            {parse(sanitizedContent)}
          </div>
        }
        {/*Menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              {data.user.img && (
                <Image
                  src={data.user.img}
                  className="w-12 h-12 rounded-full object-cover"
                  w="48"
                  h="48"
                />
              )}
              <Link className="text-blue-800">{data.user.username}</Link>
            </div>
            {/*   <p className="text-sm text-gray-500">
              Lorem Ipsum is simply dummy text of the printing.
            </p>*/}
            <div className="flex gap-2">
              <Link>
                <Image src="facebook.svg" />
              </Link>
              <Link>
                <Image src="instagram.svg" />
              </Link>
            </div>
          </div>
          <PostMenuActions post={data} />
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline" to="/">
              All
            </Link>
            <Link className="underline" to="/">
              Web Design
            </Link>
            <Link className="underline" to="/">
              Development
            </Link>
            <Link className="underline" to="/">
              Databases
            </Link>
            <Link className="underline" to="/">
              Search Engines
            </Link>
            <Link className="underline" to="/">
              Marketing
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search a Post</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data._id} />
    </div>
  );
}

export default SinglePostPage;
