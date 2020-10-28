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
  async add( args = String, callback = ()=>{} ){
      const controllerName = args.includes('@') ? args.split('@')[0] : args;
      const controllerMethod = args.includes('@') ? args.split('@')[1] : undefined;
      const controllerImportInstance = async ()=> await import(`./controllers/${controllerName}.js`);
      controllerImportInstance().then(res=>{
        const controllerInstance = new res[controllerName]
        this.instance = controllerInstance;
      });
          
      if(controllerMethod)
        this.method = controllerMethod;
      this.args = args;
      this.callback = callback;
      
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