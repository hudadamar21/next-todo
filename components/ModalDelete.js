import { Dialog } from '@headlessui/react'

function ModalDelete({ data, handleDelete, onClose }) {
  return (
    <Dialog open={!!data} onClose={onClose} className="fixed inset-0 z-50 grid place-items-center" >
      <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50 grid place-items-center"/>
      <div className="relative grid place-items-center bg-white p-12 pt-16 rounded-2xl z-20" data-cy="modal-delete">
        <div data-cy="modal-delete-icon">
          <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M42 52.5V52.535M42 31.5V38.5V31.5Z" stroke="#ED4C5C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.5002 66.5012H66.5002C67.6423 66.4932 68.765 66.2059 69.7705 65.6643C70.7761 65.1227 71.6338 64.3433 72.2689 63.3941C72.904 62.4449 73.2972 61.3546 73.4142 60.2186C73.5312 59.0825 73.3685 57.935 72.9402 56.8762L48.0902 14.0012C47.4848 12.9071 46.5975 11.9952 45.5203 11.3601C44.4432 10.725 43.2156 10.3901 41.9652 10.3901C40.7148 10.3901 39.4872 10.725 38.41 11.3601C37.3329 11.9952 36.4455 12.9071 35.8402 14.0012L10.9902 56.8762C10.57 57.9108 10.4033 59.0308 10.5042 60.1428C10.6051 61.2549 10.9705 62.3266 11.57 63.2687C12.1694 64.2107 12.9856 64.9956 13.9502 65.558C14.9149 66.1203 16.0001 66.4438 17.1152 66.5012" stroke="#ED4C5C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <Dialog.Title className="text-xl w-full text-center py-10" data-cy="modal-delete-title">
          Apakah anda yakin menghapus activity
          <span className="font-bold"> “{data.title}”?</span> 
        </Dialog.Title>

        <div className="grid grid-flow-col gap-5 w-full px-10">
          <button
            onClick={onClose}
            className="bg-gray-100 px-6 py-3 rounded-full text-white flex justify-center items-center gap-2 font-medium text-lg transition w-full focus:ring-4 ring-gray-200 text-black/80 " 
            data-cy="modal-delete-cancel-button"
          >
            Batal
          </button>
          <button
            onClick={handleDelete}
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

export default ModalDelete