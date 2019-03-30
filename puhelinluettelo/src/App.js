import React, { useState } from 'react'


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '045-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterBy, setFilterBy ] = useState('')
  
  const personsToShow = filterBy === ""
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(filterBy.toUpperCase()))
  
  const showPersons = () => personsToShow.map(person =>
    <p key={person.name}>{person.name} {person.number}</p>
  )
  
  const handleNewName = (event) => {
    
    setNewName(event.target.value)
  }
  
    const handleNewNumber = (event) => {
    
    setNewNumber(event.target.value)
  }
  
  const handleFilter = (event) => {
    
    setFilterBy(event.target.value)
  }
  
  const savePerson = (event)=> {
    event.preventDefault();
    const person = {name: newName, number: newNumber}
    var already = persons.find(function(element) {
      return element.name === person.name;
    });
    if (already === undefined){
      setPersons(persons.concat(person));
    } else {
      alert(`${newName} löytyy jo luettelosta`)
    }
  }


  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <div>Rajaa näytettäviä: <input value={filterBy} onChange={handleFilter} />
      </div>
      <h3>Tallenna uusi kontakti</h3>
      <form onSubmit={savePerson}>
        <div>
          nimi: <input value={newName}
          onChange={handleNewName}/>
        </div>
        <div>
          numero: <input value={newNumber} 
          onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numerot</h2>
      {showPersons()}
    </div>
  )

}

export default App