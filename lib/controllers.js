export class Controller {
  constructor(){
    this.instance
    this.method 
    this.args
    this.callback
  }
  /**
   * 
   * @param {String} args 
   * @param {Function} callback 
   */
  add( args = String, callback = ()=>{} ){
      const controllerName = args.includes('@') ? args.split('@')[0] : args;
      const controllerImport = import(`./controllers/${controllerName}.js`);
      const controllerMethod = args.includes('@') ? args.split('@')[1] : undefined;
      const controllerObj = { controllerName : controllerName, controllerMethod : controllerMethod}
      const controllerInstance = new controllerImport;
      
      this.instance = controllerInstance;
      if(controllerMethod)
        this.method = controllerMethod;
      this.args = args;
      this.callback = callback;
      return controllerInstance
        
      
  }
  load(){
    if(this.instance){
      if(this.method){
        this.instance[this.method]( this.args, this.callback)
      }else{
        this.instance( this.args, this.callback)
      }
    }
  }

}