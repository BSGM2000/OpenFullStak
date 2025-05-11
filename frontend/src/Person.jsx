import React from "react";

const Person = ({person}) => {
    return (
        <>
            <p>Name : {person.name}, Number: {person.number} </p>
        </>
    )
}
export default Person;