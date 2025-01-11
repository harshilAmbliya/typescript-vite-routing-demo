import { Outlet } from 'react-router-dom'

type Props = {  }

const DashboardLayout = ({  }: Props) => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default DashboardLayout