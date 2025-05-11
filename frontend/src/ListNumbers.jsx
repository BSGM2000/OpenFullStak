import React from "react";

const ListNumbers = ({personsToShow, handleDelete}) => {
    return (
        <>
            <h2>Numbers</h2>
            <ul>
                {personsToShow.map(person => 
                    <li key={person.id}>
                        {person.name} {person.number}
                        <button onClick={() => handleDelete(person.id)}>Borrar</button>
                    </li>
                )}
            </ul>
        </>
    )
}

export default ListNumbers;