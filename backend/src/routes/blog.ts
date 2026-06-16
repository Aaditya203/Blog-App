import { Hono } from 'hono'
import { blogSchema, blogUpdateSchema } from '../../../common/src/index';
import { getPrisma } from '../utils/prismaHelper';
const blogRouter = new Hono<{Bindings:{
  DATABASE_URL:string
},
  Variables:{
    userid:string
}}>()


blogRouter.post('/', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const body = await c.req.json();
  const result = blogSchema.safeParse(body);

  if(!result.success){
     c.status(400)
     return c.json({
      mssg:"Invalid/Incomplete Input"
     })
  }
  const userid = c.get('userid');

  const blog = await prisma.post.create({
    data:{
      title:result.data.title,
      content:result.data.content,
      authorId:userid
    }
  })
  return c.json({
    mssg:"Blog Created Successfully!!",
    blogId:blog.id
  })
})

blogRouter.get('/bulk', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const blogs = await prisma.post.findMany({
    take:10,
    skip:0
  });

  return c.json({
    blogs
  })
})
blogRouter.get('/my', async (c) => {
  const userid = c.get('userid');
  const prisma = getPrisma(c.env.DATABASE_URL);
  const blogs = await prisma.post.findMany({
    where:{
      authorId:userid
    }
  });
})

blogRouter.get('/user/:id/blogs', async (c) => {
  const otherAuthorId = c.req.param('id');
  const prisma = getPrisma(c.env.DATABASE_URL);
  const blogs = await prisma.post.findMany({
    where:{
      authorId:otherAuthorId
    }
  });

  return c.json({
    blogs
  })
})

blogRouter.get('/:id',async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const blogId = c.req.param('id');
  const blog = await prisma.post.findUnique({
    where:{
      id:blogId
    }
  })
  if(!blog){
    return c.json({
      mssg:"Blog Not Found"
    },404)
  }
  return c.json({
    blog
  })
})

blogRouter.put('/:id',async (c) => {
  const userid = c.get('userid');
  const prisma = getPrisma(c.env.DATABASE_URL);
  const blogId = c.req.param('id');
  const blog = await prisma.post.findUnique({
  where: {
    id: blogId
  }
});

if (!blog || blog.authorId !== userid) {
  return c.json({ mssg: "Unauthorized" }, 403);
}
  const body = await c.req.json();
  const result = blogUpdateSchema.safeParse(body);
  if(!result.success){
    return c.json({
      mssg:"Invalid Format"
    })
  }
  try{
    const updatedBlog = await prisma.post.update({
    where:{
      id:blogId,
     
    },
    data:{
      title:result.data.title,
      content:result.data.content
    }
  })
  return c.json({
    mssg:"Blog Updated Successfully!!"
  })}catch{
    return c.json({
      mssg:'Failed'
    },500)
  }
})

blogRouter.delete('/:id', async (c) => {
  const userid = c.get('userid');
  const prisma = getPrisma(c.env.DATABASE_URL);

  const blogId = c.req.param('id');
  try{
  const blog = await prisma.post.delete({
    where:{
      id:blogId,
      authorId:userid
    }
  })
  return c.json({
    mssg:"Blog deleted!!"
  })
  }catch{
    return c.json({
      mssg:"Failed!"
    },500)
  }
})

export default blogRouter