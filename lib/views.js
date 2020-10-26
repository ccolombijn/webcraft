import {DOM} from './dom.js'
import {File} from './files.js'
export class View {
  constructor(){
    this.views =new Array([]);
  }
  
  add( args, callback ){
   
    const viewContent = new File;
    
    if( typeof args === 'object' ){

    }else if( typeof args === 'string' && callback === 'object' ){
      viewContent.src('views/'+args+'.html').then((content)=>{
        const inserts = callback;
        const props = Object.getOwnPropertyNames(inserts);
        props.forEach((prop)=>{

        })
        this.views.push({
          view : args,
          content : content
        });
      })
    }
  }
  get(){

  }
}