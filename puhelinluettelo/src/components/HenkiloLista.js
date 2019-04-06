import React from 'react'


const HenkiloLista = ({persons, onClick}) => {
  return persons.map(person =><p key={person.name}>{person.name} {person.number}<button id={person.id} onClick={onClick}>poista</button></p>)
}

 export default HenkiloLista;