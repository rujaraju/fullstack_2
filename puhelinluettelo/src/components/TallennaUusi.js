import React from 'react'

const TallennaUusi = ({onSubmit, nameValue, nameOnChange, numberValue, numberOnChange }) => {
  return (
    <form onSubmit={onSubmit}>
        <div>
          nimi: <input value={nameValue}
          onChange={nameOnChange}/>
        </div>
        <div>
          numero: <input value={numberValue} 
          onChange={numberOnChange}/>
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>)
}

export default TallennaUusi;