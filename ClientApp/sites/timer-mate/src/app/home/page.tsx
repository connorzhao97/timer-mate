import { fetchGraphQL, gql } from "@/graphql";
import { revalidateTag } from "next/cache";

export default async function Home() {
  const posts: Post[] = await getData();

  return (
    <div>
      <main style={{ margin: "3rem" }}>
        <h1>Hello World! 👋🏻 </h1>
        <ul>
          {/* Render each post with a link to the content page */}
          {posts?.map((post) => (
            <li key={post.id}>
              <div>
                {post.id} - {post.title}
              </div>
              {/* <Link href={`/post/${post}`}>{post.title}</Link> */}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
type Post = {
  id: string;
  title: string;
};

async function getData() {
  try {
    revalidateTag("posts");
    const data = await fetchGraphQL(
      gql`
        query getAllPosts {
          posts {
            title
            id
          }
        }
      `,
      undefined,
      "posts"
    );
    return (data?.posts as Post[]) || [];
  } catch (e) {
    return [];
  }
}
