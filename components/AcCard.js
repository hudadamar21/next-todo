import { useRouter } from "next/router";

function AcCard ({ id, title, created_at, onDelete }) {
  const router = useRouter()

  const formatDate = (date) => {
    const list = ['Januari', 'Februari', 'Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
    const tanggal = new Date(date).getDate()
    const bulan = new Date(date).getUTCMonth()
    const tahun = new Date(date).getFullYear()

    return `${tanggal} ${list[bulan]} ${tahun}`
  }

  const navigateTo = () => {
    router.push(`/detail/${id}`)
  }

  const deleteIcon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 7H20" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11V17" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 11V17" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>

  return (
    <div onClick={navigateTo} className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 h-56 flex flex-col justify-between mb-2 cursor-pointer" data-cy="activity-item">
      <div>
        <div className="text-xl font-bold" data-cy="activity-item-title">
          {title}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <time data-cy="activity-item-date">
          {formatDate(created_at)}
        </time>
        <button onClick={onDelete} data-cy="activity-item-delete-button">
          {deleteIcon}
        </button>
      </div>
    </div>
  )
}

export default AcCard