import { useEffect, useState } from "react"



export function App() {

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('@to-do:tasks')) || []);
  const [newTask, setNewTask] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState('asc');

  useEffect(() => {
    localStorage.setItem('@to-do:tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), text: newTask, status: 'pending' },
      ]);
      setNewTask('');
    }
  };

  let filteredTasks = tasks.filter((task) => task?.text.toLowerCase().includes(searchTerm.toLowerCase()));
  sort === 'asc' ? filteredTasks.sort((a, b) => a?.text?.localeCompare(b.text)) : filteredTasks?.sort((a, b) => b?.text?.localeCompare(a?.text));


  const toggleTaskStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task?.id === id
          ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' }
          : task
      )
    );
  };
  const removeTask = (id) => { setTasks((prevTasks) => prevTasks?.filter((task) => id !== task?.id)); };

  const filterTasks = (task) => {
    if (statusFilter === 'all') {
      return true;
    } else {
      return task.status === statusFilter;
    }
  };



  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Add a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 mr-2 flex-1"
        />
        <button onClick={addTask} className="bg-blue-500 text-white p-2">
          Adicionar Tarefa
        </button>
      </div>


      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 mr-2 flex-1"
        />
      </div>

      <div className="mb-4 flex items-center">
        <label className="mr-2">Filtrar por Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2"
        >
          <option value="all">Todas</option>
          <option value="pending">Pendente</option>
          <option value="completed">Completa</option>
        </select>
      </div>
      <div className="space-x-2 ">
        <button onClick={() => setSort("asc")} className="bg-purple-500 text-white px-3 py-1 min-w-[4rem] rounded">
          ASC
        </button>
        <button onClick={() => setSort("desc")} className="bg-purple-500 text-white px-3 py-1 min-w-[4rem] rounded">
          DESC
        </button>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Tasks</h2>
        <ul>
          {filteredTasks.filter(filterTasks).map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-2 border ${task.status === 'completed' ? 'bg-green-800' : 'bg-yellow-500'
                }`}
            >
              <span className={`${task.status == "completed" ? "line-through" : ""}`}>{task.text}</span>
              <div className="space-x-2">
                <button className={`${task.status == "completed" ? "bg-yellow-500" : "bg-green-500"} text-white px-3 py-1 min-w-[10rem] rounded`} onClick={() => toggleTaskStatus(task.id)}>
                  {task.status === 'completed' ? 'Mark Pending' : 'Mark Completed'}
                </button>
                <button className="bg-red-500 text-white px-1 py-1 rounded" onClick={() => removeTask(task.id)}>
                  X
                </button>
              </div>

            </li>
          ))}
        </ul>
      </div>
    </div >
  );
}
