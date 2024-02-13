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
    const body = JSON.stringify(submitData);
    try {
      console.log('Submitting objective:', submitData)
      const response = await fetch('http://localhost:3000/api/objectives', { // Replace '/your-endpoint-here' with your actual endpoint
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
          Accept: 'application/json',
        }),
        body,
      })

      const data = await response.json()

      if (response.ok) {
        // Handle success
        console.log('Objective created:', data)
        console.log('Objective successfully submitted!')
        // Optionally clear the textarea or update UI here
      } else {
        // Handle server errors or invalid inputs
        console.error('Submission failed:', data.message)
        console.log(`Error: ${ data.message }`)
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error)
      console.log('Network error, please try again later.')
    }
  }

  // Call this function when you want to test the POST request
  return (
    <main className="bg-base-100">
      {/*TAB 1*/ }
      <div role="tablist" className="tabs tabs-lifted p-16 bg-base-100">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab w-fit"
          aria-label="How would you accomplish this?"
          checked={ activeTab === 'Tab 1' }
          onChange={ () => setActiveTab('Tab 1') }
        />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-8">
          <div>
            { objectiveTypes.map((objectiveType) => (
              <div key={ objectiveType.objective_type_id } className="card w-full bg-info shadow-xl mb-16 mt-4">
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
                    className="btn btn-accent mt-4 w-fit flex float-right"
                    onClick={ () => handleSubmit(objectiveType.objective_type_id) }
                  >
                    Submit
                  </button>
                </div>
              </div>
            )) }
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
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-4">
          <div>
            { objectiveTypes.map((objectiveType) => (
              <div key={ objectiveType.objective_type_id } className="card w-full bg-info shadow-xl mb-16 mt-4">
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
                    className="btn btn-accent mt-4 w-fit flex float-right"
                  >
                    Submit
                  </button>
                </div>
                <div className="card bg-base-100 shadow-xl ml-32 p-10 m-8 mt-0">
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
                    className="textarea textarea-bordered rounded-md"
                    placeholder="You have no feedback yet"
                    value={ objectiveType.mid_tutor_comment || 'You have no feedback yet' }
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
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="End Year Outcome"
          checked={ activeTab === 'Tab 3' }
          onChange={ () => setActiveTab('Tab 3') }
        />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-4">
          <div>
            { objectives.map((objective) => (
              <div key={ objective.objective_id } className="card w-full bg-info shadow-xl mb-16 mt-4">
                <div className="card-body">
                  <div>
                    <h1 className="card-title float-start flex flex-1">{ objective.type }</h1>
                    { objective.description_date && (
                      <p className="menu-title float-end flex flex-1">
                        { new Date(objective.created_at).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          second: 'numeric',
                          timeZoneName: 'short',
                        }) }
                      </p>
                    ) }
                  </div>
                  <h3 className="card-body p-0">Student Comments</h3>
                  <textarea
                    className="textarea textarea-bordered rounded-md bg-white w-full"
                    placeholder="Enter your response"
                    rows="4"
                    value={ descriptions[objective.objective_type_id] || '' }
                    onChange={ (e) => handleDescriptionChange(objective.objective_type_id, e.target.value) }
                  ></textarea>
                  <button
                    onClick={ () => handleSubmit(objective.objective_type_id, user_id) } // Replace `user_id` with actual user ID from your session/context
                    className="btn btn-accent mt-4 w-fit flex float-right"
                  >
                    Submit
                  </button>
                </div>
                <div className="card bg-base-100 shadow-xl ml-32 p-10 m-8 mt-0">
                  <div>
                    <h1 className="card-title float-start flex flex-1 pb-4">Tutor feedback</h1>
                    { objective.end_comment_date && (
                      <p className="menu-title float-end flex flex-1">
                        { new Date(objective.end_comment_date).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          second: 'numeric',
                          timeZoneName: 'short',
                        }) }
                      </p>
                    ) }

                  </div>
                  <textarea
                    className="textarea textarea-bordered rounded-md"
                    placeholder="You have no feedback yet"
                    value={ objective.end_tutor_comment || 'You have no feedback yet' }
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
