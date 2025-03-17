"use client";
import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

type Todo = {
  id: string;
  time: number;
  content: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [notificationTimers, setNotificationTimers] = useState<Map<string, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    const savedTodos = sessionStorage.getItem("todos");
    const savedTimers = sessionStorage.getItem("notificationTimers");

    if (savedTodos) {
      const parsedTodos: Todo[] = JSON.parse(savedTodos);
      setTodos(parsedTodos);

      parsedTodos.forEach((todo) => {
        const now = Date.now();
        if (now >= todo.time + 60000) {
          startRepeatingNotifications(todo);
        } else {
          const delay = todo.time + 60000 - now;
          setTimeout(() => startRepeatingNotifications(todo), delay);
        }
      });
    }

    if (savedTimers) {
      const parsedTimers: Record<string, boolean> = JSON.parse(savedTimers);
      Object.keys(parsedTimers).forEach((id) => {
        if (parsedTimers[id]) {
          startRepeatingNotifications(todos.find((todo) => todo.id === id)!);
        }
      });
    }

    return () => {
      notificationTimers.forEach((timer) => clearTimeout(timer));
      notificationTimers.forEach((timer) => clearInterval(timer));
    };
  }, []);

  const addTodo = (content: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      time: Date.now(),
      content,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    sessionStorage.setItem("todos", JSON.stringify(updatedTodos));

    scheduleNotification(newTodo);
  };

  const deleteTodo = (id: string) => {
    clearNotifications(id);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    sessionStorage.setItem("todos", JSON.stringify(updatedTodos));

    // sessionStorage から通知情報を削除
    const savedTimers = JSON.parse(sessionStorage.getItem("notificationTimers") || "{}");
    delete savedTimers[id];
    sessionStorage.setItem("notificationTimers", JSON.stringify(savedTimers));
  };

  const scheduleNotification = (todo: Todo) => {
    const now = Date.now();
    const initialDelay = Math.max(0, todo.time + 60000 - now);

    setTimeout(() => {
      startRepeatingNotifications(todo);
    }, initialDelay);
  };

  const startRepeatingNotifications = (todo: Todo) => {
    if (Notification.permission !== "granted") return;

    new Notification(`YoogleToDo：${todo.content}`, {
      body: "📢  やれ！早くやれ！！",
      icon: "/yoogletodo/icon.svg",
    });

    if (notificationTimers.has(todo.id)) {
      clearInterval(notificationTimers.get(todo.id));
    }

    const interval = setInterval(() => {
      new Notification(`YoogleToDo：${todo.content}`, {
        body: "💢 まだやっとらんのか？ いい加減しろ！！",
        icon: "/yoogletodo/icon.svg",
      });
    }, 10000); // 10秒ごとに通知

    const newTimers = new Map(notificationTimers);
    newTimers.set(todo.id, interval);
    setNotificationTimers(newTimers);

    // sessionStorage に通知情報を保存
    const savedTimers = JSON.parse(sessionStorage.getItem("notificationTimers") || "{}");
    savedTimers[todo.id] = true;
    sessionStorage.setItem("notificationTimers", JSON.stringify(savedTimers));
  };

  const clearNotifications = (id: string) => {
    if (notificationTimers.has(id)) {
      clearTimeout(notificationTimers.get(id));
      clearInterval(notificationTimers.get(id));

      const newTimers = new Map(notificationTimers);
      newTimers.delete(id);
      setNotificationTimers(newTimers);
    }
  };

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
