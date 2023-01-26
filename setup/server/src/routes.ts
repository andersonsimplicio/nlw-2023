import dayjs from 'dayjs'
import { FastifyInstance } from "fastify"
import { prisma } from "./lib/prisma"
import {z} from 'zod'

export async function appRoutes(app:FastifyInstance){
    
    app.post('/habits',async (request)=>{
      const createHabitBody =z.object({
        title:z.string(),
        weekDays:z.array(z.number().min(0).max(6))
      })
      const {title,weekDays} = createHabitBody.parse(request.body)
      const today = dayjs().startOf('day').toDate()
    
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

    app.get('/day', async (request)=>{


        const getDayParams = z.object({
            date:z.coerce.date()
        })
        const { date } = getDayParams.parse(request.query)
        const parseDay  =dayjs(date).startOf('day')
        const weekDay = parseDay.get('day')

        const possibleHabits = await prisma.habit.findMany({
            where:{
                create_at:{lte:date,},
                weeksDays:{some:{week_day:weekDay}}
            },
            
        })

             
        const day = await prisma.day.findUnique({
            where:{
                date:parseDay.toDate(),
            },
            include:{
                dayHabits:true
            }
        })
         const completedHabits = day?.dayHabits.map( dayHabits=>{
            return dayHabits.habit_id
         })    

        console.log(date,weekDay,day);
        
        return {
            possibleHabits,completedHabits
        }

    })

}   

