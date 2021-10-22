import sorts from "../data/sort";
import { Listbox } from '@headlessui/react'
function TodoSorter({ getValue }) {
  return (
    <Listbox value="Terbaru" onChange={getValue} as="div" className="relative z-20">
      <Listbox.Button className="h-14 w-14 rounded-full border border-gray-300 grid place-items-center" data-cy="todo-sort-button">
        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 6L6 2M6 2L10 6M6 2V16" stroke="#888888" strokeWidth="1.5" strokeLinecap="square"/>
          <path d="M20 12L16 16M16 16L12 12M16 16V2" stroke="#888888" strokeWidth="1.5" strokeLinecap="square"/>
        </svg>
      </Listbox.Button>
      <Listbox.Options data-cy="sort-parent" className="absolute top-full mt-2 bg-white grid py-2 w-56 rounded-md shadow-lg">
        {sorts.map(sort => (
          <Listbox.Option 
            key={sort.name}
            value={sort.name}
          >
            <div className="flex items-center gap-3 px-7 py-3.5 hover:bg-primary/10 cursor-pointer" data-cy="sort-selection" >
              <i data-cy="sort-selection-icon">{sort.icon}</i>
              <p data-cy="sort-selection-title">{sort.name}</p>
            </div>
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default TodoSorter