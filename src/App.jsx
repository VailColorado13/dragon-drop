import React, { useState, useEffect } from 'react';
import { FileUploader } from "react-drag-drop-files";
import { createWorker } from 'tesseract.js';
import findModels from './findModels.js'
import BarLoader from "react-spinners/BarLoader";


const worker = createWorker()
import TableMaker from './TableMaker.jsx'
import './App.css'


function App() {
  const [droppedFiles, setDroppedFiles] = useState(null)
  const [extractedText, setExtractedText] = useState([])
  const [nameArray, setNameArray] = useState([])
  const [dropped, setDropped] = useState(false)
  const [serverResponded, setServerResponded] = useState(false)

  const handleChange = (file) => {
    setDroppedFiles(file)
    createListOfNames(file)
    sendToBackend(file)
  }

  const startOver = () => {
    setDropped(false)
    setServerResponded(false)
    fetch('http://localhost:5001/start-over').then((res) => console.log(res))
  }

  const createListOfNames = (files) => {
        let fileNameArr = Array.from(files)
          .map(file => {
              let fileName = file.name
              let lastDot = fileName.lastIndexOf('.')
              return fileName.substring(0, lastDot)
          })
        setNameArray(fileNameArr)
        setDropped(true)
  }

  const sendToBackend = (files) => {
          const formData = new FormData()
          let fileArr = Array.from(files)

          for (let i = 0; i < fileArr.length; i++) {
            formData.append('avatar', fileArr[i]);
          }

          fetch('http://localhost:5001/upload', {
          method: 'POST', 
          body: formData
      }).then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json()
        }).then((response) => {
          setServerResponded(true)
          setExtractedText(response)
        }).catch((error) => {
        alert('sorry, something went wrong') 
        })
  }

  return (
    <>
    <h1>Traffic Assistant</h1>
    {dropped && <button onClick = {startOver}>Start Over</button>}

    <FileUploader handleChange={handleChange} 
                  name="file"  
                  multiple={true}
                  types={['png', 'jpeg', 'jpg']}
                  label="drag and drop or click here to upload"
                  onTypeError= {(err) => alert('incorrect file type')}
    />

    {dropped && <TableMaker 
      dataArray={nameArray}
      tableClass = {'fileNames'} />}

    {dropped && !serverResponded && 
    <div className='container'>
      <BarLoader color={'white'}/>
      <h3>Loading Vehicle Names</h3>
    </div>
    }

    {serverResponded && <TableMaker 
      dataArray={findModels(extractedText)}
      tableClass = {'modelNames'}/>}

    </>
  )
}

export default App
