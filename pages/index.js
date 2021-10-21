import axios from "axios"
import { useState } from "react"
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from "next/router";
import ModalDelete from "../components/ModalDelete";
import Alert from "../components/Alert";

export async function getStaticProps() {
  const url = "https://todo.api.devcode.gethired.id/activity-groups?email=hudadamar21%40gmail.com"
  const { data } = await axios.get(url)
  return {
    props: {
      data: data ? data.data : []
    },
    revalidate: 1, 
  }
}

export default function Home({ data = [] }) {
  const [activity, setActivity ] = useState(data)
  const [ deleteActivityData, setDeleteActivityData] = useState(null)
  const [ alertMessage, setAlertMessage] = useState(null)
  const router = useRouter()

  const formatDate = (date) => {
    const list = ['Januari', 'Februari', 'Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
    const tanggal = new Date(date).getDate()
    const bulan = new Date(date).getUTCMonth()
    const tahun = new Date(date).getFullYear()

    return `${tanggal} ${list[bulan]} ${tahun}`
  }

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

  const navigateTo = (id) => {
    router.push(`/detail/${id}`)
  }

  return (
   <>
    <header data-cy="header-background" className="bg-primary">
      <h2 data-cy="header-title" className="container mx-auto text-white py-7 font-bold text-2xl">
        TO DO LIST APP
      </h2>
    </header>
    <div className="container mx-auto">
      <div className="flex items-center justify-between py-10">
        <h1 data-cy="activity-title" className="text-3xl font-bold">
          Activity
        </h1>
        <button data-cy="activity-add-button" onClick={createActivity} className="px-8 py-3 text-lg font-semibold rounded-full bg-primary text-white">
          + Tambah
        </button>
      </div>
      <div className={`grid gap-3 pb-10 ${activity.length ? 'grid-cols-4' : ''}`}>
        {
          activity.length ?
          activity.map(ac => (
            <div onClick={() => navigateTo(ac.id)} passHref data-cy="activity-item" key={ac.id} >
              <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 h-56 flex flex-col justify-between mb-2 cursor-pointer ">
                <div data-cy="activity-item-title" className="text-xl font-bold">{ac.title}</div>
                <div className="flex items-center justify-between">
                  <div data-cy="activity-item-date">
                    {formatDate(ac.created_at)}
                  </div>
                  <button onClick={(e) => openDeleteModal(e, ac)}data-cy="activity-item-delete-button" >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 7H20" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 11V17" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 11V17" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
          : <div data-cy="activity-empty-state" className="text-center">
              <Image src="/images/ActivityEmptyState.svg" width="500" height="500" alt="activity empty state" />
            </div> 
        }
      </div>
    </div>

    <ModalDelete
      data={deleteActivityData}
      onClose={() => setDeleteActivityData(null)}
      handleDelete={handleDeleteActivity}
    />

    <Alert 
      message={alertMessage}
      onClose={() => setAlertMessage('')}
    />

   </>
  )
}
