import React from 'react'

const Header = (props) => {
  return(
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )  
}

const Content = (props) => {
  const {parts} = props
  return(
    <div>
	{parts.map(part=> <p key={part.id}> {part.name} {part.exercises} </p>)}
    </div>
  )
}

const Total = (props) => {
  const {parts} = props
  const sum = parts.reduce((sum, part) => sum + part.exercises,0)
  return(
    <div>
      <p>
        <strong>total of {sum} exercises</strong>
      </p>
    </div>
  )
}

const Course = ({course}) => {
  return(
  <div>
    <Header course={course} />
	  <Content parts={course.parts} />
	  <Total parts={course.parts} />
  </div>
  )
}

export default Course;