function MainLayout({ children, header }) {
 return <>
  <header className="bg-primary py-10" data-cy="header-background">
    <h1 data-cy="header-title" className="container text-white font-bold text-4xl" >
      TO DO LIST APP
    </h1>
  </header>
  <main className="container mx-auto">
    <div className="flex items-center justify-between py-10">
      { header }
    </div>
    <section>
      { children }
    </section>
  </main>
 </>
}

export default MainLayout