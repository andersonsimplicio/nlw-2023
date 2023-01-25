import daysjs from 'dayjs'
import { FastifyInstance } from "fastify"
import { prisma } from "./lib/prisma"
import {z} from 'zod'


export async function appRoutes(app:FastifyInstance){
    
    app.post('/habits',async (resquest)=>{
      const createHabitBody =z.object({
        title:z.string(),
        weekDays:z.array(z.number().min(0).max(6))
      })
      const {title,weekDays} = createHabitBody.parse(resquest.body)
      const today = daysjs().startOf('day').toDate()
    
      await prisma.habit.create({
        data:{
            title,
            create_at: today,
            weeksDays:{
                create:weekDays.map( weekDay =>{
                    return{
                        week_day:weekDay,
                    }
                })
            }
        }
      })
    
    })




    app.get('/list-habits',async ()=>{
        const habits = await prisma.habit.findMany()
        return habits
    })
}

function dayjs() {
    throw new Error("Function not implemented.")
}
