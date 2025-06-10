"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    setBlogs(storedPosts);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Blog Posts
      </h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blog posts found.</p>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="p-6   shadow-md rounded-xl border border-gray-200 transition-transform hover:scale-[1.01]"
            >
              <Link
                href={`/blog/${encodeURIComponent(blog.slug)}`}
                className="text-xl font-semibold text-blue-600 hover:underline"
              >
                {blog.title}
              </Link>

              <p className="text-sm text-gray-600 mt-1">
                Author: <span className="font-medium">{blog.author}</span> |{" "}
                {new Date(blog.date).toLocaleString()}
              </p>



              <p className="mt-4 text-gray-800 whitespace-pre-line">
                {blog.content.length > 200
                  ? blog.content.substring(0, 200) + "..."
                  : blog.content}
              </p>

             
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
