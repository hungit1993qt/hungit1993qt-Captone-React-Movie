//tsrfce
import FooterHome from 'Components/FooterHome/FooterHome'
import { Outlet } from 'react-router-dom'
import HeaderHome from 'Components/HeaderHome/HeaderHome'
import Loading from "Pages/Loading/Loading";



type Props = {}

function HomeTemplate({}: Props) {
  
  return (
    <div>
        <HeaderHome />
        <Outlet />
        <FooterHome />
    </div>
  )
}

export default HomeTemplate