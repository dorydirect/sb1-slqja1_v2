import React, { useState } from 'react'

interface HabitInfo {
  name: string
  reason: string
  targetDays: number
  rewardMilestone: number
  reward: string
}

interface HabitSetupProps {
  onSubmit: (habits: HabitInfo[]) => void
}

const HabitSetup: React.FC<HabitSetupProps> = ({ onSubmit }) => {
  const [habits, setHabits] = useState<HabitInfo[]>([{ name: '', reason: '', targetDays: 0, rewardMilestone: 0, reward: '' }])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nonEmptyHabits = habits.filter(habit => 
      habit.name.trim() !== '' && 
      habit.reason.trim() !== '' && 
      habit.targetDays > 0 &&
      habit.rewardMilestone > 0 &&
      habit.reward.trim() !== ''
    )
    if (nonEmptyHabits.length > 0) {
      onSubmit(nonEmptyHabits)
    }
  }

  const handleChange = (index: number, field: keyof HabitInfo, value: string | number) => {
    setHabits(prevHabits => {
      const newHabits = [...prevHabits]
      newHabits[index] = { ...newHabits[index], [field]: value }
      return newHabits
    })
  }

  const addHabit = () => {
    if (habits.length < 4) {
      setHabits(prevHabits => [...prevHabits, { name: '', reason: '', targetDays: 0, rewardMilestone: 0, reward: '' }])
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Set up your habits (max 4)</h2>
      {habits.map((habit, index) => (
        <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg shadow-md">
          <input
            type="text"
            value={habit.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
            placeholder={`Habit ${index + 1}`}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out shadow-sm hover:shadow-md"
          />
          <textarea
            value={habit.reason}
            onChange={(e) => handleChange(index, 'reason', e.target.value)}
            placeholder="Why do you want to achieve this habit?"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out shadow-sm hover:shadow-md"
            rows={3}
          />
          <div>
            <label htmlFor={`targetDays-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
              How many days do you need to perform this habit to achieve your target?
            </label>
            <input
              type="number"
              id={`targetDays-${index}`}
              value={habit.targetDays}
              onChange={(e) => handleChange(index, 'targetDays', parseInt(e.target.value))}
              min="1"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out shadow-sm hover:shadow-md"
            />
          </div>
          <div>
            <label htmlFor={`rewardMilestone-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
              After how many days in a row do you want to reward yourself?
            </label>
            <input
              type="number"
              id={`rewardMilestone-${index}`}
              value={habit.rewardMilestone}
              onChange={(e) => handleChange(index, 'rewardMilestone', parseInt(e.target.value))}
              min="1"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out shadow-sm hover:shadow-md"
            />
          </div>
          <div>
            <label htmlFor={`reward-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
              What will be your reward?
            </label>
            <input
              type="text"
              id={`reward-${index}`}
              value={habit.reward}
              onChange={(e) => handleChange(index, 'reward', e.target.value)}
              placeholder="Your reward"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out shadow-sm hover:shadow-md"
            />
          </div>
        </div>
      ))}
      {habits.length < 4 && (
        <button
          type="button"
          onClick={addHabit}
          className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-300 transition duration-300 shadow-sm hover:shadow-md"
        >
          Add Habit
        </button>
      )}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-300 shadow-sm hover:shadow-md"
      >
        Start Tracking
      </button>
    </form>
  )
}

export default HabitSetup