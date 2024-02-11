// src/app/tutors/objective-types/page.js
'use client'
import React, { useState, useEffect } from 'react'

export default function ObjectiveTypesPage () {
  const [objectiveTypes, setObjectiveTypes] = useState([])

  useEffect(() => {
    async function fetchData () {
      // Correct the API endpoint URL
      const res = await fetch('/api/objective-types')
      const data = await res.json()
      console.log(data) // Debug: Print the fetched data
      setObjectiveTypes(data)
    }

    fetchData().catch(e => console.error('Failed to fetch objective types:', e))
  }, [])

  const [activeTab, setActiveTab] = useState('Tab 1')

  return (
    <main>
      <div role="tablist" className="tabs tabs-lifted m-4">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="How would you accomplish this?"
          checked={ activeTab === 'Tab 1' }
          onChange={ () => setActiveTab('Tab 1') }
        />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-4">
          Tab content 1
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab w-fit"
          aria-label="Mid Year Review"
          checked={ activeTab === 'Tab 2' }
          onChange={ () => setActiveTab('Tab 2') }
        />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-4">
          Tab content 2
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="End Year Outcome"
          checked={ activeTab === 'Tab 3' }
          onChange={ () => setActiveTab('Tab 3') }
        />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-4">
          Tab content 3
        </div>
      </div>
    </main>
  )
}
