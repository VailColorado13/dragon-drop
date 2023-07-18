import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { FileUploader } from "react-drag-drop-files";
import { createWorker } from 'tesseract.js';

const worker = createWorker()
import TableMaker from './TableMaker.jsx'
import './App.css'


function App() {
  const [file, setFile] = useState(null)
  const [nameArray, setNameArray] = useState([])
  const [dropped, setDropped] = useState(false)

  const handleChange = (file) => {
    setFile(file)
    createListOfNames(file)
    // createListOfText(file)
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



  return (
    <>
    <FileUploader handleChange={handleChange} 
                  name="file"  
                  multiple={true}
                  label="drag and drop or click here to upload"
    />
    {dropped && <TableMaker nameArray={nameArray} />}
    </>
  )

}

export default App
