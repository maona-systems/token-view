export default class RootElement extends HTMLElement{

    constructor(){

        console.debug("constructor");

        super();

        this.define_methods();

        this.prepare_element();
        
    };
    
    async connectedCallback(){

        console.debug("connectedCallback");
        
        // await this.register_service_worker();
        
        this.load_app_element();
        
    };

    define_methods(){

        const SELF=this;

        const WINDOW=window;

        SELF.load_app_element=function(){
        
            console.debug("load_app_element");
            
            SELF.shadowRoot.replaceChildren(document.createElement("app-element"));
            
        };
    
        SELF.register_service_worker=async function(){
    
            console.debug("register_service_worker");
            
            await navigator.serviceWorker.register("/service-worker.js",{scope:"/",type:"classic"});
    
            await navigator.serviceWorker.ready;
    
        };
        
        SELF.prepare_element=function(){
        
            console.debug("prepare_element");
            
            SELF.uid="RootElement";
    
            SELF.attachShadow({mode:"open"});

            document.body.style.margin=0;
            
            document.body.style.position="fixed";

        };

    };

};