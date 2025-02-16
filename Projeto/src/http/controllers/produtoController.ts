import { FastifyInstance } from "fastify";
import {z} from 'zod'
import {prisma} from "../lib/prisma"
import { request } from "http";


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
export async function getProduct(app:FastifyInstance){
    app.get('/product',async (request,reply) =>{
        const produtos = await prisma.produto.findMany()
        return reply.status(200).send(produtos)
    })

    app.get('/product/:produtoId', async (request,reply) =>{
        const params = z.object({
            produtoId: z.string().regex(/^\d+$/, "ID deve ser um número"),
        })
        console.log(request.params)
        const {produtoId} = params.parse(request.params)
        console.log("produtoId")
        console.log(produtoId)
        const id =  parseInt(produtoId,10)
        const produto = await prisma.produto.findUnique({
            where:{
                cd_produto : id
            }
        })
        return reply.status(200).send(produto)
    })
}