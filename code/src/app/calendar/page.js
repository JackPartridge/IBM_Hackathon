import React from 'react'

// Utility function to get the number of days in a month
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate()
}

// Utility function to get the first day of the month
const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay()
}

// Adjust this to change the month and year
const year = 2024 // Example year
const month = 2 // October (0-indexed)

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export default function Calendar () {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  // Create an array representing each cell in the calendar grid
  const calendarDays = Array.from({ length: daysInMonth + firstDayOfMonth }).map((_, index) => {
    if (index >= firstDayOfMonth) {
      return index - firstDayOfMonth + 1
    }
    return null
  })

  return (
    <div className="flex flex-col items-center justify-center p-4 w-fit h-fit">
      <div className="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t">
        <div className="px-4 flex items-center justify-between">
          <span className="text-base font-bold dark:text-gray-100 text-gray-800">January 2024</span>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H6a1 1 0 110-2h4V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H6a1 1 0 110-2h4V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto py-8">
          <table className="w-full">
            <thead>
            <tr>
              { daysOfWeek.map(day => (
                <th key={ day }>
                  <div className="w-full flex justify-center">
                    <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">{ day }</p>
                  </div>
                </th>
              )) }
            </tr>
            </thead>
            <tbody>
            { Array.from({ length: Math.ceil(calendarDays.length / 7) }).map((_, weekIndex) => (
              <tr key={ weekIndex }>
                { Array.from({ length: 7 }).map((_, dayIndex) => {
                  const day = calendarDays[weekIndex * 7 + dayIndex]
                  return (
                    <td key={ dayIndex } className="pt-6">
                      <div className="px-2 py-2 flex w-full justify-center">
                        { day && (
                          <p className="text-base text-gray-500 dark:text-gray-100 font-medium">{ day }</p>
                        ) }
                      </div>
                    </td>
                  )
                }) }
              </tr>
            )) }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
