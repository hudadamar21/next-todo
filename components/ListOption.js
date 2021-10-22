import { Listbox } from "@headlessui/react";

function ListOption({ lists, data, onChange }) {

  return (
    <Listbox value={data} onChange={onChange} as="div" className="relative">
      <Listbox.Button className="px-6 py-3 border text-left w-full rounded-lg" data-cy="modal-add-priority-dropdown">{data}</Listbox.Button>
      <Listbox.Options className="absolute top-full w-full bg-white rounded-lg shadow-lg border">
        {lists.map((item) => (  
          <Listbox.Option
            as="button"
            key={item.id}
            value={item.value}
            className="px-6 py-3 hover:bg-primary/10 block w-full text-left"
            data-cy="modal-add-priority-item"
          >
            {item.value}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default ListOption