export default class PasswordPrompt extends CustomHTMLElement {

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

        SELF.CLEF=WINDOW.Elements.AppElement.CLEF;

        SELF.hide=function(){

            SELF.DOM["password_input"].value="";

            SELF.setAttribute("data-visible",false);
            
        };

        SELF.map_dom=function(){
            
            console.debug("map_dom");
            
            SELF.DOM["PANEL1"]=SELF.shadowRoot.querySelector(`#PANEL1`);

            SELF.DOM["abort_button"]=SELF.shadowRoot.querySelector(`#abort`);
            
            SELF.DOM["continue_button"]=SELF.shadowRoot.querySelector(`#continue`);
            
            SELF.DOM["password_input"]=SELF.shadowRoot.querySelector(`#password`);

            Object.freeze(SELF.DOM);
            
        };

        SELF.password=async function(){

            console.debug("password");

            SELF.show();

            return await SELF.readPassword();

        };
        
        SELF.prepare_element=function(){
            
            console.debug("prepare_element");
            
            SELF.uid="PromptElement";

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

                    resolve(SELF.DOM["password_input"].value);
                    
                    SELF.setAttribute("data-visible",false);

                    SELF.DOM["password_input"].value="";

                };

                SELF.DOM["password_input"].onkeydown=function password_keydown(data){

                    if(data.key=="Enter") submit();

                };

                SELF.DOM["continue_button"].onkeydown=function(data){

                    if(data.key=="Enter") submit();

                };

                SELF.DOM["continue_button"].onclick=function(){

                    submit();

                };

                SELF.DOM["abort_button"].onclick=function(){

                    reject("Aborted");

                };
                
            });

        };


        SELF.setup_dom=async function(){

            console.debug("setup_dom");

            await SELF.GetHTML("/elements/password-prompt/password-prompt.html");

            SELF.map_dom();

            SELF.setup_dom_listeners();

            SELF.update_dom();

        };

        SELF.setup_dom_listeners=function(){

            console.debug("setup_dom_listeners");

            SELF.DOM["abort_button"].addEventListener("click",(data)=>{

                // SELF.DOM["modal"].write("Aborted");

                try{
                    
                    SELF.CLEF.process.kill();

                }catch(e){

                    console.warn(e.message);

                };

                SELF.hide();

            });

            SELF.DOM["password_input"].addEventListener("keydown",function(data){
            

            });

            SELF.DOM["continue_button"].addEventListener("keydown",function(data){


            });

            SELF.DOM["continue_button"].addEventListener("click",function(){


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
            
            SELF.DOM["password_input"].focus();

        };

        SELF.update_dom=function(){
            
            console.debug("update_dom");

            // SELF.setAttribute("data-visible",true);

            // SELF.DOM["PANEL1"].innerHTML=`${SELF.STATE["variable_one"]}`;
            
        };
        
    };

};