import React from 'react'
     

const Title = (props) => {
  return (
      <h1>
        {props.course} 
      </h1>
  )
}

const Content = (props) => {
  return props.parts.map(elem => <Part key = {elem.name} part= {elem.name} exercises= {elem.exercises}  />);
}

const Part = (props) => {
  return (
      <p>
        {props.part} {props.exercises} 
      </p>
  )
}

const Sumtotal = ({parts}) => {
var total = parts.map(elem => elem.exercises).reduce((total, curr) => total+curr)

  return (
      <p>
        yhteensä {total} tehtävää
      </p>
  )
}

const Course = ({name, parts}) => {
  return (
      <div>
      <Title course={name} />
      <Content parts={parts} />
       <Sumtotal parts={parts} />
       </div>
       )
} 
 
 export default Course;     