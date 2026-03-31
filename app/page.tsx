"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [posts, setPosts] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Fetch posts from API
  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addOrUpdatePost = async () => {
    if (!input.trim()) return;

    if (editIndex !== null) {
      // Update
      await fetch("/api/posts", {
        method: "PUT",
        body: JSON.stringify({ index: editIndex, post: input }),
      });
      setEditIndex(null);
    } else {
      // Add
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ post: input }),
      });
    }

    setInput("");
    fetchPosts();
  };

  const deletePost = async (index: number) => {
    await fetch("/api/posts", {
      method: "DELETE",
      body: JSON.stringify({ index }),
    });

    fetchPosts();
  };

  const editPost = (index: number) => {
    setInput(posts[index]);
    setEditIndex(index);
  };

  return (
    <main
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        backgroundColor: "white",
        color: "black",
        padding: "20px",
        borderRadius: "10px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center" }}>My Blog Website</h1>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Write your post..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: "8px", width: "70%" }}
        />

        <button
          onClick={addOrUpdatePost}
          style={{ marginLeft: "10px", padding: "8px" }}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {posts.length === 0 ? (
        <p style={{ textAlign: "center" }}>No posts yet...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {posts.map((post, index) => (
            <li
              key={index}
              style={{
                background: "#f3f3f3",
                marginBottom: "10px",
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {post}

              <div>
                <button onClick={() => editPost(index)}>Edit</button>
                <button
                  onClick={() => deletePost(index)}
                  style={{ marginLeft: "5px" }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}