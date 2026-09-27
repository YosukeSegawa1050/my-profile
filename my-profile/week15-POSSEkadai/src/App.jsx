import { useEffect, useState } from 'react'
import TaskItem from './TaskItem.jsx'

const STORAGE_KEY = 'week15-possekadai-tasks'

const filters = [
  { value: 'all', label: 'すべて' },
  { value: 'active', label: '未完了' },
  { value: 'done', label: '完了済み' },
]

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask(event) {
    event.preventDefault()
    const text = input.trim()
    if (!text) return

    setTasks((current) => [
      ...current,
      { id: crypto.randomUUID(), text, done: false },
    ])
    setInput('')
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    )
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  const remaining = tasks.filter((task) => !task.done).length
  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.done
    if (filter === 'done') return task.done
    return true
  })

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-20">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          タスク管理
        </h1>
      </header>

      <form onSubmit={addTask} className="flex gap-2">
        <label htmlFor="new-task" className="sr-only">
          新しいタスク
        </label>
        <input
          id="new-task"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="新しいタスクを入力"
          className="min-w-0 flex-1 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 hover:bg-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        />
        <button
          type="submit"
          className="shrink-0 cursor-pointer bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          追加
        </button>
      </form>

      <section aria-label="タスク一覧" className="mt-8 overflow-hidden bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <p className="text-sm font-medium text-slate-600">残り {remaining} 件</p>
          <div role="group" aria-label="タスクの表示切り替え" className="flex gap-1">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                aria-pressed={filter === item.value}
                className={`cursor-pointer px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-indigo-600 ${
                  filter === item.value
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {visibleTasks.length > 0 ? (
          <ul>
            {visibleTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        ) : (
          <p className="px-5 py-14 text-center text-sm text-slate-400">
            {tasks.length === 0
              ? 'タスクはまだありません。上の欄から追加してください。'
              : 'この条件に合うタスクはありません。'}
          </p>
        )}
      </section>
    </main>
  )
}

export default App
