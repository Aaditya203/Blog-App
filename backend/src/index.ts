import { Hono } from 'hono'
import { verify  } from 'hono/jwt'
import { PrismaClient } from "./generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

import userRouter from './routes/user'
import blogRouter from './routes/blog'


type JwtPayload = {
  id: string;
  role: string;
  exp: number;
};
const app = new Hono<{
    Bindings:{
        JWT_KEY:string
    },
    Variables:{
        userid:string
    }
}>()

app.use('/api/v1/blog/*',async (c,next)=>{
    const authorizationID = c.req.header('Authorization');
    if(!authorizationID){
        return c.json({
            mssg:"Token missing!!"
        })
    }
    const token = authorizationID.split(" ")[1];
    try{
        const payload = await verify(token,c.env.JWT_KEY,'HS256') as JwtPayload;
        c.set('userid',payload.id);
        await next();
    }catch{
        return c.json({
            mssg:"Unauthorized"
        })
    }
    
})

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

export default app