function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="group flex items-center gap-3 px-5 py-3 transition-colors hover:bg-slate-50">
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        aria-label={`${task.text}を${task.done ? '未完了' : '完了'}にする`}
        aria-pressed={task.done}
        className={`flex size-6 shrink-0 cursor-pointer items-center justify-center text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
          task.done
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-slate-100 text-transparent hover:bg-indigo-50'
        }`}
      >
        ✓
      </button>
      <span
        className={`min-w-0 flex-1 break-words text-sm ${
          task.done ? 'text-slate-400 line-through' : 'text-slate-800'
        }`}
      >
        {task.text}
      </span>
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`${task.text}を削除`}
        className="shrink-0 cursor-pointer px-2 py-1 text-xs text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-red-500"
      >
        削除
      </button>
    </li>
  )
}

export default TaskItem
