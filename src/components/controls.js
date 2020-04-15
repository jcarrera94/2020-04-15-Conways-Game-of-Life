import React, { useState } from 'react'

function Controls({ setGrid }) {

  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  return (
    <div style={styledControls}>
      <label>
        Rows:
        <input onChange={({target: {value}}) => setRows(value)} type="number" name="rows" />
      </label>
      <label>
        Columns:
        <input onChange={({target: {value}}) => setCols(value)} type="number" name="cols" />
      </label>
      <button onClick={() => setGrid(rows, cols)}>Set Grid</button>
    </div>
  )
}

export const styledControls = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  width: '45%',
}

export default Controls
