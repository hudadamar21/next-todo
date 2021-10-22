import dynamic from 'next/dynamic'

import { Switch } from '@headlessui/react'
const PriorityIndicator = dynamic(() => import('./PriorityIndicator'))

function TodoItem({ todo, onChangeIsActive, onDelete }) {

  const editIcon = <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.9998H8L18.5 9.49981C19.0304 8.96938 19.3284 8.24996 19.3284 7.49981C19.3284 6.74967 19.0304 6.03025 18.5 5.49981C17.9696 4.96938 17.2501 4.67139 16.5 4.67139C15.7499 4.67139 15.0304 4.96938 14.5 5.49981L4 15.9998V19.9998Z" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.5 6.49982L17.5 10.4998" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>

  const deleteIcon = <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 7H20" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11V17" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 11V17" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>

  return (
    <div data-cy="todo-item" className="relative flex items-center gap-5 bg-white px-10 py-6 border rounded-lg shadow-lg" >
      <Switch 
        data-cy="todo-item-checkbox"
        checked={todo.is_active}
        onChange={onChangeIsActive}
        className={`${todo.is_active ? 'bg-primary border-blue-300' : 'bg-gray-100 border-gray-300'} border border-gray-300 rounded-sm h-8 w-8 grid place-items-center`}
      >
        { todo.is_active ? (
          <svg className="w-6 h-6" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.9165 6.99995L5.83317 9.91662L11.6665 4.08328" stroke="white" strokeWidth="2" strokeLinecap="square"/>
          </svg>                        
        ) : false}
      </Switch>
      <PriorityIndicator 
        data-cy="todo-item-priority-indicator" 
        priority={todo.priority} 
      />
      <p data-cy="todo-item-title" className="text-xl font-bold">
        {todo.title}
      </p>
      <button data-cy="todo-item-edit-button">
        {editIcon}
      </button>
      <button data-cy="todo-item-delete-button" onClick={() => onDelete(todo)} className="absolute top-1/2 -translate-y-1/2 right-5 h-full w-14 grid place-items-center">
        {deleteIcon}
      </button>
    </div>
  )
}

export default TodoItem