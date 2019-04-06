import React, { useState, useEffect } from 'react'
import HenkiloLista from './components/HenkiloLista'
import Suodatin from './components/Suodatin'
import TallennaUusi from './components/TallennaUusi'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterBy, setFilterBy ] = useState('')
  const [ viesti, setViesti ] = useState('')
  
  useEffect(() => {
  personService
    .findAll()
      .then(response => {
        setPersons(response)
      })
}, [])
  
  const personsToShow = filterBy === ""
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(filterBy.toUpperCase()))
  
    const Ilmoitus = ({ tieto }) => {
      const ilmoitusStyle = {
        backgroundColor: 'green',
        color: 'white',
        fontStyle: 'bold',
        fontSize: 15,
        borderRadius: 5,
        padding: 15,
        marginBottom: 10
      }

      if (tieto === '') {
        return null
      }
    
      return (
        <div style={ilmoitusStyle}>
          {tieto}
        </div>
      )
    }

  const handleNewName = (event) => {  
    setNewName(event.target.value)
  }
  
    const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilter = (event) => {
    
    setFilterBy(event.target.value)
  }

  const deletePerson = (event) => {
    var id = event.target.id
    if (window.confirm(`Haluatko varmasti poistaa henkilön?`)){
    personService
    .erase(id)
    .then(response => {
      setPersons(persons.filter(person => person.id !== parseInt(id) ))
      setViesti("Henkilö on poistettu tietokannasta");
      setTimeout(function(){setViesti('')}, 2000);
    })
  }
  }
  
  const savePerson = (event)=> {
    event.preventDefault();
    const person = {name: newName, number: newNumber}
    var already = persons.find(function(element) {
      //console.log(element, person);
      return element.name === person.name;
    });
    if (already === undefined){
      personService
      .createnew(person)
      .then(response => {
        setPersons(persons.concat(response))
        setViesti(`Lisättiin ${person.name}`)
        setTimeout(function(){setViesti('')}, 2000);
        setNewName("");
        setNewNumber("");
      })

    } else {
      if(window.confirm(`${newName} löytyy jo luettelosta, haluatko vaihtaa hänen numeronsa?`)){
        personService
        .update(already.id, person)
        .then(setPersons(persons.map(elem => elem.id === already.id ? person : elem)),
        setViesti(`Päivitettiin ${person.name}`),
        setTimeout(function(){setViesti('')}, 2000),
        setNewName(""),
        setNewNumber(""))
      }
    }
  }


  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Ilmoitus tieto={viesti} />
      <Suodatin value = {filterBy} onChange={handleFilter}/>
      
      <h3>Tallenna uusi kontakti</h3>
      <TallennaUusi onSubmit={savePerson} nameValue={newName} nameOnChange={handleNewName} numberValue={newNumber} numberOnChange={handleNewNumber} />
      
      <h2>Numerot</h2>
      <HenkiloLista persons={personsToShow} onClick={deletePerson}/>
    </div>
  )

}

export default App
