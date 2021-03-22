import React from 'react'

const PersonInfoList = ({searchResult, deleteRecord}) => {

        return(
            <ul style={{listStyleType: "none"}}>
                {searchResult.map(person => (
                    <li key={person.name}>{person.name} - {person.number}<span style={{marginRight: "10px"}}/> <button onClick={deleteRecord(person.name, person.id)}>delete</button></li>
                ))}
            </ul>
        )
    }

export default PersonInfoList;