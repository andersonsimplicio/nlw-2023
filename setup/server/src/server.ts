import Fastify from "fastify";
import cors from "@fastify/cors"
import { appRoutes } from "./routes";


const app = Fastify()


app.register(cors,{
    origin:['http://localhost:3000']
})
app.register(appRoutes)


app.listen({
    port:3333
}).then(()=>{
    console.log('Running Server:http://localhost:3333/list-habits');
    
})