function MainLayout({ children }) {
 return (
  <div >
    <header className="bg-primary w-full" data-cy="header-background">
      <div className="container">
        <h1 data-cy="header-title" className="py-8 text-white font-bold text-3xl" >
          TO DO LIST APP
        </h1>
      </div>
    </header>
    <main className="container">
      { children }
    </main>
  </div>
 )
}

export default MainLayout