import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import axios from "axios"
import { Switch } from '@headlessui/react'
import PriorityIndicator from "../../components/PriorityIndicator"

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`https://todo.api.devcode.gethired.id/activity-groups/${params.id}`)
    if(!data) {
      return { props: {}}
    }
    return {
      props: {
        activityId: data.id,
        title: data.title,
        items: data.todo_items
      }
    }
}

function DetailItem({activityId, title = '', items = []}) {
  const [ todos, setTodos ] = useState(items)
  const [ deleteTodoData, setDeleteTodoData ] = useState(null)
  const [ createModal, setCreateModal ] = useState(false)
  const [ name, setName ] = useState('')
  const [ priority, setPriority ] = useState('very-high')
  const [ alertMessage, setAlertMessage] = useState(null)

  const createTodo = async () => {
   if(!name) {
     alert('title belum diisi')
   } else {
    if(activityId) {
      const res = await axios.post("https://todo.api.devcode.gethired.id/todo-items", {
        activity_group_id: activityId, 
        title: name, 
        priority,
        is_active: 0
      })
      setTodos(todo => [res.data, ...todo])
      setCreateModal(false)
    }
   }
  }

  const openDeleteModal = (e, todo) => {
    e.stopPropagation()
    setDeleteTodoData(todo)
  }

  const handleChangeIsActive = async (id, data) => {
    const res = await updateTodo(id, data)
    setTodos(todos => todos.map(todo => {
      return todo.id === id ? { ...todo, is_active: res.data.is_active } : todo
    }))
  }

  const handleDeleteTodo = async () => {
    try {
      await axios.delete(
        `https://todo.api.devcode.gethired.id/todo-items/${deleteTodoData.id}`
      )
      const newAc = todos.filter(ac => ac.id !== deleteTodoData.id)
      setTodos(newAc)
      setDeleteTodoData(null)
      setAlertMessage('Todo berhasil dihapus')
    } catch (error) {
      console.log(error)
    }
  }

  const updateTodo = async (id, data, cb) => {
    return await axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${id}`, data)
  }

  return (
    <>
     <nav data-cy="header-background" className="bg-blue-400 ">
       
      <h1 data-cy="header-title" className="container mx-auto text-white py-5 font-bold text-2xl">
        TO DO LIST APP
      </h1>
     </nav>
     <div className="container mx-auto">
       <div className="flex items-center justify-between py-10">
        <div className="flex items-center gap-3">
          <Link data-cy="todo-back-button" href="/">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.6665 16L14.6665 24" stroke="#111111" strokeWidth="5" strokeLinecap="square"/>
              <path d="M6.6665 16L14.6665 8" stroke="#111111" strokeWidth="5" strokeLinecap="square"/>
            </svg>
          </Link>
          <h2 data-cy="activity-title" className="text-3xl font-bold">{title}</h2>
          <button data-cy="todo-title-edit-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 19.9998H8L18.5 9.49981C19.0304 8.96938 19.3284 8.24996 19.3284 7.49981C19.3284 6.74967 19.0304 6.03025 18.5 5.49981C17.9696 4.96938 17.2501 4.67139 16.5 4.67139C15.7499 4.67139 15.0304 4.96938 14.5 5.49981L4 15.9998V19.9998Z" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.5 6.49982L17.5 10.4998" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
         <button onClick={() => setCreateModal(true)} data-cy="activity-add-button" className="px-4 py-2 rounded-lg bg-blue-400 text-white">
           Tambah
         </button>
       </div>
       
       {
         todos.length
         ?  <div className="grid grid-cols-1 gap-3 pb-10">
              {
                todos.map(todo => (
                  <div data-cy="todo-item" className="relative flex items-center gap-3 bg-white px-5 py-4 border rounded-lg shadow-lg" key={todo.id}>
                    <Switch 
                      data-cy="todo-item-checkbox"
                      checked={todo.is_active}
                      onChange={() => handleChangeIsActive(todo.id, { is_active: !todo.is_active})}
                      className={`
                        ${todo.is_active ? 'bg-blue-500 border-blue-300' : 'bg-gray-100 border-gray-300'}
                        border border-gray-300 rounded-sm h-5 w-5 grid place-items-center
                      `}
                    >
                      { todo.is_active ? (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.9165 6.99995L5.83317 9.91662L11.6665 4.08328" stroke="white" strokeWidth="2" strokeLinecap="square"/>
                        </svg>                        
                      ) : false}
                    </Switch>
                    <PriorityIndicator data-cy="todo-item-priority-indicator" priority={todo.priority}></PriorityIndicator>
                    <div data-cy="todo-item-title" className="text-lg font-bold">{todo.title}</div>
                    <button data-cy="todo-item-edit-button">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 19.9998H8L18.5 9.49981C19.0304 8.96938 19.3284 8.24996 19.3284 7.49981C19.3284 6.74967 19.0304 6.03025 18.5 5.49981C17.9696 4.96938 17.2501 4.67139 16.5 4.67139C15.7499 4.67139 15.0304 4.96938 14.5 5.49981L4 15.9998V19.9998Z" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.5 6.49982L17.5 10.4998" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button data-cy="todo-item-delete-button" onClick={(e) => openDeleteModal(e, todo)} className="absolute top-1/2 -translate-y-1/2 right-5">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 7H20" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M10 11V17" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14 11V17" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                ))
              }  
            </div>
         :  <div data-cy="activity-empty-state" className="text-center">
              <Image src="/images/TodoEmptyState.svg" width="500" height="500" alt="todo empty state" />
            </div>  
       }  
     </div>

     {
       createModal &&
       <div onClick={e => {
         e.stopPropagation()
         setCreateModal(false)
       }} data-cy="modal-add" className="fixed inset-0 z-50 bg-black/50 grid justify-center items-start pt-14 overflow-auto">
        <div onClick={e => e.stopPropagation()} className="rounded-2xl w-[850px] bg-white">
          <header className="flex items-center justify-between px-8 py-6 w-full border-b">
            <h1 className="text-xl font-semibold" data-cy="modal-add-title">
              Tambah List Item
            </h1>
            <button onClick={() => setCreateModal(false)} className="text-gray-400 hover:text-gray-500" data-cy="modal-add-close-button">
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
                <select data-cy="modal-add-priority-dropdown" onChange={e => setPriority(e.target.value)} name="priority" id="priority">
                  <option data-cy="modal-add-priority-item" value="very-high">Very High</option>
                  <option data-cy="modal-add-priority-item" value="high">High</option>
                  <option data-cy="modal-add-priority-item" value="normal">Normal</option>
                  <option data-cy="modal-add-priority-item" value="low">Low</option>
                  <option data-cy="modal-add-priority-item" value="very-low">Very Low</option>
                </select>
              </div>
            </div>
          </form>
          <footer className="px-8 py-6 border-t flex justify-end">
            <button
              onClick={createTodo}
              className="bg-blue-500 py-4 rounded-full text-white text-lg font-semibold w-36 grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed bg-primary focus:ring-4 ring-primary/30"
              data-cy="modal-add-save-button"
            >
              Simpan
            </button>
          </footer>
        </div>
      </div>
     }

      {
       deleteTodoData && (
        <div onClick={e => {
          e.stopPropagation()
          deleteTodoData(null)
        }} data-cy="modal-delete" className="fixed inset-0 z-50 bg-black/40 grid place-items-center">
          <div onClick={e => e.stopPropagation()} className="w-[500px] p-10 grid place-items-center gap-10 bg-white shadow-lg rounded-2xl">
            <div data-cy="modal-delete-icon">
            <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M42 52.5V52.535M42 31.5V38.5V31.5Z" stroke="#ED4C5C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17.5002 66.5012H66.5002C67.6423 66.4932 68.765 66.2059 69.7705 65.6643C70.7761 65.1227 71.6338 64.3433 72.2689 63.3941C72.904 62.4449 73.2972 61.3546 73.4142 60.2186C73.5312 59.0825 73.3685 57.935 72.9402 56.8762L48.0902 14.0012C47.4848 12.9071 46.5975 11.9952 45.5203 11.3601C44.4432 10.725 43.2156 10.3901 41.9652 10.3901C40.7148 10.3901 39.4872 10.725 38.41 11.3601C37.3329 11.9952 36.4455 12.9071 35.8402 14.0012L10.9902 56.8762C10.57 57.9108 10.4033 59.0308 10.5042 60.1428C10.6051 61.2549 10.9705 62.3266 11.57 63.2687C12.1694 64.2107 12.9856 64.9956 13.9502 65.558C14.9149 66.1203 16.0001 66.4438 17.1152 66.5012" stroke="#ED4C5C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </div>
            <p className="text-xl w-full text-center" data-cy="modal-delete-title">
              Apakah anda yakin menghapus todo <span className="font-bold">“{deleteTodoData.title}”?</span> 
            </p>
            <div className="flex items-center justify-center gap-5 w-full px-10">
              <button
                onClick={() => setDeleteTodoData(null)}
                className="bg-gray-100 px-6 py-3 rounded-full text-white flex justify-center items-center gap-2 font-medium text-lg transition w-1/2 focus:ring-4 ring-gray-200 text-black/80 " 
                data-cy="modal-delete-cancel-button"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteTodo}
                className="bg-red-500 px-6 py-3 rounded-full text-white flex justify-center items-center gap-2 font-medium text-lg transition w-1/2 bg-primary-red focus:ring-4 ring-red-500/30" 
                data-cy="modal-delete-confirm-button"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
       )
     }

     {
      alertMessage &&
      <div onClick={e => {
        e.stopPropagation()
        setAlertMessage('')
      }} className="fixed inset-0 grid place-items-center bg-black/50">
        <div onClick={e => e.stopPropagation()} data-cy="modal-information" className="flex items-center gap-5 w-[500px] py-4 px-6 rounded-xl shadow-lg bg-white">
          <Image src="/icons/alert.svg" width="25" height="25" data-cy="modal-information-icon" alt="alert" />
          <p data-cy="modal-information-title">{alertMessage}</p>
        </div>
      </div>
     }
   </>
  )
}

export default DetailItem