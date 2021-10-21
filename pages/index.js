import axios from "axios"
import { useState } from "react"
import Image from 'next/image'
import Link from "next/link";
import { Dialog } from '@headlessui/react'

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
            <Link href={`/detail/${ac.id}`} passHref data-cy="activity-item" key={ac.id} >
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
            </Link>
          ))
          : <div data-cy="activity-empty-state" className="text-center">
              <Image src="/images/ActivityEmptyState.svg" width="500" height="500" alt="activity empty state" />
            </div> 
        }
      </div>
    </div>

    {
      deleteActivityData && (
        <Dialog open={!!deleteActivityData} onClose={() => setDeleteActivityData(null)} className="fixed inset-0 z-50 grid place-items-center" data-cy="modal-delete">
          <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50 grid place-items-center"/>

          <div className="relative grid place-items-center bg-white p-12 pt-16 rounded-2xl z-20">
            <div data-cy="modal-delete-icon">
              <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M42 52.5V52.535M42 31.5V38.5V31.5Z" stroke="#ED4C5C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5002 66.5012H66.5002C67.6423 66.4932 68.765 66.2059 69.7705 65.6643C70.7761 65.1227 71.6338 64.3433 72.2689 63.3941C72.904 62.4449 73.2972 61.3546 73.4142 60.2186C73.5312 59.0825 73.3685 57.935 72.9402 56.8762L48.0902 14.0012C47.4848 12.9071 46.5975 11.9952 45.5203 11.3601C44.4432 10.725 43.2156 10.3901 41.9652 10.3901C40.7148 10.3901 39.4872 10.725 38.41 11.3601C37.3329 11.9952 36.4455 12.9071 35.8402 14.0012L10.9902 56.8762C10.57 57.9108 10.4033 59.0308 10.5042 60.1428C10.6051 61.2549 10.9705 62.3266 11.57 63.2687C12.1694 64.2107 12.9856 64.9956 13.9502 65.558C14.9149 66.1203 16.0001 66.4438 17.1152 66.5012" stroke="#ED4C5C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <Dialog.Title className="text-xl w-full text-center py-10" data-cy="modal-delete-title">
              Apakah anda yakin menghapus activity <span className="font-bold">“{deleteActivityData.title}”?</span> 
            </Dialog.Title>

            <div className="grid grid-flow-col gap-5 w-full px-10">
              <button
                onClick={() => setDeleteActivityData(null)}
                className="bg-gray-100 px-6 py-3 rounded-full text-white flex justify-center items-center gap-2 font-medium text-lg transition w-full focus:ring-4 ring-gray-200 text-black/80 " 
                data-cy="modal-delete-cancel-button"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteActivity}
                className="bg-red-500 px-6 py-3 rounded-full text-white flex justify-center items-center gap-2 font-medium text-lg transition w-full bg-primary-red focus:ring-4 ring-red-500/30" 
                data-cy="modal-delete-confirm-button"
              >
                Hapus
              </button>
            </div>
          </div>
        </Dialog>
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
