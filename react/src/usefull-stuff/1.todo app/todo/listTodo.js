import React from "react";

const ListTodo = ({ todo, handleEditTodo, handleDeleteTodo }) => {
    return (
        <div>
            <li key={todo.id}>
                {todo.text}
                <button onClick={() => handleEditTodo(todo)}>Edit</button>
                <button onClick={() => handleDeleteTodo(todo.id)}>
                    Delete
                </button>
            </li>
        </div>
    );
};

export default ListTodo;
