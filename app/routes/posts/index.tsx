import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';
import { createRoute } from 'honox/factory';

export default createRoute(async (c) => {
  const adapter = new PrismaD1(c.env.DB);
  const prisma = new PrismaClient({ adapter });

  const posts = await prisma.post.findMany();
  return c.render(
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li>
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
      <a href={'/posts/create'}>create new post</a>
    </div>
  );
});
