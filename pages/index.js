import axios from "axios"
import React, { useState } from "react"
import Link from 'next/link'

export async function getStaticProps() {

  const url = "https://todo.api.devcode.gethired.id/activity-groups?email=hudadamar21%40gmail.com"

  const { data } = await axios.get(url)
  return {
    props: {
      data: data.data
    },
  }
}


const DeleteButton = React.forwardRef(({onClick}, ref) => {
  return (
    <button ref={ref} onClick={onClick} data-cy="activity-item-delete-button" className="bg-red-500 text-white px-2 py-1 rounded-md">
      delete
    </button>
  )
})

export default function Home({ data }) {
  const [activity, setActivity ] = useState(data)

  const [ deleteActivityId, setDeleteActivityId] = useState(null)

  const createActivity = async () => {
    const { data } = await axios.post(
      "https://todo.api.devcode.gethired.id/activity-groups", 
      { title: 'New Activity', email: 'hudadamar21@gmail.com' }
    )
    setActivity(val => [data, ...val])
  }

  const openDeleteModal = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    setDeleteActivityId(id)
  }

  const handleDeleteActivity = async (e) => {
    await axios.delete(
      `https://todo.api.devcode.gethired.id/activity-groups/${deleteActivityId}`
    )
    const newAc = activity.filter(ac => ac.id !== deleteActivityId)
    setActivity(newAc)
    setDeleteActivityId(null)
  }

  return (
   <div className="bg-gray-100">
     <nav data-cy="header-background" className="bg-blue-400 ">
      <h1 data-cy="header-title" className="container mx-auto text-white py-5 font-bold text-2xl">TO DO LIST APP</h1>
     </nav>
     <div className="container mx-auto">
       <div className="flex items-center justify-between py-10">
         <h2 data-cy="activity-title" className="text-3xl font-bold">Activity</h2>
         <button onClick={createActivity} data-cy="activity-add-button" className="px-4 py-2 rounded-lg bg-blue-400 text-white">
           Tambah
         </button>
       </div>
       {
         data.length === 0
         ?  <div data-cy="activity-empty-state">
              Empty
            </div>
         :  <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-3 pb-10">
           {
             activity.map(ac => (
              <Link href={`/detail/${ac.id}`} passHref key={ac.id}>
                <div data-cy="activity-item" className="bg-white p-5 rounded-xl shadow h-56 flex flex-col justify-between mb-2">
                  <h3 data-cy="activity-item-title">{ac.title}</h3>
                  <div className="flex items-center justify-between">
                    <span data-cy="activity-item-date">{new Date(ac.created_at).toDateString()}</span>
                    <DeleteButton onClick={(e) => openDeleteModal(e, ac.id)} />
                  </div>
                </div>
              </Link>
            ))
           }
         </div>
       }  
     </div>


     {
       deleteActivityId && (
        <div onClick={e => {
          e.stopPropagation()
          setDeleteActivityId(null)
        }} data-cy="modal-delete" className="fixed inset-0 z-50 bg-black/40 grid place-items-center">
          <div onClick={e => e.stopPropagation()} className="w-[500px] p-10 grid place-items-center gap-10 bg-white shadow-lg rounded-2xl">
            <div data-cy="modal-delete-icon">X</div>
            <p className="text-xl w-full text-center" data-cy="modal-delete-title">
              Apakah anda yakin menghapus activity <span className="font-bold">“New Activity”?</span> 
            </p>
            <div className="flex items-center justify-center gap-5 w-full px-10">
              <button
                onClick={() => setDeleteActivityId(null)}
                className="bg-gray-100 px-6 py-3 rounded-full text-white flex justify-center items-center gap-2 font-medium text-lg transition w-1/2 focus:ring-4 ring-gray-200 text-black/80 " 
                data-cy="modal-delete-cancel-button"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteActivity}
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
   </div>
  )
}
