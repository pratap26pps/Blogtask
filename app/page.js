"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-10">Welcome to My Blog App</h1>

      <div className="flex gap-6">
        <button
          className="border-2 border-b-emerald-900 p-2 rounded-2xl hover:bg-amber-900 cursor-pointer"
          onClick={() => router.push("/write")}
        >
          Go to Write Page
        </button>

        <button
          className="border-2 border-b-emerald-900 p-2 rounded-2xl hover:bg-amber-900 cursor-pointer"
          onClick={() => router.push("/blog")}
        >
          View Blog List
        </button>
      </div>
    </main>
  );
}
