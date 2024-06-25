import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Fragment } from 'react'
import { Transition } from '@headlessui/react'

export default function SeeMoreDialog({ isOpen, setIsOpen }: any) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="max-w-lg space-y-4 border bg-white p-12 shadow-lg transform transition-all">
                <DialogTitle className="font-bold">dfaf</DialogTitle>
                <Dialog.Description>fdafdaf</Dialog.Description>
                <p>dkfjakljkflda</p>
                <div className="flex gap-4">
                  <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setIsOpen(false)}>Cancel</button>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
