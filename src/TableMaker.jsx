import React from 'react'

const TableMaker = ({dataArray}) => {

    const copyToClipboard = () => {
      const table = document.querySelector('table');
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
        <>
        <button onClick = {copyToClipboard}>Copy Table</button>
        <table>
          <tbody>
            {dataArray.map((name, index) => (
              <tr key={index}>
                <td>{name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
  )
}

export default TableMaker