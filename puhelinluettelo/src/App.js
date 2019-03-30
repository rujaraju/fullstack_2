import React, { useState } from 'react'
import HenkiloLista from './components/HenkiloLista'
import Suodatin from './components/Suodatin'
import TallennaUusi from './components/TallennaUusi'

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
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} löytyy jo luettelosta`)
    }
  }


  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Suodatin value = {filterBy} onChange={handleFilter}/>
      
      <h3>Tallenna uusi kontakti</h3>
      <TallennaUusi onSubmit={savePerson} nameValue={newName} nameOnChange={handleNewName} numberValue={newNumber} numberOnChange={handleNewNumber} />
      
      <h2>Numerot</h2>
      <HenkiloLista persons={personsToShow}/>
    </div>
  )

}

export default App