import Fastify from "fastify";
import cors from "@fastify/cors"
import {PrismaClient} from "@prisma/client"
const app = Fastify()
const prima = new PrismaClient()

app.register(cors,{
    origin:['http://localhost:3000']
})

app.get('/list-habits',async ()=>{
    const habits = await prima.habit.findMany({
        where:{
            title:{
                startsWith:"Beber"
            }
        }
    })
    return habits
})

app.listen({
    port:3333
}).then(()=>{
    console.log('Running Server:');
    
})