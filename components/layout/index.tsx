import Header from './components/header'
import useBannerTranslate from "components/hooks/useBannerTranslate";
import { chakra } from "@chakra-ui/react";

const Layout:React.FC<{children: React.ReactNode}> = ({children}) => {

  return (
    <>
    <Header  />
    <div className='main-container'>
      {children}
    </div>
    </>
  )
}

export default Layout