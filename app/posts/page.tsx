"use client";

import Link from "next/link";

interface PostProp {
  id: number;
  title: string;
  content: string;
}

export const revalidate = 1;

const getPosts = async (): Promise<PostProp[]> => {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

// async function getPosts() {
//   const res = await fetch("http://localhost:3000/api/posts", {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

export default async function PostPage() {
  const posts = await getPosts();
  async function deleteData(id: any) {
    await fetch(`http://localhost:3000/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div className="p-20">
      <h1 className="text-3xl mb-10">Post List</h1>
      <div className="mb-10 px-4 py-2 bg-red-500 rounded w-32 text-center">
        <Link href="/posts/create">Add</Link>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {posts.map((post: any) => (
          <div key={post.id} className="p-4 border rounded">
            <h1>{post.title}</h1>
            <p>{[post.content]}</p>
            <div className="flex items-center gap-4">
              <Link href={`/posts/${post.id}`}>Show</Link>
              <Link href={`/posts/edit/${post.id}`}>Edit</Link>
              <button onClick={() => deleteData(post.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
