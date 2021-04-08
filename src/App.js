import React, {useState, useEffect} from 'react';
import "./App.css"
import AddPerson from "./components/AddPerson";
import Filter from "./components/Filter";
import PersonInfoList from "./components/PersonInfoList";
import service from "./services/persons"
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [msg, setMsg] = useState(null)

    const handleSearch = (event) => {
        event.preventDefault();
        console.log(event.target.value)
        setSearchTerm(event.target.value)
    }

    useEffect(() => {
        service
            .getAll()
            .then(persons => {
                setPersons(persons)
                setSearchResult(persons)
            })
    }, [])

    useEffect(() => {
        const result = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchResult(result)

    }, [searchTerm, persons]);

    const addName = (event) => {
        event.preventDefault();

        const personObject= {
            name: newName,
            number: newNumber
        }
        // Check if person is already in list
        const exists = persons.some(person => person.name === personObject.name)
        // If true, give alert. Otherwise setPersons and clear field
        if (exists) {
            if (window.confirm(`${personObject.name} is already added to phonebook, replace old number with a new one?`)) {
                const person = persons.find(n => n.name === newName)
                service
                    .update(person.id, {...person, number: newNumber})
                    .then(updatePerson => {
                        setPersons(
                            persons.map(n => (n.name === newName ? updatePerson : n))
                        )
                        setSearchResult(
                            persons.map(n => (n.name === newName ? updatePerson : n))
                        )

                        setMsg(`${personObject.name} phone number updated`)
                    })
                    .catch((error) => {
                        setMsg("Update failed", error)
                    });
            }
        } else {
            service
                .createNew(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setSearchResult(searchResult.concat(returnedPerson))
                    setMsg(`User ${newName} successfully added to database`)
                    setNewName("")
                    setNewNumber("")
                })
                .catch(error => {
                    setMsg(`${error.response.data.error}`)
                })

        }
        setNewName('')
        setNewNumber('')
        setTimeout(() => {
            setMsg(null)
        }, 4000)
    }

    const handleNameChange = (event) => {
        //console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const remove = (name, id) => {
        return () => {
            if (window.confirm(`Sure you want to delete ${name}?`)) {
                service
                    .remove(id)
                    .then(() => {
                        setPersons(persons.filter(n => n.id !== id))
                        setSearchResult(persons.filter(n => n.id !== id))
                        setNewName("")
                        setNewNumber("")
                        setMsg(`User ${name} deleted from database`)
                    })
                    .catch(error => {
                        setMsg(`User ${name} is already deleted`)
                    });
                setTimeout(() => {
                    setMsg(null)
                }, 4000)
            }
        }
    }

    return (
        <div className="main">
            <h2>Phonebook</h2>
            <Notification message={msg} />
            <Filter value={searchTerm} handleSearch={handleSearch}/>
            <h1>Add new </h1>
            <AddPerson
                onSubmit={addName}
                nameValue={newName}
                nameOnChange={handleNameChange}
                numberValue={newNumber}
                numberOnChange={handleNumberChange}
                type="submit"
            />
            <h2>Numbers</h2>
            <PersonInfoList searchResult={searchResult} deleteRecord={remove}/>

        </div>
    )

}

export default App