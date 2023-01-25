import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

const firstHabitId = '0730ffac-d039-4194-9571-01aa2aa0efbd'
const firstHabitCreationDate = new Date('2022-12-31T03:00:00.000')

const secondHabitId = '00880d75-a933-4fef-94ab-e05744435297'
const secondHabitCreationDate = new Date('2023-01-03T03:00:00.000')

const thirdHabitId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00'
const thirdHabitCreationDate = new Date('2023-01-08T03:00:00.000')

const habitData:Prisma.HabitCreateInput[] = [
    {
    id:firstHabitId,  
    title:'Estudar TypeScript',
    create_at: firstHabitCreationDate ,
    weeksDays:{
      create:[
        {week_day:1},
        {week_day:2},
        {week_day:3}
      ]
    }
    },
    {
      id:secondHabitId,
      title:'Estudar Estatística',
      create_at: secondHabitCreationDate ,
      weeksDays:{
        create:[
          {week_day:1},
          {week_day:2},
          {week_day:3},
          {week_day:4},
          {week_day:5},
        ]
      }
    },
    {
      id:thirdHabitId,
      title:'Estudar Inteligência Artificial',
      create_at: thirdHabitCreationDate,
      weeksDays:{
        create:[
          {week_day:1},
          {week_day:2},
          {week_day:3},
          {week_day:4},
          {week_day:5},
        ]
      }
    }
]
const daysData:Prisma.DayCreateInput[] =[
  { /** Monday */
        date: new Date('2023-01-02T03:00:00.000z'),
        dayHabits: {
          create: {
            habit_id: firstHabitId,
          }
        }
  },
  {
    /** Friday */
    date: new Date('2023-01-06T03:00:00.000z'),
          dayHabits: {
            create: {
              habit_id: firstHabitId,
            }
    }
  },
  { /** Wednesday */
    date:new Date('2023-01-04T03:00:00.000z'),
    dayHabits: {
      create: [
      {habit_id: firstHabitId},
      { habit_id: secondHabitId }
    ]
    }
  }
]



async function main() {
    await prisma.dayHabit.deleteMany()
    await prisma.habitWeekDays.deleteMany()
    await prisma.day.deleteMany()
    await prisma.habit.deleteMany() 
    for(const habit of habitData){
      await prisma.habit.create({data:habit,})
    }
    for(const dia of daysData){
      await prisma.day.create({data:dia,})
    }
}

 
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })