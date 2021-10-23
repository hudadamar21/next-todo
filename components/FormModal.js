import { useState } from "react";
import dynamic from "next/dynamic";
import { Dialog } from "@headlessui/react";

import priorityList from "../data/priority";

const ListOption = dynamic(() => import('./ListOption'))

function FormModal({ isOpen, onClose, onSubmitTodo }) {
  const [ name, setName ] = useState('')
  const [ priority, setPriority ] = useState('very-high')

  const handleSubmit = () => {
    onSubmitTodo(name, priority)
    setName('')
    setPriority('very-high')
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 grid place-items-center" >
      <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50 grid place-items-center"/>
      <div data-cy="modal-add" className="relative z-20 rounded-2xl w-full lg:w-[850px] bg-white">
        <header className="flex items-center justify-between px-8 py-6 w-full border-b">
          <h1 className="text-xl font-semibold" data-cy="modal-add-title">
            Tambah List Item
          </h1>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500" data-cy="modal-add-close-button">
            X
          </button>
        </header>
        <form className="p-8 grid gap-5">
          <div>
            <label className="block font-medium mb-3" htmlFor="nama" data-cy="modal-add-name-title">
              Nama List Item
            </label>
            <input 
              className="px-5 py-4 w-full rounded-lg border focus:outline-none focus:ring-1 ring-primary" 
              type="text" 
              id="nama"
              value={name}
              onInput={(e) => setName(e.target.value)}
              placeholder="Tambahkan Nama Activity" 
              data-cy="modal-add-name-input"
            />
          </div>
          <div>
            <label className="block font-medium mb-3" htmlFor="priority" data-cy="modal-add-priority-title">
              Priority
            </label>
            <div className="w-1/3">
              <ListOption
                lists={priorityList}
                data={priority}
                onChange={setPriority}
              />
            </div>
          </div>
        </form>
        <footer className="px-8 py-6 border-t flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-primary py-4 rounded-full text-white text-lg font-semibold w-36 grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 ring-primary/30 disabled:bg-opacity-60 transition"
            disabled={!name}
            data-cy="modal-add-save-button"
          >
            Simpan
          </button>
        </footer>
      </div>
    </Dialog>
    
  )
}

export default FormModal