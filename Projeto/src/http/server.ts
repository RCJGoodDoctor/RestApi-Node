import fastify from "fastify";
import { createProduct, getProduct } from "./controllers/produtoController";

const app = fastify()
app.register(createProduct)
app.register(getProduct)
app.listen({port:8000}).then(() =>{
	console.log("Server is gone")
})

