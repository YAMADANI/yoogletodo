"use client";
import { useState, useEffect } from "react";
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

type Todo = {
  id: string;
  time: string;
  content: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const savedTodos = sessionStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  const addTodo = (content: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      time: new Date().toISOString(),
      content,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    sessionStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    sessionStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    const interval = setInterval(() => {
      if (Notification.permission === "granted" && todos.length > 0) {
        new Notification("📢 YoogleToDo", {
          body: `${todos.length} 件のToDoが残ってるぞ！はよやれ！`,
          icon: "/todo-icon.png",
        });
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [todos]);

  return (
    <main className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold font-krona-one">
        <span className="text-violet-600">Y</span>
        <span className="text-red-500">o</span>
        <span className="text-yellow-300">o</span>
        <span className="text-blue-500">g</span>
        <span className="text-green-600">l</span>
        <span className="text-red-500">e</span>
        <span className="text-sky-500">To</span>
        <span className="text-slate-500 text-7xl">Do</span>
      </h1>
      <div className="w-full mt-5 max-w-xl">
        <div className="w-full px-8 py-5 space-y-6 bg-white shadow-md rounded-xl">
          <AddTask onAdd={addTodo} />
          <TaskList todos={todos} onDelete={deleteTodo} />
        </div>
      </div>
    </main>
  );
}
