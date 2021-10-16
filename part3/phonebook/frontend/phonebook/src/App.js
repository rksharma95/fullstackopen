import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ searchKey, setSearchKey] = useState('')
  const [ searchResult, setSearchResult] = useState(persons)
  const [ message, setMessage] = useState(null)
  const [ messageType, setMessageType] = useState('')


  const handleNameChange = (e) => setNewName(e.target.value)

  const handleNumberChange = (e) => setNewNumber(e.target.value)

  const handleSearchKeyChange = (e) => {
    let newKey
    newKey = e.target.value
    setSearchKey(newKey)    
  }

  // eslint-disable-next-line
  useEffect(()=>{handleSearch()},[searchKey, persons])

  const handleSearch = () => {
    setSearchResult(
      persons.filter(
        person => person.name.toLowerCase().includes(searchKey.toLowerCase())
      )
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = newName
    if (persons.find(person => person.name === newPerson) === undefined){
      personService
        .create({name:newName, number: newNumber})
        .then(response => setPersons(persons.concat(response.data)))
        .then(()=> {
          setMessageType('success')
          setMessage(`Added ${newName}`)
          setTimeout(()=> setMessage(null), 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setMessage('an error occured while adding')
          setMessageType('error')
          setTimeout(()=> setMessage(null), 5000)
        })
   
    }
    else{
      const {id} = persons.find(person => person.name === newPerson)
      const replace =  window.confirm(`${newPerson} is already added to phonebook, replace the old number with new one?`)
      if(replace){
        personService
          .update(id,{name:newName, number:newNumber})
          .then(()=> {
            personService
              .getAll()
              .then(response => setPersons(response.data))
              .then(() => {
                setMessageType('success')
                setMessage(`Added ${newName}`)
                setTimeout(()=> setMessage(null), 5000)
                setNewName('')
                setNewNumber('')
              })
          })
          .catch(error => {
            setMessage('an error occured while adding')
            setMessageType('error')
            setTimeout(()=> setMessage(null), 5000)
          })          
      }
    }
  }

  const formProps = {
    newName: newName,
    handleNameChange: handleNameChange,
    newNumber: newNumber,
    handleNumberChange: handleNumberChange,
    handleSubmit: handleSubmit
  }

  const personProps = {
    persons: persons, 
    searchKey: searchKey,
    searchResult: searchResult
  }

  useEffect(()=> {
    personService
      .getAll()
      .then(response => setPersons(response.data))
  },[])

  const handleDelete = (id) => {
    personService
      .del(id)
      .then(() => {
        personService
        .getAll()
        .then(person => setPersons(person.data))
        } 
      )
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={message} className={messageType} />
        <Filter keyword={searchKey} handleKey={handleSearchKeyChange} />
        
        <h3>Add a new...</h3>
        <PersonForm props={formProps} />
      
        <h2>Numbers</h2>
        <Person props={personProps} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
