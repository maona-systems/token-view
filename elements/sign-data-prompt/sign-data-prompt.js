export default class SignDataPrompt extends CustomHTMLElement {

    constructor(){

        super();

        this.defineMethods();

        this.prepare_element();

        this.setup_state();

    };
    
    async connectedCallback(){

        console.debug("connectedCallback");
        
        await this.setup_dom();
        
        this.setup_window_listeners();

    };

    disconnectedCallback(){};
        
    adoptedCallback(){};
    
    defineMethods(){

        console.debug("define_methods")

        const SELF=this;

        const WINDOW=globalThis;

        SELF.hide=function(){

            SELF.DOM["address_input"].value="";
            SELF.DOM["data_input"].value="";
            SELF.DOM["type_input"].value="";
            SELF.setAttribute("data-visible",false);
            
        };

        SELF.map_dom=function(){
            
            console.debug("map_dom");
            
            SELF.DOM["PANEL1"]=SELF.shadowRoot.querySelector(`#PANEL1`);

            SELF.DOM["type_input"]=SELF.shadowRoot.querySelector(`#type`);
            
            SELF.DOM["address_input"]=SELF.shadowRoot.querySelector(`#address`);
            
            SELF.DOM["data_input"]=SELF.shadowRoot.querySelector(`#data`);

            SELF.DOM["abort_button"]=SELF.shadowRoot.querySelector(`#abort`);
            
            SELF.DOM["continue_button"]=SELF.shadowRoot.querySelector(`#continue`);
            
            Object.freeze(SELF.DOM);
            
        };
        
        SELF.prepare_element=function(){
            
            console.debug("prepare_element");
            
            SELF.uid="SignDataElement";

            WINDOW.Elements[SELF.uid]=SELF;
            
            SELF.attachShadow({mode:"open"});

            SELF.DOM={};

            SELF.ENV={}

            SELF.$ENV={};

            SELF.PARAMS={};
            
            SELF.STATE={};

            SELF.$STATE={};
        
        };

        SELF.prompt=function(){
            
            SELF.show();

            return new Promise(function(resolve,reject){

                function submit(){

                    const _address=SELF.DOM["address_input"].value;
    
                    const _data=SELF.DOM["data_input"].value;
                    
                    const _type=SELF.DOM["type_input"].value;

                    resolve([_type,_address,_data])
        
                    SELF.setAttribute("data-visible",false);
                    
                    SELF.hide();
        
                };

                SELF.onkeydown=function(data){

                    if(data.key=="Enter") submit();
                    
                };
                
                SELF.DOM["continue_button"].onclick=function(){
                    
                    submit();

                };
                
            });

        };

        SELF.setup_dom=async function(){

            console.debug("setup_dom");

            try{

                await SELF.GetHTML("/elements/sign-data-prompt/sign-data-prompt.html");

            }catch(e){

                console.error(e.message);

            };

            SELF.map_dom();

            SELF.setup_dom_listeners();

            SELF.update_dom();

        };

        SELF.setup_dom_listeners=function(){

            console.debug("setup_dom_listeners");

            SELF.DOM["abort_button"].addEventListener("click",(data)=>{

                SELF.hide();

            });

            SELF.DOM["continue_button"].addEventListener("keydown",function(data){

                // if(data.key=="Enter") SELF.submit();

            });

            SELF.DOM["continue_button"].addEventListener("click",function(){

                // SELF.submit();

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
        
        SELF.setup_window_listeners=function(){
            
            console.debug("setup_window_listeners");
            
            WINDOW.addEventListener("popstate",(data)=>{
                
                SELF.PullHistory();
                
            });
            
        };

        SELF.setup_parameters=function(){

            console.debug("setup_parameters");
            
            SELF.PARAMS["parameter_one"]="default";

            Object.freeze(SELF.PARAMS);

        };

        SELF.setup_state=function(){

            console.debug("setup_state");

            SELF.setup_environment_variables();

            SELF.setup_runtime_variables();

            SELF.setup_parameters();

            SELF.PullHistory();

        };

        SELF.setup_runtime_variables=function(){

            console.debug("setup_runtime_variables");
            
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

            console.debug("setup_runtime_variables_backend");

            SELF.$STATE["variable_one"]="default";

            SELF.$STATE["variable_two"]="default";

            Object.seal(SELF.$STATE);

        };

        SELF.show=function(){

            SELF.setAttribute("data-visible",true);
            
            SELF.DOM["type_input"].focus();

        };

        SELF.update_dom=function(){
            
            console.debug("update_dom");

            // SELF.setAttribute("data-visible",true);

            // SELF.DOM["PANEL1"].innerHTML=`${SELF.STATE["variable_one"]}`;
            
        };
        
    };

};