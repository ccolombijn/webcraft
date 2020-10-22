import DOM from './dom.js'
import File from './file.js'
export class View {
  constructor(){

  }
  create( args, callback ){
    const viewElement = DOM.create(['div'])
    if( typeof args === 'object' ){

    }else if( typeof args === 'string' ){

    }
    return viewElement;
  }
}