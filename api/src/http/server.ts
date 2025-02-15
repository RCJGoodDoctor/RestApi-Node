import fastify from 'fastify';
const app = fastify()

app.listen({port: 8000}).then(() =>{

    console.log("Server is running")
})
