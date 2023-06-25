import React, { useEffect, useState } from "react";
import AddTodo from "./todo/addTodo";
import ListTodo from "./todo/listTodo";
import EditTodo from "./todo/editTodo";

const App = () => {
    const [todoText, setTodoText] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({});
    // const [formCount, setFormCount] = useState(0);

    const [todos, setTodos] = useState(() => {
        const savedTodos = window.localStorage.getItem("todo");
        if (savedTodos) {
            return JSON.parse(savedTodos);
        } else {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(todos));
    }, [todos]);

    const handleAddTodoSubmit = (e) => {
        e.preventDefault();

        if (todoText !== "") {
            setTodos([
                ...todos,
                {
                    id: Date.now(),
                    text: todoText,
                },
            ]);
        }

        setTodoText("");
    };

    const deleteTodo = (id) => {
        const deleteTodo = todos.filter((todo) => todo.id !== id);
        setTodos(deleteTodo);
    };

    const editTodo = (todo) => {
        setIsEditing(true);
        setCurrentTodo({ ...todo });
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const updateTodo = todos.map((todo) => {
            return todo.id === currentTodo.id ? currentTodo : todo;
        });

        setIsEditing(false);
        setTodos(updateTodo);
    };

    return (
        <div>
            {isEditing ? (
                <EditTodo
                    currentTodo={currentTodo}
                    onChange={(e) =>
                        setCurrentTodo({ ...currentTodo, text: e.target.value })
                    }
                    cancleUpdate={() => setIsEditing(false)}
                    handleUpdateTodo={handleUpdate}
                />
            ) : (
                <AddTodo
                    handleTodoInput={(e) => setTodoText(e.target.value)}
                    valueTodoInput={todoText}
                    handleAddTodoSubmit={handleAddTodoSubmit}
                />
            )}
            <ul>
                {todos.map((todo) => (
                    <ListTodo
                        key={todo.id}
                        todo={todo}
                        handleEditTodo={editTodo}
                        handleDeleteTodo={deleteTodo}
                    />
                ))}
            </ul>
            {/* <button onClick={() => setFormCount(formCount + 1)}>+</button>
            {Array.from({ length: formCount }).map((_, index) => (
                <h1>{formCount}</h1> 
            ))} */}
        </div>
    );
};

export default App;
