import { Hono } from "hono";
import { sign } from "hono/jwt";
import z  from "zod";
import { getPrisma } from "../utils/prismaHelper";
import { signUpSchema,signInSchema } from "../../../common/src";


const userRouter = new Hono<{Bindings:{
    DATABASE_URL:string,
    JWT_KEY:string
}}>();

userRouter.post('/signup', async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();
    const result = signUpSchema.safeParse(body);
    if(!result.success){
        return c.json({
            mssg:"Invalid Input!"
        },403)
    }

    const user = await prisma.user.create({
        data:{
            email:body.email,
            password:body.password,
            name:body.name
        }
    })
    const payload = {
        id:user.id,
        role:"user",
        exp:Math.floor(Date.now() / 1000) + 60 * 60 * 24
    }
    const token = await sign(payload,c.env.JWT_KEY)
    return c.json({
        jwt:token
    })
})

userRouter.post('/signin', async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);

    const body = await c.req.json();
    const result = signInSchema.safeParse(body);
    if(!result.success){
        return c.json({
            mssg:"Invalid Input!"
        },403)
    }
    const user = await prisma.user.findUnique({
        where:{
            email:body.email
        }
    });

    if(!user){
        c.status(403);
        return c.json({
            mssg:"No User Exist!!"
        })
    }
    const payload = {
        id:user.id,
        role:"user",
        exp:Math.floor(Date.now() / 1000) + 60 * 60 * 24
    }

    const token = await sign(payload,c.env.JWT_KEY);
    return c.json({
        jwt:token
    })
})

export default userRouter;