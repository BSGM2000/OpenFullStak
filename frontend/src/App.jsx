import React ,{ useState, useEffect } from 'react'
import server from './server'
import Filter from './Filter'
import FormPersons from './FormPersons'
import ListNumbers from './ListNumbers'
import Notificacion from './Notificacion'
import '../styles/App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState(null);
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };
  const [newName, setNewName] = useState('')
  const handleNameChange = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }
  const [newNumber, setNewNumber] = useState('')
  const handleNumberChange = (e) =>{
    console.log(e.target.value)
    setNewNumber(e.target.value)
  }
  const [filter, setFilter] = useState('')
  const personsToShow = filter
  ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())|| person.number.includes(filter))
  : persons;
  useEffect(() => {
    server
      .getAll()
      .then(data => { // Cambia 'response' a 'data'
        setPersons(data);
        showNotification('Lista de contactos cargada', 'success');
      })
      .catch(error => {
        showNotification('Error fetching data', 'error')
        setTimeout(() => {
          showNotification(null)
        }
        , 5000)
        console.error('Error fetching data:', error);
      });
  }, []);
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      showNotification(`${newName} ya existe en la lista`, 'error')
        setTimeout(() => {
          showNotification(null)
        }, 5000)
      setNewName('')
      setNewNumber('')
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      server
      .create(personObject)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
        showNotification(`Se ha creado el contacto ${newName}`, 'success')
        setTimeout(() => {
          showNotification(null)
        }, 5000)
      })
      .catch(error => {
        showNotification('Error al crear el contacto', 'error')
        setTimeout(() => {
          showNotification(null)
        }, 5000)
        console.error('Error creating person:', error)
      })
    }
  }
  const handleDelete = (id) => {
    if (window.confirm('Estas seguro de eleminar el contacto?')) {
      server
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showNotification('Contacto eliminado', 'error')
        setTimeout(() => {
          showNotification(null)
        }, 5000)
        })
        .catch(error => {
          showNotification('Error borrar el contacto', 'error')
        setTimeout(() => {
          showNotification(null)
        }, 5000)
          console.error('Error deleting person:', error)
        })
    }
  }
  const handleUpdate = (id, updatePerson) =>{
    server
      .update(id, updatePerson)
      .then(data => {
        setPersons(persons.map(person => (person.id !== id ? person : data)))
      })
      .catch(error => {
        console.error('Error updating person:', error)
      })
  }
  
  return (
    <>
      <h2>Phonebook</h2>
      <Notificacion message={notification} />
      <Filter 
        filter={filter} 
        handleFilterChange={handleFilterChange} />
      <FormPersons 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
        addPerson={addPerson} 
        handleUpdate={handleUpdate} />
      <ListNumbers 
      personsToShow={personsToShow} 
      handleDelete={handleDelete} /> 
      
    </>
  )
}

export default App
