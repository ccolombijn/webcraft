export class File {
  constructor(){
    
  }
  
  async src( args, callback ){
    let path
    if(typeof args === 'string'){
      path = args;
    }
   
    
    const response = await fetch(path);
    return response;
    
    //cache.put(path, response);
    
  }
  
}