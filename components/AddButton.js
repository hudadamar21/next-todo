function AddButton({ onClick, dataCy }) {
  return <button onClick={onClick} className="flex items-center gap-3 px-8 py-3 text-xl font-semibold rounded-full bg-primary text-white" data-cy={dataCy}>
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="white" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
    Tambah
  </button>
}

export default AddButton