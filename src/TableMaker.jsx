import React from 'react'

const TableMaker = ({dataArray,  tableClass}) => {

    const copyToClipboard = () => {
      const table = document.getElementsByClassName(`${tableClass}`)[0]
      const tableData = Array.from(table.rows).map(row =>
        Array.from(row.cells).map(cell => cell.innerText)
      );
  
      const tableString = tableData.map(row => row.join('\t')).join('\n')
  
      navigator.clipboard.writeText(tableString)
        .then(() => {
          console.log('Table copied to clipboard');
        })
        .catch((error) => {
          console.error('Failed to copy table:', error);
        })
    }

  return (
        <div className = {'container'}>
        <button onClick = {copyToClipboard}>{`Copy ${tableClass === 'fileNames' ? 'File Names' : 'Model Names'}`}</button>
        <table className = {tableClass}>
          <tbody>
            {dataArray.map((name, index) => (
              <tr key={index}>
                <td>{name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
  )
}

export default TableMaker