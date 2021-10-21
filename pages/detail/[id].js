import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import axios from "axios"
import { Switch, Menu } from '@headlessui/react'
import PriorityIndicator from "../../components/PriorityIndicator"
import sorts from "../../data/sort";
import ModalDelete from "../../components/ModalDelete";
import Alert from "../../components/Alert";

export async function getStaticPaths() {
  const { data } = await axios.get(
    `https://todo.api.devcode.gethired.id/activity-groups?email=hudadamar21%40gmail.com`
  )
  const paths = data.data.map(ac => ({
    params: { id: ac.id.toString() }
  }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const { data } = await axios.get(
    `https://todo.api.devcode.gethired.id/activity-groups/${params.id}`
  )
  return {
    props: {
      data
    },
    revalidate: 1
  }
}

function DetailItem({data: { id: activityId = null, title = '', todo_items = [] }}) {
  const [ todos, setTodos ] = useState(todo_items)
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

  return (<>
    <nav data-cy="header-background" className="bg-primary">
      <h1 data-cy="header-title" className="container mx-auto text-white py-7 font-bold text-2xl">
        TO DO LIST APP
      </h1>
    </nav>
    <div className="container mx-auto">
      <div className="flex items-center justify-between py-10">
      <div className="flex items-center gap-3">
        <Link data-cy="todo-back-button" href="/" passHref>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.6665 16L14.6665 24" stroke="#111111" strokeWidth="5" strokeLinecap="square"/>
            <path d="M6.6665 16L14.6665 8" stroke="#111111" strokeWidth="5" strokeLinecap="square"/>
          </svg>
        </Link>
        <h2 data-cy="todo-title" className="text-3xl font-bold">{title}</h2>
        <button data-cy="todo-title-edit-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 19.9998H8L18.5 9.49981C19.0304 8.96938 19.3284 8.24996 19.3284 7.49981C19.3284 6.74967 19.0304 6.03025 18.5 5.49981C17.9696 4.96938 17.2501 4.67139 16.5 4.67139C15.7499 4.67139 15.0304 4.96938 14.5 5.49981L4 15.9998V19.9998Z" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.5 6.49982L17.5 10.4998" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
        <div className="flex items-center gap-5">
        <Menu as="div" className="relative z-20">
          <Menu.Button data-cy="todo-sort-button" className="h-14 w-14 rounded-full border border-gray-300 grid place-items-center">
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 6L6 2M6 2L10 6M6 2V16" stroke="#888888" strokeWidth="1.5" strokeLinecap="square"/>
              <path d="M20 12L16 16M16 16L12 12M16 16V2" stroke="#888888" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          </Menu.Button>
          <Menu.Items data-cy="sort-parent" className="absolute top-full mt-2 bg-white grid py-2 w-56 rounded-md shadow-lg">
            {sorts.map(sort => (
              <Menu.Item key={sort.name}>
                <div className="flex items-center gap-3 px-7 py-3.5 hover:bg-primary/10 cursor-pointer" data-cy="sort-selection" >
                  <div data-cy="sort-selection-icon">{sort.icon}</div>
                  <div data-cy="sort-selection-title">{sort.name}</div>
                </div>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
          <button onClick={() => setCreateModal(true)} data-cy="todo-add-button" className="px-8 py-3 text-lg font-semibold rounded-full bg-primary text-white">
            + Tambah
          </button>
        </div>
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
                      ${todo.is_active ? 'bg-primary border-blue-300' : 'bg-gray-100 border-gray-300'}
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
            className="bg-primary py-4 rounded-full text-white text-lg font-semibold w-36 grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 ring-primary/30"
            data-cy="modal-add-save-button"
          >
            Simpan
          </button>
        </footer>
      </div>
    </div>
    }

    <ModalDelete
      data={deleteTodoData}
      onClose={() => setDeleteTodoData(null)}
      handleDelete={handleDeleteTodo}
    />

    <Alert 
      message={alertMessage}
      onClose={() => setAlertMessage('')}
    />
   </>
  )
}

export default DetailItem