import React from 'react'

const PersonInfoList = ({searchResult}) => {

    return(
        <ul style={{listStyleType: "none"}}>
            {searchResult.map(person => (
                <li key={person.name}>{person.name} - {person.number}</li>
            ))}
        </ul>
    )
}

export default PersonInfoList;