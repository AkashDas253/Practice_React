import React, { useState, useEffect } from 'react';
import './App.css';

function getInitialTodos() {
  const saved = localStorage.getItem('todos');
  return saved ? JSON.parse(saved) : [];
}

function App() {
  const [todos, setTodos] = useState(getInitialTodos());
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Sync todos across tabs/windows
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === 'todos') {
        setTodos(event.newValue ? JSON.parse(event.newValue) : []);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([...todos, { text: input, status: 'not-started' }]);
    setInput('');
  };

  const cycleStatus = (index) => {
    const statusOrder = ['not-started', 'in-progress', 'done'];
    const newTodos = [...todos];
    const currentStatus = newTodos[index].status;
    const nextStatus = statusOrder[(statusOrder.indexOf(currentStatus) + 1) % statusOrder.length];
    newTodos[index].status = nextStatus;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, idx) => (
          <li
            key={idx}
            className={`list-item status-${todo.status}`}
          >
            <span>{todo.text}</span>
            <div>
              <button onClick={() => cycleStatus(idx)}>
                {todo.status === 'not-started' && 'Start'}
                {todo.status === 'in-progress' && 'Done'}
                {todo.status === 'done' && 'Reset'}
              </button>
              <button onClick={() => deleteTodo(idx)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;