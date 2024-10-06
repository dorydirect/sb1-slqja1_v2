import React from 'react'
import { Check } from 'lucide-react'

interface HabitInfo {
  name: string
  reason: string
  targetDays: number
  rewardMilestone: number
  reward: string
}

interface CalendarProps {
  habitData: {
    [date: string]: boolean[]
  }
  habits: HabitInfo[]
}

const Calendar: React.FC<CalendarProps> = ({ habitData, habits }) => {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const calculateConsecutiveDays = (habitIndex: number) => {
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

  const getMilestoneDate = (habitIndex: number) => {
    const consecutiveDays = calculateConsecutiveDays(habitIndex)
    const remainingDays = habits[habitIndex].rewardMilestone - consecutiveDays
    if (remainingDays <= 0) return null

    const milestoneDate = new Date()
    milestoneDate.setDate(milestoneDate.getDate() + remainingDays)
    return milestoneDate
  }

  return (
    <div className="mt-6 bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-800">
        {today.toLocaleString('default', { month: 'long' })} {currentYear}
      </h2>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium text-indigo-600 mb-2">
            {day}
          </div>
        ))}
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} className="h-24" />
          ))}
        {days.map(day => {
          const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const dayHabits = habitData[date] || []

          const isMilestoneDate = habits.some((_, index) => {
            const milestoneDate = getMilestoneDate(index)
            return milestoneDate && milestoneDate.getDate() === day && milestoneDate.getMonth() === currentMonth
          })

          const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()

          return (
            <div
              key={day}
              className={`h-24 border border-indigo-200 p-1 flex flex-col rounded-lg transition-all duration-300 ${
                isMilestoneDate ? 'bg-yellow-100 shadow-md' : 'hover:shadow-md'
              } ${isToday ? 'ring-2 ring-indigo-500' : ''}`}
            >
              <span className={`text-sm font-medium ${isToday ? 'text-indigo-600' : 'text-gray-700'}`}>{day}</span>
              <div className="flex flex-wrap gap-1 mt-1 justify-center items-center h-full">
                {habits.map((habit, index) => {
                  const size = Math.floor(100 / habits.length) // Calculate size based on number of habits
                  return (
                    <div
                      key={habit.name}
                      className={`flex items-center justify-center rounded-sm transition-all duration-300 ${
                        dayHabits[index] === undefined
                          ? 'border-2 border-gray-300'
                          : dayHabits[index]
                          ? 'bg-green-500 border-green-500'
                          : 'bg-red-500 border-red-500'
                      }`}
                      style={{ width: `${size}%`, height: `${size}%`, maxWidth: '20px', maxHeight: '20px' }}
                    >
                      {dayHabits[index] === true && (
                        <Check className="text-white" style={{ width: '80%', height: '80%' }} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar