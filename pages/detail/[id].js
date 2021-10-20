// export async function getServerSideProps() {

// }

function DetailItem({ data = []}) {

  const openCreateModal = () => {
    
  }

  return (
    <>
     <nav data-cy="header-background" className="bg-blue-400 ">
      <h1 data-cy="header-title" className="container mx-auto text-white py-5 font-bold text-2xl">
        TO DO LIST APP
      </h1>
     </nav>
     <div className="container mx-auto">
       <div className="flex items-center justify-between py-10">
         <h2 data-cy="activity-title" className="text-3xl font-bold">Activity</h2>
         <button onClick={openCreateModal} data-cy="activity-add-button" className="px-4 py-2 rounded-lg bg-blue-400 text-white">
           Tambah
         </button>
       </div>
       {
         data.length === 0
         ?  <div data-cy="activity-empty-state">
              Empty
            </div>
         :  <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-3 pb-10">
           
            </div>
       }  
     </div>
   </>
  )
}

export default DetailItem