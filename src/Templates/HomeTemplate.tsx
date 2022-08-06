//tsrfce
import FooterHome from 'Components/FooterHome/FooterHome'
import { Outlet } from 'react-router-dom'
import HeaderHome from 'Components/HeaderHome/HeaderHome'


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