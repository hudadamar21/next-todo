function MainLayout({ children }) {
 return (
  <div >
    <header className="bg-primary w-full" data-cy="header-background">
      <div className="container">
        <h1 data-cy="header-title">
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