import React, {useState, useEffect} from 'react';
import "./App.css"
import AddPerson from "./components/AddPerson";
import Filter from "./components/Filter";
import PersonInfoList from "./components/PersonInfoList";

const App = () => {
    const [persons, setPersons] = useState([
        {
            name: 'Tommi Keinonen',
            number: "1231-2414"
        },
        {
            name: 'Matias Berglund',
            number: "13257891"
        },
        {
            name: 'Juhana Kallio',
            number: "16543"
        },
        {
            name: 'Liisa Laamanen',
            number: "525325"
        }
    ])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResult, setSearchResult] = useState([])


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
            alert(`${newName} already exists in database`)
        } else {
            setPersons(persons.concat(personObject))
            setNewName("")
            setNewNumber("")
        }
    }

    const handleNameChange = (event) => {
        //console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearch = (event) => {
        event.preventDefault();
        console.log(event.target.value)
        setSearchTerm(event.target.value)
    }


    useEffect(() => {
        const result = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()));
        console.log(searchResult)
        setSearchResult(result)

    }, [searchTerm]);

    return (
        <div className="main">
            <h2>Phonebook</h2>

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
            <PersonInfoList searchResult={searchResult} />

        </div>
    )

}

export default App