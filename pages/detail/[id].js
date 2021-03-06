import Image from "next/image"
import { useEffect, useState } from "react"
import axios from "axios"
import dynamic from 'next/dynamic'

import sorting from "../../utils/sorting";
import TodoSorter from "../../components/TodoSorter"

const MainLayout = dynamic(() => import('../../layouts/MainLayout'))
const PageTitle = dynamic(() => import('../../components/PageTitle'))
const AddButton = dynamic(() => import('../../components/AddButton'))
const FormModal = dynamic(() => import('../../components/FormModal'))
const BackButton = dynamic(() => import('../../components/BackButton'))
const TodoItem = dynamic(() => import('../../components/TodoItem'))
const ModalDelete = dynamic(() => import('../../components/ModalDelete'))
const Alert = dynamic(() => import('../../components/Alert'))

DetailItem.getInitialProps = async ({ query }) => {
  const { data } = await axios.get(
    `https://todo.api.devcode.gethired.id/activity-groups/${query.id}`
  )
  return { data }
}

function DetailItem({data: { id: activityId = null, title = '', todo_items = [] }}) {
  const [ todos, setTodos ] = useState(todo_items)
  const [ activityTitle, setActivityTitle ] = useState(title)
  const [ editActivityTitle, setEditActivityTitle ] = useState(false)

  const [ sortType, setSortType ] = useState('Terbaru')
  const [ deleteTodoData, setDeleteTodoData ] = useState(null)
  const [ openFormModal, setOpenFormModal ] = useState(false)
  const [ alertMessage, setAlertMessage] = useState(null)

  const changeSortBy = (value) => {
    setSortType(value)
    setTodos(sorting(todos, value))
  }

  const createTodo = async (name, priority) => {
    console.log(name, priority);
   if(!name) {
     alert('title belum diisi')
   } else {
    if(activityId) {
      const res = await axios.post("https://todo.api.devcode.gethired.id/todo-items", {
        activity_group_id: activityId, 
        title: name, 
        priority,
      })
      setTodos(todo => [res.data, ...todo])
      setOpenFormModal(false)
    }
   }
  }

  const openDeleteModal = (todo) => {
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

  const updateTitleActivity = async () => {
    const { data } = await axios.patch(`https://todo.api.devcode.gethired.id/activity-groups/${activityId}`, { title: activityTitle })
    console.log(data);
    setActivityTitle(data.title)
    setEditActivityTitle(false)
  }

  const editIcon = <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.9998H8L18.5 9.49981C19.0304 8.96938 19.3284 8.24996 19.3284 7.49981C19.3284 6.74967 19.0304 6.03025 18.5 5.49981C17.9696 4.96938 17.2501 4.67139 16.5 4.67139C15.7499 4.67139 15.0304 4.96938 14.5 5.49981L4 15.9998V19.9998Z" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.5 6.49982L17.5 10.4998" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>

  return (
    <MainLayout>
      <div className="flex items-center justify-between py-10">
        <div className="flex items-center gap-3">
          <BackButton/>
          {!editActivityTitle 
            ? <PageTitle onClick={() => setEditActivityTitle(true)} dataCy="todo-title">
                {activityTitle}
              </PageTitle>
            : <input 
                onBlur={updateTitleActivity} 
                onInput={(e) => setActivityTitle(e.target.value)} 
                type="text"
                autoFocus
                className="text-3xl font-bold bg-transparent focus:outline-none focus:border-b-2 border-black"
                value={activityTitle} 
              />
          }
          <button onClick={editActivityTitle ? updateTitleActivity : () => setEditActivityTitle(true)} data-cy="todo-title-edit-button">
            {editIcon}
          </button>
        </div>
        <div className="flex items-center gap-5">
          <TodoSorter selected={sortType} getValue={changeSortBy}/>
          <AddButton onClick={() => setOpenFormModal(true)} dataCy="todo-add-button" />
        </div>
      </div>
      {
        todos.length
        ? <div className="grid grid-cols-1 gap-3 pb-10">
            {todos.map(todo => (
              <TodoItem 
                key={todo.id}
                todo={todo}
                onDelete={openDeleteModal}
                onChangeIsActive={() => 
                  handleChangeIsActive(todo.id, { is_active: !todo.is_active})
                }
              />
            ))}  
          </div>
        :  <div data-cy="todo-empty-state" className="text-center">
            <Image src="/images/TodoEmptyState.svg" width="500" height="500" alt="todo empty state" />
          </div>  
      }  

    <FormModal
      isOpen={openFormModal}
      onClose={() => setOpenFormModal(false)}
      onSubmitTodo={createTodo}
    />

    {
      !!deleteTodoData &&
      <ModalDelete
        data={deleteTodoData}
        onClose={() => setDeleteTodoData(null)}
        handleDelete={handleDeleteTodo}
        
      />
    }

    <Alert 
      message={alertMessage}
      onClose={() => setAlertMessage('')}
    />
    </MainLayout>
  )
}

export default DetailItem
