type Todo = {
    id: string;
    time: string;
    content: string;
};

const TaskList = ({ todos, onDelete }: { todos: Todo[], onDelete: (id: string) => void }) => {
    return (
        <ul className="space-y-4">
            {todos.map((todo) => (
                <li
                    key={todo.id} 
                    className="flex flex-row items-center justify-between p-3 border-l-5 border-teal-500 rounded shadow"
                >
                    <span className="text-2xl">{todo.content}</span>
                    <button onClick={() => onDelete(todo.id)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-10 h-10 text-black bg-gray-100 rounded shadow hover:shadow-none duration-150"
                        >
                            <path
                            fillRule="evenodd"
                            d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 111.414 1.414L13.414 10.586l4.361 4.361a1 1 0 01-1.414 1.414L12 12l-4.361 4.361a1 1 0 11-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 010-1.414z"
                            clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </li>
            ))}
        </ul>
    )
};
export default TaskList;