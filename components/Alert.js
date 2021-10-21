import { Dialog } from '@headlessui/react'
import Image from 'next/image'

function Alert({ message , onClose}) {
  return message &&
  <Dialog open={!!message} onClose={onClose} className="fixed inset-0 z-10 grid place-items-center">
    <Dialog.Overlay className="fixed z-10 inset-0 grid place-items-center bg-black/50"/>
    <div data-cy="modal-information" className="relative z-20 flex items-center gap-5 w-[500px] py-4 px-6 rounded-xl shadow-lg bg-white">
      <Image src="/icons/alert.svg" width="25" height="25" data-cy="modal-information-icon" alt="alert" />
      <Dialog.Title data-cy="modal-information-title">{message}</Dialog.Title>
    </div>
  </Dialog>
}

export default Alert