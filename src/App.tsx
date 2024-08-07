import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "./models/models";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = [...todos];
    let complete = [...completedTodos];

    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
      add.isDone = false;
    } else {
      add.isDone = true;
      complete.splice(destination.index, 0, add);
    }

    setTodos(active);
    setCompletedTodos(complete);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <h1 className="heading">Task Manager</h1>
        <p className="description">
          Drag and Drop React app with Typscript <br /> Add tasks and push ENTER
          or clik GO.
          <br /> you can drag and drop the tasks from active to completed, make
          them completed, delete or edit them.
        </p>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          CompletedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
