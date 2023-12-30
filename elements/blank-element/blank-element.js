import Library from "";

export default class BlankElement extends CustomHTMLElement {

    // Lifecycle LOAD REFRESH TRAVERSE
    
    constructor(){

        super();

        this.define_methods();

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
    
    attributeChangedCallback(){};

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

            await SELF.GET_HTML("/elements/blank-element/blank-element.html");

            SELF.map_dom();

            SELF.setup_dom_listeners();

            SELF.update_dom();

        };

        SELF.setup_dom_listeners=function(){

            console.debug("setup_dom_listeners");

            SELF.DOM["PANEL1"].addEventListener("click",(data)=>{});
            
        };

        SELF.setup_environment_variables=function(){

            console.debug("setup_environment_variables");

            // Environment variables

            // Cannot be changed directly by user 

            // Can change during runtime

            // Can update DOM

            // Not recorded in HISTORY

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

            // Set defaults now

            console.debug("setup_environment_variables_backend");

            SELF.$ENV["environment_variable_one"]=undefined;

            Object.seal(SELF.$ENV);
            
        };
        
        SELF.setup_window_listeners=function(){
            
            console.debug("setup_window_listeners");
            
            WINDOW.addEventListener("popstate",(data)=>{
                
                SELF.PULL_HISTORY();
                
            });
            
        };

        SELF.setup_parameters=function(){

            console.debug("setup_parameters");
            
            // Parameters should not change during the lifetime of an instance

            // Can be calculated at runtime or hardcoded

            SELF.PARAMS["parameter_one"]="default";

            SELF.PARAMS["parameter_two"]=Library.token("user_name");

            Object.freeze(SELF.PARAMS);

        };

        SELF.setup_state=function(){

            console.debug("setup_state");

            SELF.setup_environment_variables();

            SELF.setup_runtime_variables();

            SELF.setup_parameters();

            SELF.PullHistory();

            // We resolve the source of truth using a priority hierarchy

            // We resolve TRUTH when the element is created and when a source of truth changes

            // Sources of truth are HISTORY STATE ENV PARAMS 

            // HISTORY overrides STATE

            // STATE ENV PARAMS are parallel. They do not clash

            // The user operates the element by changing its TRUTH

            // The app provides methods to the user that change the TRUTH according to their use case

        };

        SELF.setup_runtime_variables=function(){

            console.debug("setup_runtime_variables");
            
            // Runtime variables can change during the lifetime of an instance

            // Runtime variables react to changes
            
            Object.defineProperty(SELF.STATE,"variable_one",{

                configurable:false,
                enumerable:false, // Hidden from SETUP_HISTORY and PULL_HISTORY
                get(){

                    return SELF.$STATE["variable_one"];

                },
                set(data){

                    // Do not assign SELF.STATE["variable_one"]

                    if(data.VALUE==this["variable_one"]) return;
    
                    SELF.$STATE["variable_one"]=data.VALUE;

                    if(data.SAVE){
    
                        SELF.PUSH_STATE({
                            
                            KEY:"variable_one",
                            VALUE:this["variable_one"]
                            
                        });

                        // Push or replace depending on use case

                        SELF.REPLACE_STATE({

                            KEY:"variable_one",
                            VALUE:this["variable_one"]

                        });
                        
                        // We can use replace state for certain values

                        // Nuances pushState replaceState 

                        // user writable but not saved

                        // not available to user but can change

                        // changes not recorded

                    }; 
                        
                    if(data.UPDATE){

                        // Refresh the entire dom with SELF.update_dom()
                        
                        // Or update attributes and inner-html directly via SELF.DOM

                        SELF.DOM["PANEL1"].innerHTML=`${this["variable_one"]}`;

                    };

                }
                
            });

            Object.defineProperty(SELF.STATE,"variable_two",{

                configurable:false,
                enumerable:true, // Visible to SETUP_HISTORY and PULL_HISTORY
                get(){

                    return SELF.$STATE["variable_two"];

                },
                set(data){

                    if(data.VALUE==this["variable_two"]) return;
    
                    SELF.$STATE["variable_two"]=data.VALUE;

                    if(data.SAVE){
    
                        SELF.PUSH_STATE({
                            
                            KEY:"variable_two",
                            VALUE:this["variable_two"]
                            
                        });

                        // Push or replace depending on use case

                        SELF.REPLACE_STATE({

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

            // $STATE is the storage backend of STATE

            // STATE is an interface for the smart variables

            // A smart variable has a custom getter that retrieves the value from $STATE

            // A smart variable has a custom setter that can update $STATE DOM and HISTORY

            // Set defaults now

            SELF.$STATE["variable_one"]="default";

            SELF.$STATE["variable_two"]="default";

            Object.seal(SELF.$STATE);

        };

        SELF.update_dom=function(){
            
            console.debug("update_dom");

            // The state has changed
            
            // Update attributes 
            
            // Update inner-html
            
            // Do not modify state here
            
            SELF.setAttribute("data-attribute",SELF.STATE["variable_one"]);

            SELF.DOM["PANEL1"].innerHTML=`${SELF.STATE["variable_one"]}`;
            
        };
        
    };
        
};