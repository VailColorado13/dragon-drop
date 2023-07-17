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
    console.log(file)
    setFile(file)
    createListOfNames(file)
    createListOfText(file)
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

  const createListOfText = async (files) => {
    let textArray = []
    await worker.load();
    await worker.loadLanguage('eng')
    await worker.initialize('eng')

    for (let i = 0; i < files.length; i++) {
      const {data} = await worker.recognize(files[i])
      console.log(data.text)
    }
  }

 
const testServer = () => {
  fetch('http://localhost:3000/api/some-endpoint', {
    method: 'POST',
    body: JSON.stringify({ key: 'value' }), // Replace with your desired request payload
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Handle the response data
    })
    .catch(error => {
      console.error(error); // Handle any errors
    });
}


  return (
    <>
    <button onClick = {testServer}>Test Server</button>
    <FileUploader handleChange={handleChange} 
                  name="file"  
                  multiple={true}
    />
    {dropped && <TableMaker nameArray={nameArray} />}
    </>
  )

}

export default App
