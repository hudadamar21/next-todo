function AddButton({ onClick, dataCy }) {
  return <button onClick={onClick} className="px-8 py-3 text-xl font-semibold rounded-full bg-primary text-white" data-cy={dataCy}>+ Tambah</button>
}

export default AddButton