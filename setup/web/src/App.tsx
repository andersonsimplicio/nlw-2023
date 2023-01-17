import { Habits } from "./components/habits"

function App() {
  return (
    <div>
         <Habits completed={3}/>
         <Habits completed={4}/>
         <Habits completed={5}/>
         <Habits completed={15}/>
   </div>
  )
}

export default App
