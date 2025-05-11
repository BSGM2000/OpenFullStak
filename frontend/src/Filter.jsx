import React from "react";

const Filter = ({filter, handleFilterChange}) => {
    const filterStyle = {
        marginBottom: 10,
        color: 'Blue',
        fontSize: 20
    }
    return (
        <>
            <h2 style={filterStyle}>Search Phonebook</h2>
            <input value={filter} onChange={handleFilterChange} />
        </>
    )
}

export default Filter;