import dynamic from 'next/dynamic'
const AppHeader = dynamic(() => import('../components/AppHeader'))

function MainLayout({ children, header }) {
 return (
  <section id="dashboard">
    <AppHeader/>
    <main className="container mx-auto">
      <div className="flex items-center justify-between py-10">
        { header }
      </div>
      { children }
    </main>
  </section>
 ) 
}

export default MainLayout