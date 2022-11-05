import MaintenancePage from "components/templates/MaintenancePage";

export default function Home() {
  return (
    <MaintenancePage />
  )
}

export { authCheck as getServerSideProps } from 'utils/getServerSideProps'
