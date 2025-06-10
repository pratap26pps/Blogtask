"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    const generatedSlug = title.toLowerCase().trim().replace(/\s+/g, "-");
    setSlug(generatedSlug);
  }, [title]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const blogPost = {
      title,
      slug,
      content,
      author,
      tags: tags.split(",").map((tag) => tag.trim()),
      date: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("blogPosts")) || [];
    const updated = [blogPost, ...existing];
    localStorage.setItem("blogPosts", JSON.stringify(updated));

    toast.success("Blog post saved");

    setTitle("");
    setContent("");
    setAuthor("");
    setTags("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10   rounded-2xl shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 text-center">
        Create a New Blog Post
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Slug:
          </label>
          <input
            type="text"
            value={slug}
            readOnly
            className="w-full px-4 py-2   border rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Content:
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            placeholder="Write your blog content here..."
            required
            className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Author Name:
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Tags (comma-separated):
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Save Blog Post
        </button>
      </form>
    </div>
  );
}
