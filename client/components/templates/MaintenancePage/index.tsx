/* eslint-disable @next/next/no-img-element */
import NextHead from "components/atoms/NextHead";
 
const MaintenancePage = () => {
  return (
    <div className="h-screen min-h-full flex justify-center items-center flex-col bg-slate-600">
      <NextHead title='ELS | Maintenance' />
      <main className='flex justify-center items-center flex-col max-w-[500px]'>
        <img src="/images/maintenance.png" alt="maintenance" />
        <h1 className='text-2xl text-slate-200 font-medium text-center'>This page is currently under maintenance.</h1>
        <span className='text-xl text-slate-400 font-medium mobile:text-lg'>Please comeback soon!</span>
      </main>
    </div>
  );
};

export default MaintenancePage;
