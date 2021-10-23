import axios from "axios"
import { useEffect, useState } from "react"
import Image from 'next/image'
import dynamic from 'next/dynamic'

const MainLayout = dynamic(() => import('../layouts/MainLayout'))
const PageTitle = dynamic(() => import('../components/PageTitle'))
const AddButton = dynamic(() => import('../components/AddButton'))
const AcCard = dynamic(() => import('../components/AcCard'))
const ModalDelete = dynamic(() => import('../components/ModalDelete'))
const Alert = dynamic(() => import('../components/Alert'))

Home.getInitialProps = async () => {
  const { data } = await axios.get(
    "https://todo.api.devcode.gethired.id/activity-groups?email=hudadamar21%40gmail.com"
  )
  return { data: data.data }
}

export default function Home({ data = [] }) {
  const [ load, setLoad ] = useState(false)
  const [activity, setActivity ] = useState(data)
  const [ deleteActivityData, setDeleteActivityData] = useState(null)
  const [ alertMessage, setAlertMessage] = useState(null)

  useEffect(() => {
    setLoad(true)
  }, [])

  const getActivity = async () => {
    const res = await axios.get(
      "https://todo.api.devcode.gethired.id/activity-groups?email=hudadamar21%40gmail.com"
    )
    setActivity(res.data.data)
  }

  const createActivity = async () => {
    const data = await axios.post(
      "https://todo.api.devcode.gethired.id/activity-groups", { 
      title: 'New Activity', 
      email: 'hudadamar21@gmail.com' 
    })
    setActivity(val => [data.data, ...val])
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

  return load && (
    <MainLayout>
      <div className="flex items-center justify-between py-10">
        <PageTitle dataCy="activity-title">Activity</PageTitle>
        <AddButton onClick={createActivity} dataCy="activity-add-button" />
      </div>
      {
        activity.length
        ? <div className="grid gap-3 pb-10 grid-cols-4">
            {activity.map((ac, index) => (
              <AcCard 
                key={ac.id} 
                index={index} 
                onDelete={(e) => openDeleteModal(e, ac)}
                {...ac} 
              />
            ))}
          </div>
        : <div className="text-center" data-cy="activity-empty-state">
            <Image src="/images/ActivityEmptyState.svg" width="500" height="500" alt="activity empty state" />
          </div> 
      }

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
    </MainLayout>
  )
}
