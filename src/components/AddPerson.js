import React from 'react';

const AddPerson = ({onSubmit, nameValue, nameOnChange, numberValue, numberOnChange, type}) => {

    return (
        <form onSubmit={onSubmit}>
            <div>
                name: <input value={nameValue} onChange={nameOnChange}/>
            </div>
            <div>
                number: <input value={numberValue} onChange={numberOnChange} />
            </div>
            <div>
                <button type={type}>add</button>
            </div>
        </form>
    )
}

export default AddPerson;