'use client'
import React, { useState, useEffect } from 'react'
import Loading from '../loading'

export default function ObjectiveTypesPage () {

  const [isLoading, setIsLoading] = useState(true) // Added loading state
  const [activeTab, setActiveTab] = useState('Tab 1')

  const [objectives, setObjectives] = useState([])
  const [objectiveTypes, setObjectiveTypes] = useState([])
  const [user_id, setUserId] = useState(1)
  const [descriptions, setDescriptions] = useState({}) // Object to hold descriptions for each objective type
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [file, setFile] = useState(null)

  const [showDropzone, setShowDropzone] = useState(false)

  const [submittedObjectiveTypes, setSubmittedObjectiveTypes] = useState({})

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
    // Check if this objectiveTypeId has already been submitted
    if (submittedObjectiveTypes[objectiveTypeId]) {
      console.warn(`Response for objective type ID ${ objectiveTypeId } has already been submitted.`)
      return // Exit the function to prevent further processing
    }

    // Update the descriptions state with the new value for this objectiveTypeId
    setDescriptions(prevDescriptions => (
      {
        ...prevDescriptions,
        [objectiveTypeId]: value,
      }
    ))
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const uniqueObjectiveTypes = objectiveTypes.reduce((acc, current) => {
    const x = acc.find(item => item.objective_type_id === current.objective_type_id)
    if (!x) {
      return acc.concat([current])
    } else {
      return acc
    }
  }, [])

  const handleSubmit = async (objectiveTypeId, user_id) => {
    if (isSubmitting[objectiveTypeId]) return
    setIsSubmitting(prev => (
      { ...prev, [objectiveTypeId]: true }
    ))

    const description = descriptions[objectiveTypeId]
    const submitData = {
      objective_type_id: objectiveTypeId,
      user_id: user_id,
      description: description,
    }
    const body = JSON.stringify(submitData)

    try {
      console.log('Submitting objective:', submitData)
      const response = await fetch('/api/objectives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Error: ${ errorData.message || response.status }`)
      }

      setSubmittedObjectiveTypes(prev => (
        { ...prev, [objectiveTypeId]: true }
      ))
      console.log('Objective successfully submitted!')

      // Fetch AI response
      const ai_response = await fetch('https://ai_tutor-1-h8642591.deta.app/query/2222Z', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      })

      if (!ai_response.ok) {
        throw new Error('Failed to fetch AI response')
      }

      const ai_data = await ai_response.json()
      console.log('AI response:', ai_data)

      const updateData = {
        objective_type_id: objectiveTypeId,
        user_id: user_id,
        ai_comment: ai_data.reply, // Assuming the AI response contains a 'reply' key
      }
      const updateResponse = await fetch('/api/ai-tutor', { // Use the correct endpoint for updating the ai_comment
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })

      if (!updateResponse.ok) {
        throw new Error('Failed to update objective with AI comment')
      }

      console.log('AI comment updated successfully')
      // Handle UI update for successful AI comment update
    } catch (error) {
      console.error('Submission error:', error.message)
      setIsSubmitting(prev => (
        { ...prev, [objectiveTypeId]: false }
      )) // Reset submitting state on error
      // Handle UI update for error scenario
    }
  }

  const handleFileSubmit = async () => {
    if (!file) {
      alert('Please select a file first.')
      return
    }

    const reader = new FileReader()
    reader.onload = async (event) => {
      const binaryStr = event.target.result

      // Convert ArrayBuffer to binary string
      let binary = ''
      const bytes = new Uint8Array(binaryStr)
      for (let i = 0; i < bytes.length; i++) { // Use bytes.length instead of len
        binary += String.fromCharCode(bytes[i])
      }

      // Send this binary string to your server
      try {
        const response = await fetch('/api/file-upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id, file: btoa(binary) }), // Convert binary string to base64
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        console.log('Upload successful', data)
        alert('Upload successful')
        // Close the modal
        document.getElementById('my_modal_7').checked = false
      } catch (error) {
        console.error('Upload failed:', error)
        alert('Upload failed')
      }
    }

    reader.readAsArrayBuffer(file)
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
                      {/*  show date if not null*/ }
                      <p className="menu-title float-end flex flex-1 text-s font-normal"
                         style={ { fontFamily: 'Raleway, sans-serif' } }>
                        { objectiveType.description_date &&
                          new Date(objectiveType.description_date).toLocaleString('en-gb', {
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                          })
                        }
                      </p>
                    </div>
                    <h3 className="card-body p-0">Student Comments</h3>
                    <textarea
                      className="textarea textarea-bordered rounded-md bg-white w-full"
                      placeholder="Enter your response"
                      rows="4"
                      value={ objectiveType.description }
                      onChange={ (e) => handleDescriptionChange(objectiveType.objective_type_id, e.target.value) }
                      disabled={ submittedObjectiveTypes[objectiveType.objective_type_id] }
                    ></textarea>
                    <div className="flex float-right">
                      <button
                        onClick={ () => handleSubmit(objectiveType.objective_type_id, user_id) }
                        disabled={ submittedObjectiveTypes[objectiveType.objective_type_id] || isSubmitting[objectiveType.objective_type_id] }
                        className="btn btn-primary outline outline-black mt-4 w-fit flex float-right"
                      >
                        Submit
                      </button>
                      <input type="checkbox" id="my_modal_7" className="modal-toggle"/>
                      <div className="modal" role="dialog">
                        <div className="modal-box">
                          <h3 className="text-lg font-bold">Upload File</h3>
                          <input type="file" onChange={ handleFileChange } className="py-4"/>
                          <div className="modal-action">
                            <button onClick={ handleFileSubmit } className="btn">Upload grades</button>
                            <label htmlFor="my_modal_7" className="btn">Close</label>
                          </div>
                        </div>
                        <label className="modal-backdrop" htmlFor="my_modal_7"></label>
                      </div>
                      <label htmlFor="my_modal_7"
                             className="btn btn-primary outline outline-black mt-4 w-fit flex float-right ml-6">Upload Files</label>
                    </div>
                  </div>
                  <div className="card shadow-xl ml-32 p-10 m-8 mt-0 bg-primary">
                    <div>
                      <h1 className="card-title float-start flex flex-1 pb-4">Tutor feedback</h1>
                    </div>
                    <textarea
                      className="textarea textarea-bordered rounded-md bg-white w-full"
                      placeholder="You have no feedback yet"
                      value={ objectiveType.ai_comment }
                      readOnly
                    ></textarea>
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
                <div className="card shadow-xl ml-32 p-10 m-8 mt-0 bg-primary">
                  <div>
                    <h1 className="card-title float-start flex flex-1 pb-4">Tutor feedback</h1>
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
                <div className="card shadow-xl ml-32 p-10 m-8 mt-0 bg-primary ">
                  <div>
                    <h1 className="card-title float-start flex flex-1 pb-4">Tutor feedback</h1>
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
