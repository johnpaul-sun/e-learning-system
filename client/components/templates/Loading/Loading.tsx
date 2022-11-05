import React from "react"; 
import moduleStyle from './Loading.module.css';

function Loading() {
  return (
    <div className='h-screen w-screen flex items-center justify-center fixed bg-slate-600 z-30' >
      <div className={`${moduleStyle.ldsRipple} z-60`}><div></div><div></div></div>
      <div className={`bg-background-overlay h-screen w-screen absolute z-40 opacity-30`}></div>
    </div>
  );
}

export default Loading;
