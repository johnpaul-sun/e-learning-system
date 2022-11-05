import MaintenancePage from "components/templates/MaintenancePage";
import React from "react";

const ForgotPassword = () => {
  return <MaintenancePage />;
};

export { authCheck as getServerSideProps } from 'utils/getServerSideProps'
export default ForgotPassword;
