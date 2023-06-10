import React from "react";

interface PostProp {
  id: number;
  title: string;
  content: string;
}

const getPost = async (id: string): Promise<PostProp> => {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function PostShow({
  params: { id },
}: {
  params: { id: string };
}) {
  const post = await getPost(id);
  return (
    <div className="p-20">
      <h1 className="text-3xl mb-10">PostPage</h1>
      <div className="p-4 border rounded">
        <h1>{post?.title}</h1>
        <p>{post?.content}</p>
      </div>
    </div>
  );
}
