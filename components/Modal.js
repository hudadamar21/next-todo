import { useState } from "react"

function Modal ({ submit }){

  const [name, setName] = useState('')
  const [priority, setPriority] = useState('')

  const handleSubmit = () => {
    submit({name, priority})
  }

  return (
    <div data-cy="modal-add" className="fixed inset-0 z-50 bg-black/50 grid justify-center items-start pt-14 overflow-auto">
      <div className="rounded-2xl w-[850px] bg-white">
        <header className="flex items-center justify-between px-8 py-6 w-full border-b">
          <h1 className="text-xl font-semibold" data-cy="modal-add-title">
            Add Item
          </h1>
          <button className="text-gray-400 hover:text-gray-500" data-cy="modal-add-close-button">
            X
          </button>
        </header>
        <form onSubmit={handleSubmit} className="p-8 grid gap-5">
          <div>
            <label className="block font-medium mb-3" htmlFor="nama" data-cy="modal-add-name-title">
              Nama List Item
            </label>
            <input 
              className="px-5 py-4 w-full rounded-lg border focus:outline-none focus:ring-1 ring-primary" 
              type="text" 
              id="nama"
              onInput={e => setName(e.target.value)}
              placeholder="Tambahkan Nama Activity" 
              data-cy="modal-add-name-input"
            />
          </div>
          <div>
            <label className="block font-medium mb-3" htmlFor="priority" data-cy="modal-add-priority-title">
              Priority
            </label>
            <div className="w-1/3">
              <select onChange={e => setPriority(e.target.value)} name="priority" id="priority">
                <option value="very-high">Very High</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
                <option value="very-low">Very Low</option>
              </select>
            </div>
          </div>
        </form>
        <footer className="px-8 py-6 border-t flex justify-end">
          <button
            className="w-36 grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed bg-primary focus:ring-4 ring-primary/30"
            data-cy="modal-add-save-button"
          >
            Simpan
          </button>
        </footer>
      </div>
    </div>
  )
}

export default Modal