import React, { useState, useEffect } from 'react'
import Calendar from './components/Calendar'
import HabitForm from './components/HabitForm'
import HabitSetup from './components/HabitSetup'
import { Target, Gift, TrendingUp, Zap } from 'lucide-react'

interface HabitData {
  [date: string]: boolean[]
}

interface HabitInfo {
  name: string
  reason: string
  targetDays: number
  rewardMilestone: number
  reward: string
}

function App() {
  const [habitData, setHabitData] = useState<HabitData>({})
  const [habits, setHabits] = useState<HabitInfo[]>([])

  useEffect(() => {
    const storedData = localStorage.getItem('habitData')
    const storedHabits = localStorage.getItem('habits')
    if (storedData) {
      setHabitData(JSON.parse(storedData))
    }
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('habitData', JSON.stringify(habitData))
  }, [habitData])

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  const handleHabitSubmit = (completedHabits: boolean[]) => {
    const today = new Date().toISOString().split('T')[0]
    setHabitData(prevData => ({
      ...prevData,
      [today]: completedHabits
    }))
  }

  const handleHabitSetup = (newHabits: HabitInfo[]) => {
    setHabits(newHabits)
  }

  const calculateRemainingDays = (habit: HabitInfo) => {
    const completedDays = Object.values(habitData).filter(day => day[habits.indexOf(habit)]).length
    return Math.max(0, habit.targetDays - completedDays)
  }

  const calculateConsecutiveDays = (habit: HabitInfo) => {
    const habitIndex = habits.indexOf(habit)
    const sortedDates = Object.keys(habitData).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    let consecutiveDays = 0
    for (const date of sortedDates) {
      if (habitData[date][habitIndex]) {
        consecutiveDays++
      } else {
        break
      }
    }
    return consecutiveDays
  }

  const getMotivationalSuggestion = (habit: HabitInfo) => {
    const suggestions = [
      "Remember, every small step counts towards your goal!",
      "Visualize your success and let it drive you forward.",
      "Embrace the challenge - it's making you stronger every day.",
      "You've got this! Your future self will thank you.",
      "Stay consistent, and you'll see amazing results soon."
    ]
    return suggestions[Math.floor(Math.random() * suggestions.length)]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Habit Tracker</h1>
      {habits.length > 0 && (
        <div className="w-full max-w-md mb-8">
          {habits.map((habit, index) => (
            <div key={index} className="bg-white rounded-lg shadow-xl p-6 mb-6">
              <h3 className="text-2xl font-semibold mb-4 text-indigo-600">{habit.name}</h3>
              <div className="mb-6">
                <h4 className="text-xl font-medium mb-3 text-purple-600 flex items-center">
                  <Zap className="w-6 h-6 mr-2" />
                  Why This Habit Matters
                </h4>
                <p className="text-gray-800 bg-purple-100 p-4 rounded-md font-medium text-lg leading-relaxed shadow-inner">
                  {habit.reason}
                </p>
                <p className="text-sm text-indigo-600 mt-2 italic">
                  {getMotivationalSuggestion(habit)}
                </p>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-medium mb-2 text-green-600 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Progress Tracker
                </h4>
                <p className="text-3xl font-bold text-green-500">
                  {calculateRemainingDays(habit)} days remaining
                </p>
                <div className="mt-2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(habit.targetDays - calculateRemainingDays(habit)) / habit.targetDays * 100}%` }}></div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2 text-yellow-600 flex items-center">
                  <Gift className="w-5 h-5 mr-2" />
                  Reward Milestone
                </h4>
                <p className="text-gray-700">
                  {calculateConsecutiveDays(habit)}/{habit.rewardMilestone} days completed
                </p>
                <p className="text-sm text-gray-600 mt-1 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1 text-indigo-500" />
                  Reward: {habit.reward}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        {habits.length === 0 ? (
          <HabitSetup onSubmit={handleHabitSetup} />
        ) : (
          <>
            <HabitForm habits={habits.map(h => h.name)} onSubmit={handleHabitSubmit} />
            <Calendar habitData={habitData} habits={habits} />
          </>
        )}
      </div>
    </div>
  )
}

export default App