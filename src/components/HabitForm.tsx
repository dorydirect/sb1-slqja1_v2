import React, { useState } from 'react'

interface HabitFormProps {
  habits: string[]
  onSubmit: (habits: boolean[]) => void
}

const HabitForm: React.FC<HabitFormProps> = ({ habits, onSubmit }) => {
  const [completedHabits, setCompletedHabits] = useState<boolean[]>(new Array(habits.length).fill(false))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(completedHabits)
    setCompletedHabits(new Array(habits.length).fill(false))
  }

  const handleChange = (index: number) => {
    setCompletedHabits(prevHabits => {
      const newHabits = [...prevHabits]
      newHabits[index] = !newHabits[index]
      return newHabits
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Did you complete your habits today?</h2>
      {habits.map((habit, index) => (
        <div key={habit} className="flex items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition duration-200 ease-in-out">
          <input
            type="checkbox"
            id={habit}
            checked={completedHabits[index]}
            onChange={() => handleChange(index)}
            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 transition duration-200 ease-in-out"
          />
          <label htmlFor={habit} className="ml-3 text-gray-700 font-medium cursor-pointer select-none flex-grow">
            {habit}
          </label>
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-300 shadow-sm hover:shadow-md"
      >
        Submit
      </button>
    </form>
  )
}

export default HabitForm