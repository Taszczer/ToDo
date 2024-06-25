import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Fragment } from 'react'
import { Transition } from '@headlessui/react'

export default function SeeMoreDialog({ isOpen, setIsOpen, title, description, time }: any) {

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
              <Dialog.Panel className=" space-y-4 rounded-xl bg-[#F9C784] max-w-[300px] flex flex-col justify-between border-[#FCAF58] border-b-8 min-h-[400px] min-w-[300px] p-12 shadow-2xl text-white transform transition-all">
                <div>
                  <DialogTitle className="font-bold text-2xl">{title}</DialogTitle>
                  <Dialog.Description className="font-medium text-md mt-1">{description}</Dialog.Description>
                </div>
                <div className='flex justify-between'>
                  <p className='font-bold'>{time}</p>
                  <div className="flex gap-4">
                    <button className="" onClick={() => setIsOpen(false)}>Close</button>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
