export class File {
  constructor(){
    
  }
  async src( args, callback ){
    let path
    if(typeof args === 'string'){
      path = args;
    }
    const res = await fetch(path);
    const response = res.json();
    if (typeof callback === 'function')
      callback(response);
    cache.put(path, response);
    return response;
  }
}