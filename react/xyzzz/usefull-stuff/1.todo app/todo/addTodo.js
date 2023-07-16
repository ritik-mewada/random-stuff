import React from "react";

const AddTodo = ({ valueTodoInput, handleTodoInput, handleAddTodoSubmit }) => {
    return (
        <div>
            <h1>Add Todo</h1>
            <form onSubmit={handleAddTodoSubmit}>
                <input
                    type="text"
                    value={valueTodoInput}
                    onChange={handleTodoInput}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddTodo;
