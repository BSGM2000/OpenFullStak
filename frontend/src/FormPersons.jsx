import React from "react";

const FormPersons = ({newName, handleNameChange, newNumber, handleNumberChange, addPerson}) => {
    return (
        <>
        <h2>New Person</h2>
        <form onSubmit={addPerson}>
            <div>
                name: <input 
                value={newName}
                onChange={handleNameChange}
                />
            </div>
            <div>
                Number: <input 
                value={newNumber}
                onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
        </>
    )
}

export default FormPersons;