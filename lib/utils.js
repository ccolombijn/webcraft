export const utils = (()=>{
  return{
    type( args, callback ) {
      if( typeof args === 'string' && typeof callback === 'function' ){
        callback(args);
      }else if( typeof args === 'object' && typeof callback === 'function' ){
        const keyVal = Object.getOwnPropertyNames(args)[0];
        if(typeof args[keyVal] === keyVal){
          callback(args[keyVal]);
        }
      }else if( typeof callback === 'undefined' ){
        return typeof args
      }
    },
    str( args, callback ){
      
    },
    arr(){

    },
    obj(){  

    }
  }
})()