"use client";

import { useEffect, useState } from "react";


export default function BlogDetail({ params }) {
  const { slug } = params;
  const [blog, setBlog] = useState(null);
  const [notFoundPage, setNotFoundPage] = useState(false);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    const found = posts.find((post) => post.slug === slug);
    if (found) {
      setBlog(found);
    } else {
      setNotFoundPage(true);
    }
  }, [slug]);

  if (notFoundPage) {
    return (
      <div className="text-center mt-20 text-red-600 font-bold text-xl">
        Blog post not found.
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">{blog.title}</h1>
      <p className="text-gray-600 text-sm mb-1">
        By <span className="font-medium">{blog.author}</span> |{" "}
        {new Date(blog.date).toLocaleString()}
      </p>
      <p className="mb-4 text-gray-500">Tags: {blog.tags.join(", ")}</p>
      <hr className="mb-6" />
      <div className="text-white ">
        {blog.content}
      </div>
    </div>
  );
}
