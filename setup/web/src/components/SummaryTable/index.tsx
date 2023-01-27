import { generateDates } from "../../utils/generate-dates";
import { HabitsDay } from "../habitsDay";

const weekDays = ['D','S','T','Q','Q','S','S']
const sumayDates = generateDates()
const minDateDaysSize = 18 * 7 
const amountOfDayToFill = minDateDaysSize - sumayDates.length
export function SummaryTable(){
    return(
         <div className="w-full flex">
               <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay, i) => {
                return (
                    <div
                    key={`${weekDay}-${i}`}
                    className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
                    >
                    {weekDay}
                    </div>
                )
                })}
                </div>
                <div className="grid grid-rows-7 grid-flow-col gap-3">
                    {sumayDates.map(day=>{
                        return(<HabitsDay key={day.toString()}/>)
                    })}
                    {amountOfDayToFill > 0 && Array.from({ length:amountOfDayToFill}).map((_,i)=>{
                        return (<div key={i} 
                                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />)
                    })}
                </div> 
      </div>
    );
}