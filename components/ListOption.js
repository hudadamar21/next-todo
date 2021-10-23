import dynamic from "next/dynamic";
import { Listbox } from "@headlessui/react";
const PriorityIndicator = dynamic(() => import('./PriorityIndicator'))

function ListOption({ lists, data, onChange }) {

  return (
    <Listbox value={data} onChange={onChange} as="div" className="relative">
      <Listbox.Button className="flex items-center gap-2 capitalize px-6 py-3 border text-left w-full rounded-lg" data-cy="modal-add-priority-dropdown">
        <PriorityIndicator priority={data} />
        {data.replaceAll('-', ' ')}
      </Listbox.Button>
      <Listbox.Options className="absolute top-full w-full bg-white rounded-lg shadow-lg border">
        {lists.map((item) => (  
          <Listbox.Option
            as="button"
            key={item.id}
            value={item.value}
            className="flex items-center gap-2 px-6 py-3 hover:bg-primary/10 w-full text-left capitalize"
            data-cy="modal-add-priority-item"
          >
            <PriorityIndicator priority={item.value} />
            {item.value.replaceAll('-', ' ')}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default ListOption