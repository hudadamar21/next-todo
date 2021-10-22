import axios from "axios"
import { useState } from "react"
import Image from 'next/image'
import dynamic from 'next/dynamic'

const AppHeader = dynamic(() => import('../components/AppHeader'))
const AcCard = dynamic(() => import('../components/AcCard'))
const ModalDelete = dynamic(() => import('../components/ModalDelete'))
const Alert = dynamic(() => import('../components/Alert'))

export async function getServerSideProps() {
  const url = "https://todo.api.devcode.gethired.id/activity-groups?email=hudadamar21%40gmail.com"
  const { data } = await axios.get(url)
  return {  
    props: {
      data: data.data
    }
  }
}

export default function Home({ data = [] }) {
  const [activity, setActivity ] = useState(data)

  const [ deleteActivityData, setDeleteActivityData] = useState(null)
  const [ alertMessage, setAlertMessage] = useState(null)

  const getActivity = async () => {
    const res = await axios.get(
      "https://todo.api.devcode.gethired.id/activity-groups?email=hudadamar21%40gmail.com"
    )
    setActivity(res.data.data)
  }

  const createActivity = async () => {
    await axios.post(
      "https://todo.api.devcode.gethired.id/activity-groups", 
      { title: 'New Activity', email: 'hudadamar21@gmail.com' }
    )
    getActivity()
  }
  
  const openDeleteModal = (e, ac) => {
    e.preventDefault()
    e.stopPropagation()
    setDeleteActivityData(ac)
  }

  const handleDeleteActivity = async () => {
    await axios.delete(
      `https://todo.api.devcode.gethired.id/activity-groups/${deleteActivityData.id}`
    )
    getActivity()
    setDeleteActivityData(null)
    setAlertMessage('Activity berhasil dihapus')
  }

  return (
   <>
    <AppHeader/>
    <div className="container mx-auto">
      <div className="flex items-center justify-between py-10">
        <h1 className="text-3xl font-bold" data-cy="activity-title">
          Activity
        </h1>
        <button onClick={createActivity} className="px-8 py-3 text-lg font-semibold rounded-full bg-primary text-white" data-cy="activity-add-button">
          + Tambah
        </button>
      </div>
      {
        activity.length === 0
        ? <div className="text-center">
            <Image src="/images/ActivityEmptyState.svg" width="500" height="500" alt="activity empty state" data-cy="activity-empty-state"/>
          </div> 
        : <div className="grid gap-3 pb-10 grid-cols-4">
            {activity.map(ac => (
              <AcCard key={ac.id} {...ac} onDelete={(e) => openDeleteModal(e, ac)}/>
            ))}
          </div>
      }
    </div>

    {
      deleteActivityData &&
      <ModalDelete
        data={deleteActivityData}
        onClose={() => setDeleteActivityData(null)}
        handleDelete={handleDeleteActivity}
      />
    }

    <Alert 
      message={alertMessage}
      onClose={() => setAlertMessage('')}
    />
   </>
  )
}
