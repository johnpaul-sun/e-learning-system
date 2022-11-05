import Router from 'next/router';
const redirect = (path:string)=>{
  return Router.push(path);
}

export default redirect;
