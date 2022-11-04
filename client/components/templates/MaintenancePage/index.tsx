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
        <button
          type="submit" 
          onClick={()=>{
            window.location.pathname = "/"
          }}
          className={`
            inline-flex w-[30%] justify-center rounded-sm border border-transparent bg-els-10 mt-5
            py-1.5 px-4 text-md font-medium text-white shadow-sm focus:outline-none disabled:cursor-not-allowed
            disabled:opacity-50 hover:bg-els-10/70 disabled:hover:bg-opacity-50 active:scale-95 
          `}>
          Go Home
        </button>
      </main>
    </div>
  );
};

export default MaintenancePage;
