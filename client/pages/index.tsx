import Button from "components/atoms/Button";
import { useAuthMethods } from "hooks/authMethods";
import MaintenancePage from "components/templates/MaintenancePage";

export default function Home() {
  const { handleAuthLogout } = useAuthMethods();
  return (
    <div>
      <MaintenancePage />
      <Button onClick={handleAuthLogout} value="Temporary Logout" className="absolute top-10 right-10 max-w-[150px]"/>
    </div>
  )
}

export { authCheck as getServerSideProps } from 'utils/getServerSideProps'
