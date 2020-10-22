/*
* assets/js/dom.js
*/
'use strict';
export const DOM = ((args)=>{
  /** Creates new element in the DOM
   * @param {*} args 
   * @param {*} callback 
   * @example
DOM.create(['div',{id : 'myDiv'},'content of myDiv']);
DOM.create(['table',{id : 'myTable',class : 'table'},
    ['thead',
        ['tr',['th','Header#1'],['th','Header#2'],['th','Header#3']]
    ],
    ['tbody',
        ['tr',['td','Column#1'],['td','Column#2'],['td','Column#3']]
    ]
]);
*/
  let DOMelements = document.getElementsByTagName("*");
  /**
   * 
   * @param {*} args 
   * @param {*} callback 
   */
  function create( args, callback ){
    const isArray = ( arr ) => Array.isArray(arr);
    let name = args[0],
        attributes = args[1],
        element = document.createElement( name ),
        start = 1;
    if ( !isArray( args ) ) 
      return create.call( this, Array.prototype.slice.call( arguments ) );
    if ( typeof attributes === 'object' && attributes !== null && !isArray( attributes ) ) {
      for ( let attribute in attributes ) 
        element.setAttribute( attribute ,attributes[ attribute ] );
      start = 2;
    }
    for ( let index = start; index < name.length; index++ ) {
      if( isArray( name[ index ] ) ){
        element.appendChild(DOM.create( name[ index ] ) );
      } else {
        element.appendChild( document.createTextNode( name[ index ] ) );
      }
    }
    if( typeof callback === 'function') callback(element);
    DOMelements = document.getElementsByTagName("*");
    return element;
  }
  /**
   * 
   * @param {*} args 
   * @param {*} callback 
   * @example
   * DOM.get('#myElement')
   */
  function get( args, callback ){
    let element;
    if( typeof args === 'string' ){
      if( args.includes('#') || args.includes('.')){
        element = document.querySelector( args );
      }
    }else if( typeof args === 'object' && !isElement(args) ){
      if(args.el){
        if( typeof args.el === 'string' ){
          if( args.el.includes('#') || args.el.includes('.')){
            element = document.querySelector( args.el );
          }
        }
      }
    }
    if( typeof callback === 'function' ) callback();
    return element;
  }
  /**
   * 
   * @param {*} args 
   * @param {*} callback 
   */
  function set( args, callback ){

  }
  /**
   * 
   * @param {*} args 
   * @param {*} callback 
   * @example 
   * DOM.shadow({
   *  component : 'my-component',
   *  template : `<div></div`,
   *  mount(){
   *    
   *  }
   * })   
   * */
  function shadow( args, callback ){
    function attach( component, templateHTML, mount, unmount ){
      if( component.includes('-') ){
        const template = document.createElement('template');
        template.innerHTML = templateHTML;
        window.customElements.define( component, class extends HTMLElement {
          constructor(){
            super();
            this.attachShadow( { mode : 'open' } );
            this.shadowRoot.appendChild( template.content.cloneNode( true ) );
          }
          connectedCallback() {
            const element = document.querySelector(component)
            if( typeof mount === 'function' ) mount(element);
          }
          disconnectedCallback() {
            if( typeof unmount === 'function' ) unmount();
          }
          attributeChangedCallback(attrName, oldVal, newVal) {
            
          }
        });
      }
    }
    if( typeof args === 'string' && typeof callback === 'string' ){
      attach( args, callback );
    } else if( typeof args === 'string' && typeof callback === 'undefined' ){
      fetch('components/'+args+'.html').then(function (response) {
        // The API call was successful!
        return response.text();
      }).then(function (html) {
        if(html.includes('<script>')){
          
          let script = html.split('<script>')[1].split('</script>')[0];
          script = eval('(()=>{'+script+'})()')
          callback = script.mount;
        }
        attach( args, html, callback );
      }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
      });
    } else if( typeof args === 'object' ){
      if( typeof args.template === 'string' && typeof args.component === 'string' && typeof args.mount === 'function' && typeof args.unmount === 'function' ) {
        attach( args.component, args.template, args.mount, args.unmount );
      }else if( typeof args.template === 'string' && typeof args.component === 'string' && typeof args.mount === 'function' ) {
        attach( args.component, args.template, args.mount );
      }else if( typeof args.template === 'string' && typeof args.component === 'string' ) {
        attach( args.component, args.template );
      }
    }
    //if( typeof callback === 'function' ) callback();
  }
  
  /**
   * Returns true if object is a DOM node
   * @param {*} object 
   */
  function isNode( object ){
    return (
      typeof Node === 'object' ? object instanceof Node : 
      object && typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'
    );
  }

  /**
   * Returns true if object is a DOM element
   * @param {*} object 
   */
  function isElement( object ){
    return (
      typeof HTMLElement === 'object' ? o instanceof HTMLElement : //DOM2
      object && typeof object === 'object' && object !== null && object.nodeType === 1 && typeof object.nodeName === 'string'
    );
  }

  function validHTML(element) {
    if(element)
      return document.createElement(element.toUpperCase()).toString()
  }
  
  for(let element in DOMelements){
    if(typeof DOMelements[element] === 'object'){
      if(validHTML(DOMelements[element].tagName) === '[object HTMLElement]'){
        console.log(DOMelements[element].tagName)
      }
    }
  }
  return {
    create : create,
    get : get,
    shadow : shadow
  };
})();
