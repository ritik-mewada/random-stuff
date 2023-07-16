import React from "react";

const editTodo = ({
    currentTodo,
    onChange,
    handleUpdateTodo,
    cancelUpdate,
}) => {
    return (
        <div>
            <h1>Add Todo</h1>
            <form onSubmit={handleUpdateTodo}>
                <input
                    type="text"
                    value={currentTodo.text}
                    onChange={onChange}
                />
                <button type="submit">Update</button>
                <button onClick={cancelUpdate}>Cancel</button>
            </form>
        </div>
    );
};

export default editTodo;
