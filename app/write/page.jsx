

"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Placeholder.configure({
        placeholder: "Write your blog content here...",
      }),
    ],
    content: "",
  });

  useEffect(() => {
    const generatedSlug = title.toLowerCase().trim().replace(/\s+/g, "-");
    setSlug(generatedSlug);
  }, [title]);

  const handleEmojiSelect = (emoji) => {
    editor?.chain().focus().insertContent(emoji.native).run();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const blogPost = {
      title,
      slug,
      content: editor?.getHTML(),
      author,
      tags: tags.split(",").map((tag) => tag.trim()),
      date: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("blogPosts")) || [];
    const updated = [blogPost, ...existing];
    localStorage.setItem("blogPosts", JSON.stringify(updated));

    toast.success("Blog post saved");

    setTitle("");
    editor?.commands.setContent("");
    setAuthor("");
    setTags("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 rounded-2xl shadow-md border border-gray-200 bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 text-center">
        Create a New Blog Post
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title Input */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Slug:</label>
          <input
            type="text"
            value={slug}
            readOnly
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
          />
        </div>

        {/* Content Editor */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Content:</label>

          {/* Toolbar */}
          <div className="mb-2 flex gap-2">
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className="px-3 py-1 border rounded-md bg-transparent text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 font-bold"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className="px-3 py-1 border rounded-md bg-transparent text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 italic"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              className="px-3 py-1 border rounded-md bg-transparent text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 underline"
            >
              U
            </button>
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="px-3 py-1 border rounded-md bg-transparent text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900"
            >
              😊
            </button>
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="mb-2 border rounded-md p-2 bg-gray-50 dark:bg-gray-800">
              <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            </div>
          )}

          {/* Editor Content */}
          <div className="border rounded-md px-4 py-2 min-h-[200px] bg-gray-50 dark:bg-gray-800 dark:text-white">
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Author Input */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Author Name:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Tags Input */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
            Tags (comma-separated):
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Submit Button */}
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
