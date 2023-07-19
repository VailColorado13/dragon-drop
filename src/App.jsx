import { useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import { createWorker } from 'tesseract.js';

const worker = createWorker()
import TableMaker from './TableMaker.jsx'
import './App.css'


function App() {
  const [droppedFiles, setDroppedFiles] = useState(null)
  const [nameArray, setNameArray] = useState([])
  const [dropped, setDropped] = useState(false)

  const handleChange = (file) => {
    setDroppedFiles(file)
    createListOfNames(file)
    sendToBackend(file)
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
    })
  }

  return (
    <>
    <FileUploader handleChange={handleChange} 
                  name="file"  
                  multiple={true}
                  types={['png', 'jpeg', 'jpg']}
                  label="drag and drop or click here to upload"
                  onTypeError= {(err) => alert('incorrect file type')}
    />
    {dropped && <TableMaker nameArray={nameArray} />}
    </>
  )
}

export default App
