export default class ModalElement extends CustomHTMLElement {

    constructor(){

        super();

        this.define_methods();

        this.prepare_element();

        this.setup_state();

    };
    
    async connectedCallback(){

        console.debug("connectedCallback");
        
        await this.setup_dom();
        
        this.setup_global_listeners();

    };

    define_methods(){

        console.debug("define_methods")

        const SELF=this;

        const WINDOW=globalThis;

        SELF.map_dom=function(){
            
            console.debug("map_dom");
            
            SELF.DOM["PANEL1"]=SELF.shadowRoot.querySelector("#PANEL1");

            Object.freeze(SELF.DOM);
            
        };
        
        SELF.prepare_element=function(){
            
            console.debug("prepare_element");
            
            SELF.uid="BlankElement";

            WINDOW.Elements[SELF.uid]=SELF;
            
            SELF.attachShadow({mode:"open"});

            SELF.DOM={};

            SELF.ENV={}

            SELF.$ENV={};

            SELF.PARAMS={};
            
            SELF.STATE={};

            SELF.$STATE={};
        
        };

        SELF.setup_dom=async function(){

            console.debug("setup_dom");

            await SELF.GetHTML("/elements/modal-element/modal-element.html");

            SELF.map_dom();

            SELF.setup_dom_listeners();

            SELF.update_dom();

        };

        SELF.setup_dom_listeners=function(){

            console.debug("setup_dom_listeners");

            SELF.DOM["PANEL1"].addEventListener("click",(data)=>{});

            const observer=new MutationObserver(function(data){

                const keyframes=[{opacity:0},{opacity:1},{opacity:1}];
                
                const options={duration:333,easing:"ease-in-out",iterations:2};

                data.forEach((record)=>{

                    record.addedNodes.forEach((node)=>{

                        node.scrollIntoView();

                        node.animate(keyframes,options);

                    });

                });

            });
            
            observer.observe(SELF.DOM["PANEL1"],{
                childList:true,
                subtree:true,
              });
            
        };

        SELF.setup_environment_variables=function(){

            console.debug("setup_environment_variables");

            Object.defineProperty(SELF.ENV,"environment_variable_one",{

                configurable:false,
                enumerable:true,
                get(){

                    return SELF.$ENV["environment_variable_one"];

                },
                set(data){

                    if(data.VALUE==this["environment_variable_one"]) return;
                    
                    SELF.$ENV["environment_variable_one"]=data.VALUE;
                        
                    if(data.UPDATE){

                        SELF.DOM["PANEL1"].innerHTML=`${this["environment_variable_one"]}`;

                    };

                }
                
            });

            Object.freeze(SELF.ENV);

            SELF.setup_environment_variables_backend();

        };

        SELF.setup_environment_variables_backend=function(){

            console.debug("setup_environment_variables_backend");

            SELF.$ENV["environment_variable_one"]=undefined;

            Object.seal(SELF.$ENV);
            
        };
        
        SELF.setup_global_listeners=function(){
            
            console.debug("setup_global_listeners");
            
            WINDOW.addEventListener("popstate",(data)=>{
                
                SELF.PullHistory();
                
            });
            
        };

        SELF.setup_parameters=function(){

            console.debug("define_parameters");
            
            SELF.PARAMS["parameter_one"]="default";

            Object.freeze(SELF.PARAMS);

        };

        SELF.setup_state=function(){

            SELF.setup_environment_variables();

            SELF.setup_runtime_variables();

            SELF.setup_parameters();

            SELF.PullHistory();

        };

        SELF.setup_runtime_variables=function(){

            console.debug("define_variables");
            
            Object.defineProperty(SELF.STATE,"variable_one",{

                configurable:false,
                enumerable:false,
                get(){

                    return SELF.$STATE["variable_one"];

                },
                set(data){

                    if(data.VALUE==this["variable_one"]) return;
    
                    SELF.$STATE["variable_one"]=data.VALUE;

                    if(data.SAVE){
    
                        SELF.PushState({
                            
                            KEY:"variable_one",
                            VALUE:this["variable_one"]
                            
                        });

                        SELF.ReplaceState({

                            KEY:"variable_one",
                            VALUE:this["variable_one"]

                        });
                        
                    }; 
                        
                    if(data.UPDATE){

                        SELF.DOM["PANEL1"].innerHTML=`${this["variable_one"]}`;

                    };

                }
                
            });

            Object.defineProperty(SELF.STATE,"variable_two",{

                configurable:false,
                enumerable:true,
                get(){

                    return SELF.$STATE["variable_two"];

                },
                set(data){

                    if(data.VALUE==this["variable_two"]) return;
    
                    SELF.$STATE["variable_two"]=data.VALUE;

                    if(data.SAVE){
    
                        SELF.PushState({
                            
                            KEY:"variable_two",
                            VALUE:this["variable_two"]
                            
                        });

                        // Push or replace depending on use case

                        SELF.ReplaceState({

                            KEY:"variable_two",
                            VALUE:this["variable_two"]

                        });
                        
                    }; 
                        
                    if(data.UPDATE){

                        SELF.DOM["PANEL1"].innerHTML=`${this["variable_two"]}`;

                    };

                }
                
            });
                
            Object.freeze(SELF.STATE);

            SELF.setup_runtime_variables_backend();
                
        };

        SELF.setup_runtime_variables_backend=function(){

            console.debug("setup_variables_backend");

            SELF.$STATE["variable_one"]="default";

            SELF.$STATE["variable_two"]="default";

            Object.seal(SELF.$STATE);

        };

        SELF.update_dom=function(){
            
            console.debug("update_dom");

            SELF.setAttribute("data-attribute",SELF.STATE["variable_one"]);

            // SELF.DOM["PANEL1"].innerHTML=`${SELF.STATE["variable_one"]}`;
            
        };

        SELF.write=function(data){

            const paragraph=document.createElement("p");
    
            paragraph.innerText=data;

            SELF.DOM["PANEL1"].appendChild(paragraph);

        };
        
    };
        
};