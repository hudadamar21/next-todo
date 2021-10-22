function PageTitle({ onClick, dataCy, children}) {
  return <h1 onClick={onClick} className="text-4xl font-bold" data-cy={dataCy}>
    { children }
  </h1>
}

export default PageTitle