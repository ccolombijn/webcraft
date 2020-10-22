import File from './file.js'
export const config = (()=>{
  const file = new File;
  return file.src('/app/config.json');
})();