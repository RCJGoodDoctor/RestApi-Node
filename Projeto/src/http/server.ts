import fastify from "fastify";
import { createProduct } from "./controllers/produtoController";

const app = fastify()
app.register(createProduct)
app.listen({port:8000}).then(() =>{
	console.log("Server is gone")
})

