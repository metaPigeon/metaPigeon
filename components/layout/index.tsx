import Header from './components/header'
interface routerBanner {
  title: string,
  date: string
}

const Layout:React.FC<{children: React.ReactNode, routerBanner:routerBanner}> = ({children, routerBanner}) => {

  return (
    <>
    <Header routerBanner={routerBanner}  />
    <div className='main-container'>
      {children}
    </div>
    </>
  )
}

export default Layout