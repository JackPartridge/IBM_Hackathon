// src/app/tutors/objective-types/page.js
'use client'
import React, { useState, useEffect } from 'react'
import Loading from '../loading'

export default function ObjectiveTypesPage () {
  const [isLoading, setIsLoading] = useState(true) // Added loading state
  const [activeTab, setActiveTab] = useState('Tab 2')

  const [objectives, setObjectives] = useState([])
  const [objectiveTypes, setObjectiveTypes] = useState([])
  const [user_id, setUserId] = useState(1) // Assuming user_id is known, static, or fetched
  const [descriptions, setDescriptions] = useState({}) // Object to hold descriptions for each objective type
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function fetchObjectiveTypes () {
      setIsLoading(true)
      try {
        const res = await fetch('/api/objective-types') // Adjust the endpoint if needed
        const data = await res.json()

        // fetch objectives
        const objectivesRes = await fetch('/api/objectives') // Adjust the endpoint if needed
        const objectivesData = await objectivesRes.json()

        setObjectives(objectivesData)
        setObjectiveTypes(data) // Use setObjectiveTypes here
      } catch (e) {
        console.error('Failed to fetch objective types:', e)
      } finally {
        setIsLoading(false)
      }
    }

    fetchObjectiveTypes().then(r => r)
  }, [])

  if (isLoading) {
    return <Loading/>
  }

  const handleDescriptionChange = (objectiveTypeId, value) => {
    setDescriptions({
      ...descriptions,
      [objectiveTypeId]: value,
    })
  }

  const uniqueObjectiveTypes = objectiveTypes.reduce((acc, current) => {
    const x = acc.find(item => item.objective_type_id === current.objective_type_id)
    if (!x) {
      return acc.concat([current])
    } else {
      return acc
    }
  }, [])

  // const testPostRequest = async (objectiveTypeId, userId, description) => {
  //   console.log('Initiating testPostRequest function with:', { objectiveTypeId, userId, description })
  //
  //   try {
  //     const response = await fetch('/api/objectives', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ objective_type_id: objectiveTypeId, user_id: userId, description })
  //     })
  //
  //     console.log('Response received:', response)
  //
  //     // Check for HTTP response status
  //     if (!response.ok) {
  //       const errorText = await response.text()
  //       console.error(`POST request failed with status ${ response.status }:`, errorText)
  //       return null // Return null or appropriate value to indicate failure
  //     }
  //
  //     const result = await response.json()
  //     console.log('POST request successful, result:', result)
  //     return result // Return the result for further processing if needed
  //   } catch (error) {
  //     // Catch and log any error that occurs during the fetch call or handling response
  //     console.error('Error in testPostRequest function:', error)
  //     return null // Return null or appropriate value to indicate error
  //   }
  // }

  // const testPostRequest = async (objectiveTypeId, userId, description) => {
  //   fetch('/api/objectives', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       objective_type_id: 1,
  //       user_id: 1,
  //       description: 'Learn Next.js API routes'
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error('Error:', error))
  //
  // }

  // const handleSubmit = async (objectiveTypeId) => {
  //   // // Prepare the data to send
  //   const description = descriptions[objectiveTypeId]
  //   const dataToSend = { objective_type_id: objectiveTypeId, user_id, description };
  //
  //   try {
  //     const response = await fetch('/api/objectives', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: dataToSend,
  //     });
  //
  //     console.log(JSON.stringify(dataToSend))
  //
  //     if (!response.ok) {
  //       console.log(response)
  //       throw new Error('Network response was not ok');
  //     }
  //
  //     // Handle success
  //     console.log('Objective submitted successfully');
  //     // Optionally reset the form or give user feedback
  //   } catch (error) {
  //     console.error('Failed to submit objective:', error);
  //     // Handle errors, such as by displaying a message to the user
  //   }
  // };

  // const testPostRequest = async (objectiveTypeId, userId, description) => {
  //   const response = await fetch('/api/objectives', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   })
  //
  //   if (!response.ok) {
  //     const errorText = await response.text()
  //     console.error('POST request failed:', errorText)
  //     return
  //   }
  //
  //   const result = await response.json()
  //   console.log('POST request successful:', result)
  // }

  // Import necessary hooks or utilities if you're using React
  // For example, import { useState } from 'react';

  // Assuming `handleSubmit` is within a component or a relevant context

  const handleSubmit = async (objectiveTypeId, user_id, description) => {
    const submitData = {
      objective_type_id: objectiveTypeId,
      user_id: user_id,
      description: description,
    }
    const body = JSON.stringify(submitData)

    try {
      console.log('Submitting objective:', submitData)
      const response = await fetch('http://localhost:3000/api/objectives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })

      if (!response.ok) {
        // If the response is not ok, we throw an error to catch it in the catch block
        const errorData = await response.json() // Assuming the server responds with JSON
        throw new Error(`Error: ${ errorData.message || response.status }`)
      }

      const data = await response.json() // Parse JSON data from the response
      console.log('Objective created:', data)
      console.log('Objective successfully submitted!')
      // Optionally clear the textarea or update UI here
    } catch (error) {
      // Handle both network errors and errors thrown from not-ok responses
      console.error('Submission error:', error.message)
      console.log('Please try again later.')
    }
  }

  // Call this function when you want to test the POST request
  return (
    <main className="bg-base-100">
      {/*TAB 1*/ }
      <div role="tablist" className="tabs tabs-lifted p-16 bg-primary">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className={ `tab w-fit ${ activeTab === 'Tab 1' ? 'bg-error' : '' }` }
          aria-label="What are your aims for the year?"
          checked={ activeTab === 'Tab 1' }
          onChange={ () => setActiveTab('Tab 1') }
        />
        <div role="tabpanel" className="tab-content border-base-300 rounded-box p-8 bg-white">
          <div>
            {
              uniqueObjectiveTypes.map((objectiveType) => (
                <div key={ objectiveType.objective_type_id } className="card w-full bg-error shadow-xl mb-16 mt-4">
                  <div className="card-body">
                    <div>
                      <h1 className="card-title float-start flex flex-1">{ objectiveType.type }</h1>
                      <p className="menu-title float-end flex flex-1">
                        { new Date(objectiveType.created_at).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          second: 'numeric',
                          timeZoneName: 'short',
                        }) }
                      </p>
                    </div>
                    <h3 className="card-body p-0">Student Comments</h3>
                    <textarea
                      className="textarea textarea-bordered rounded-md bg-white w-full"
                      placeholder="Enter your response"
                      rows="4"
                      value={ descriptions[objectiveType.objective_type_id] || '' }
                      onChange={ (e) => handleDescriptionChange(objectiveType.objective_type_id, e.target.value) }
                    ></textarea>
                    <button
                      onClick={ () => handleSubmit(objectiveType.objective_type_id, user_id, descriptions[objectiveType.objective_type_id]) }
                      className="btn btn-primary outline outline-black mt-4 w-fit flex float-right"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {/*TAB 2*/ }
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab w-fit"
          aria-label="Mid Year Review"
          checked={ activeTab === 'Tab 2' }
          onChange={ () => setActiveTab('Tab 2') }
        />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-8">
          <div>
            { uniqueObjectiveTypes.map((objectiveType) => (
              <div key={ objectiveType.objective_type_id } className="card w-full bg-error shadow-xl mb-16 mt-4">
                <div className="card-body">
                  <div>
                    <h1 className="card-title float-start flex flex-1">{ objectiveType.type }</h1>
                    <p className="menu-title float-end flex flex-1">
                      { new Date(objectiveType.description_date).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        timeZoneName: 'short',
                      }) }
                    </p>
                  </div>
                  <h3 className="card-body p-0">Student Comments</h3>
                  <textarea
                    className="textarea textarea-bordered rounded-md bg-white w-full"
                    placeholder="Enter your response"
                    rows="4"
                    value={ descriptions[objectiveType.objective_type_id] || '' }
                    onChange={ (e) => handleDescriptionChange(objectiveType.objective_type_id, e.target.value) }
                  ></textarea>
                  <button
                    onClick={ () => handleSubmit(objectiveType.objective_type_id, user_id, descriptions[objectiveType.objective_type_id]) }
                    className="btn btn-primary outline outline-black mt-4 w-fit flex float-right"
                  >
                    Submit
                  </button>
                </div>
                <div className="card shadow-xl ml-32 p-10 m-8 mt-0 bg-primary outline outline-secondary outline-2">
                  <div>
                    <h1 className="card-title float-start flex flex-1">Tutor feedback</h1>
                    <p className="menu-title float-end flex flex-1">
                      { new Date(objectiveType.mid_comment_date).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        timeZoneName: 'short',
                      }) }
                    </p>
                  </div>
                  <textarea
                    className="textarea textarea-bordered rounded-md bg-white w-full"
                    placeholder="You have no feedback yet"
                    value={ objectiveType.mid_tutor_comment }
                    readOnly
                  ></textarea>
                </div>
              </div>
            )) }
          </div>
        </div>


        {/*TAB 3*/ }
        <input
          type="radio"
          name="my_tabs_3"
          role="tab"
          className="tab"
          aria-label="End Year Outcome"
          checked={ activeTab === 'Tab 3' }
          onChange={ () => setActiveTab('Tab 3') }
        />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-8">
          <div>
            { uniqueObjectiveTypes.map((objectiveType) => (
              <div key={ objectiveType.objective_type_id } className="card w-full bg-error shadow-xl mb-16 mt-4">
                <div className="card-body">
                  <div>
                    <h1 className="card-title float-start flex flex-1">{ objectiveType.type }</h1>
                    <p className="menu-title float-end flex flex-1">
                      { new Date(objectiveType.description_date).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        timeZoneName: 'short',
                      }) }
                    </p>
                  </div>
                  <h3 className="card-body p-0">Student Comments</h3>
                  <textarea
                    className="textarea textarea-bordered rounded-md bg-white w-full"
                    placeholder="Enter your response"
                    rows="4"
                    value={ descriptions[objectiveType.objective_type_id] || '' }
                    onChange={ (e) => handleDescriptionChange(objectiveType.objective_type_id, e.target.value) }
                  ></textarea>
                  <button
                    onClick={ () => handleSubmit(objectiveType.objective_type_id, user_id, descriptions[objectiveType.objective_type_id]) }
                    className="btn btn-primary outline outline-black mt-4 w-fit flex float-right"
                  >
                    Submit
                  </button>
                </div>
                <div className="card shadow-xl ml-32 p-10 m-8 mt-0 bg-primary outline outline-secondary outline-2">
                  <div>
                    <h1 className="card-title float-start flex flex-1">Tutor feedback</h1>
                    <p className="menu-title float-end flex flex-1">
                      { new Date(objectiveType.end_comment_date).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        timeZoneName: 'short',
                      }) }
                    </p>
                  </div>
                  <textarea
                    className="textarea textarea-bordered rounded-md bg-white w-full"
                    placeholder="You have no feedback yet"
                    value={ objectiveType.end_tutor_comment }
                    readOnly
                  ></textarea>
                </div>
              </div>
            )) }
          </div>
        </div>
      </div>
    </main>
  )
}
