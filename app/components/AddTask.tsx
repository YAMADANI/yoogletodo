import { Input , Button } from '@headlessui/react'
import { useState } from "react";

const AddTask = ({ onAdd }: { onAdd: (content: string) => void }) => {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
    
        onAdd(inputValue);
        setInputValue("");
    };

    return(
        <form onSubmit={handleSubmit} className="flex flex-row space-x-2">
            <Input  type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="flex-grow border border-gray-600 rounded-sm focus:outline focus:outline-gray-800" />
            <Button type="submit" className="bg-teal-400 rounded-full px-4 py-2 transform hover:bg-teal-300 duration-150">追加</Button>
        </form>
    )
};
export default AddTask;