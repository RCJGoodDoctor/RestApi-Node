import { FastifyInstance } from "fastify";
import {z} from 'zod'
import {prisma} from "../lib/prisma"


export async function createProduct(app:FastifyInstance){
    app.post('/createProduct',async (request,reply) => {
        const createProduct = z.object({
            cd_produto: z.number(),
            nm_produto: z.string(),
            vl_produto: z.number()
        })

        const {cd_produto,nm_produto,vl_produto} = createProduct.parse(request.body)
        const product = await prisma.produto.create({
            data:{
                cd_produto,
                nm_produto,
                vl_produto
            }
        })

        return reply.status(201).send({productId: product.cd_produto})
    })
}