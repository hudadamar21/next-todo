import axios from "axios"
import { useState } from "react"
import Image from 'next/image'
import dynamic from 'next/dynamic'

const MainLayout = dynamic(
  () => import('../layouts/MainLayout'),
  { loading: () => <p>loading...</p>, ssr: false }
)
const PageTitle = dynamic(() => import('../components/PageTitle'), { ssr: false })
const AddButton = dynamic(() => import('../components/AddButton'), { ssr: false })
const AcCard = dynamic(() => import('../components/AcCard'), { ssr: false })
const ModalDelete = dynamic(() => import('../components/ModalDelete'))
const Alert = dynamic(() => import('../components/Alert'))

Home.getInitialProps = async () => {
  const url = "https://todo.api.devcode.gethired.id/activity-groups?email=hudadamar21%40gmail.com"
  const { data } = await axios.get(url)
  return { data: data.data }
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
    await axios.post("https://todo.api.devcode.gethired.id/activity-groups", { 
      title: 'New Activity', 
      email: 'hudadamar21@gmail.com' 
    })
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

  const plusIcon = <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="white" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>

  return (
    <MainLayout
      header={<>
        <PageTitle onClick={() => setEditActivityTitle(true)} dataCy="activity-title">
          Activity
        </PageTitle>
        <AddButton onClick={createActivity} dataCy="activity-add-button" />
      </>}
    >
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
