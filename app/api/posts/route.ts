let posts: string[] = [];

export async function GET() {
  return Response.json(posts);
}

export async function POST(req: Request) {
  const body = await req.json();
  posts.push(body.post);
  return Response.json({ message: "Post added" });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  posts = posts.filter((_, i) => i !== body.index);
  return Response.json({ message: "Post deleted" });
}

export async function PUT(req: Request) {
  const body = await req.json();
  posts[body.index] = body.post;
  return Response.json({ message: "Post updated" });
}