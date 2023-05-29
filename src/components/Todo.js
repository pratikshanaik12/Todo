// The Todo component represents a single todo item in the list.

import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

// It receives the following props: todos (an array of all todos), completeTodo (a function to mark a todo as complete), removeTodo (a function to remove a todo), and updateTodo (a function to update a todo).
const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {

    // Use state hook manages the state of editing process.
    // 'edit' is a state which holds id and value of the todo being edited.
    // initially, id is set to null and value is empty string.
    const [edit, setEdit] = useState({
    id: null,
    value: ''
  });


  //  submitUpdate function is called when the user submits an updated todo from the TodoForm component. 
  //  It calls the updateTodo function passed as a prop to update the todo with the new value.
  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  //  If an edit is in progress (i.e., edit.id is not null), the component renders the TodoForm component for editing.
  //  It passes the edit state and the submitUpdate function as props to TodoForm.
  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }
  
  // If no editing is in progress, the component renders the list of todos.
  // It maps over the todos array and creates a <div> for each todo item.
  return todos.map((todo, index) => (

    // Each todo item is assigned a unique key using the index of the item.
    // The className of the todo <div> is set based on whether the todo is marked as complete (todo.isComplete). This allows different styling for completed todos.
    // The todo text is displayed inside the <div> using todo.text.
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Todo;