// src/app/tutors/objective-types/page.js
'use client'
import React, { useState, useEffect } from 'react'

export default function ObjectiveTypesPage () {
  const [objectiveTypes, setObjectiveTypes] = useState([])

  useEffect(() => {
    async function fetchData () {
      // Correct the API endpoint URL
      const res = await fetch('../api/objective-types')
      const data = await res.json()
      setObjectiveTypes(data)
    }

    fetchData().catch(e => console.error('Failed to fetch objective types:', e))
  }, [])

  return (
    <div>
      <h1>Objective Types</h1>
      <ul>
        {objectiveTypes.map(type => (
          <li key={type.id}>{type.name}</li>
        ))}
      </ul>
    </div>
  )
}
