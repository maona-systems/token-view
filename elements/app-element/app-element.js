export default class AppElement extends CustomHTMLElement{

    constructor(){

        console.debug("constructor");

        super();

        this.define_methods();

        this.prepare_element();

        this.setup_state();

    };
    
    async connectedCallback(){
        
        console.debug("connectedCallback");
        
        await this.setup_dom();

        this.setup_global_listeners();

        const midi=await navigator.requestMIDIAccess();

        let p32dj_input,p32dj_output;

        midi.inputs.forEach(function(input){
            
            if(input.name=="Hercules P32 DJ") p32dj_input=input;

        });

        midi.outputs.forEach(function(output){
            
            if(output.name=="Hercules P32 DJ") p32dj_output=output;

        });

        p32dj_input.addEventListener("midimessage",function(data){

            console.log(data.data.toString());

        });

        p32dj_output.addEventListener("midimessage",function(data){

            console.log(data);

        });

    };

    define_methods(){

        const SELF=this;

        const NW=nw;

        const WINDOW=globalThis;

        const {spawn}=require("node:child_process");

        const node_process=require('node:process');

        const net=require("node:net");

        const $CLEF_config="/Users/admin8/Home/clef/";

        const $CLEF_keystore="/Users/admin8/Home/clef/keystore";
        
        const $CLEF_rules="./scripts/rules.js";
        
        const $CLEF_seed="/Users/admin8/Home/clef/masterseed.json";    
        
        try{

            node_process.kill(history.state.pid);

        }catch(e){

            console.warn(e.message);

        };

        SELF.CLEF_attest=async function(){

            // clef attest

            const command=await spawn("clef",[
                "--stdio-ui",
                "--configdir",$CLEF_config,
                "attest",
                `$(shasum -a 256 ${$CLEF_rules} | awk '{print $1}')`
            ],{shell:true});

            command.stdout.on("data",function(data){

                console.log(data.toString());

            });

            command.stderr.on("data",function(data){

                console.log(data.toString());
                
            });

            command.stdin.write("#Tr1ppy2i*");
            
            command.stdin.end();

        };

        SELF.CLEF_delpw=function(){
            
            // clef delpw

            const command=spawn("clef",[
                "--stdio-ui",
                "--keystore",$CLEF_keystore,
                "--configdir",$CLEF_config,
                "delpw"
            ]);

            command.stdout.on("data",function(data){

                console.log(data.toString());

            });

            command.stderr.on("data",function(data){

                console.log(data.toString());
                
            });

        };

        SELF.CLEF_init=function(){
            
            // clef init

            const command=spawn("clef",[
                "--stdio-ui",
                "--keystore",$CLEF_keystore,
                "--configdir",$CLEF_config,
                "init"
            ]);

            console.log(command.pid);

            command.stdout.on("data",function(data){

                const message=data.toString();

                SELF.DOM["modal"].write(message);


            });

            command.stderr.on("data",function(data){

                const message=data.toString();

                console.log(message);

                SELF.DOM["modal"].write(message);
                
            });


        };

        // SELF.CLEF_list=function(){
            
        //     // clef list-accounts

        //     const command=spawn("clef",[
        //         "--stdio-ui",
        //         "--keystore",$CLEF_keystore,
        //         "list-accounts"
        //     ]);

        //     command.stdout.on("data",function(data){

        //         console.log(data.toString());

        //     });

        //     command.stderr.on("data",function(data){

        //         console.log(data.toString());
                
        //     });

        // };

       

        SELF.CLEF_setpw=function(){
            
            // clef setpw

            const command=spawn("clef",[
                "--stdio-ui",
                "--keystore",$CLEF_keystore,
                "--configdir",$CLEF_config,
                "setpw"
            ]);

            command.stdout.on("data",function(data){

                console.log(data.toString());

            });

            command.stderr.on("data",function(data){

                console.log(data.toString());
                
            });

        };

        SELF.CLEF_version=async function(){

            const options={

                body:`{"id":2,"jsonrpc":"2.0","method":"account_version"}`,
                
                headers:{
                    "content-type":"application/json"
                },
                
                method:"POST"
                
            };

            const response=await fetch("http://localhost:9000",options);

            const message=JSON.parse(await response.text());

            SELF.DOM["modal"].write(message.result);

        };

        SELF.CLEF_list=async function(){

            const options={

                body:`{"id":2,"jsonrpc":"2.0","method":"account_list","params":[]}`,
                
                headers:{
                    "content-type":"application/json"
                },
                
                method:"POST"
                
            };

            let response;

            try{

                response=await fetch("http://localhost:9000",options);

            }catch(e){

                console.error(e.message);

                SELF.DOM["modal"].write(e);

            };

            const message=await response.text();

            SELF.DOM["modal"].write(message);

        };

        SELF.CLEF_new_http=async function(){

            const options={

                body:`{"id":2,"jsonrpc":"2.0","method":"account_new","params":[]}`,
                
                headers:{
                    "content-type":"application/json"
                },
                
                method:"POST"
                
            };

            let response;

            try{

                response=await fetch("http://localhost:8082",options);

            }catch(e){

                console.error(e.message);

            };

            const message=await response.text();

            SELF.DOM["modal"].write(message);

        };

        SELF.CLEF_new=function(){
            
            // clef newaccount

            if(SELF.CLEF_process) SELF.CLEF_process.kill();

            SELF.CLEF_process=spawn("clef",[
                "--stdio-ui",
                "--keystore",$CLEF_keystore,
                "newaccount"
            ]);

            history.replaceState({pid:SELF.CLEF_process.pid},null);

            SELF.CLEF_process.stdout.on("data",async function(data){

                SELF.DOM["modal"].write(data.toString());

                if(data.toString().includes(`New account password`)){

                    const message=JSON.stringify({

                        id:1,
                        jsonrpc:"2.0",
                        result:{
                            text:await SELF.DOM["prompt"].password()
                        }

                    });

                    SELF.CLEF_process.stdin.write(message);

                    SELF.CLEF_process.stdin.end();

                };

            });

            SELF.CLEF_process.stderr.on("data",function(data){

                console.info(data.toString());
                
            });

        };

        SELF.CLEF_start=function(){
            
            // clef

            if(SELF.CLEF_process) SELF.CLEF_process.kill();

            SELF.CLEF_process=spawn("clef",[
                "--stdio-ui",
                "--ipcdisable",
                "--http",
                "--http.port","9000",
                "--configdir",$CLEF_config,
                "--keystore",$CLEF_keystore,
                "--signersecret",$CLEF_seed,
                // "--rules",$CLEF_rules
            ]);
        
            history.replaceState({pid:SELF.CLEF_process.pid},null);

            SELF.CLEF_process.stdout.on("data",async function(data){
                

                let method;

                try{

                    method=JSON.parse(data)?.method;

                }catch(e){

                    console.warn(e.message);

                };

                if(method=="ui_approveListing") return;

                SELF.DOM["modal"].write(`stdout: \n ${data.toString()}`);

                if(method=="ui_approveNewAccount"){

                    return SELF.CLEF_process.stdin.write(`{"id":3,"jsonrpc":"2.0","result":{"text":"#R4f@3l323"}}`);

                };

                if(method=="ui_onInputRequired"){
                
                    const message=JSON.stringify({

                        id:1,
                        jsonrpc:"2.0",
                        result:{
                            text:await SELF.DOM["prompt"].password()
                        }

                    });

                    return SELF.CLEF_process.stdin.write(message);
                    
                };
                
                if(method=="ui_onSignerStartup") return;



            });

            SELF.CLEF_process.stderr.on("data",function(data){

                const message=data.toString();

                console.info(message);

                const check=data.toString().includes(`err="failed to decrypt the master seed of clef"`);

                if(check) console.warn("Incorrect password");
                
            });

        };

        SELF.map_dom=function(){
    
            console.debug("map_dom");

            SELF.DOM["PANEL1"]=SELF.shadowRoot.querySelector("#PANEL1");

            SELF.DOM["attest_button"]=SELF.shadowRoot.querySelector("#attest");
            
            SELF.DOM["init_button"]=SELF.shadowRoot.querySelector("#init");

            SELF.DOM["list_button"]=SELF.shadowRoot.querySelector("#list");
            
            SELF.DOM["start_button"]=SELF.shadowRoot.querySelector("#start");
            
            SELF.DOM["version_button"]=SELF.shadowRoot.querySelector("#version");

            SELF.DOM["new_button"]=SELF.shadowRoot.querySelector("#new");

            SELF.DOM["modal"]=SELF.shadowRoot.querySelector("modal-element");

            SELF.DOM["prompt"]=SELF.shadowRoot.querySelector("prompt-element");

            Object.freeze(SELF.DOM);

        };

        SELF.prepare_element=function(){
    
            console.debug("prepare_element");
    
            SELF.uid="AppElement";

            WINDOW.Elements[SELF.uid]=SELF;

            SELF.attachShadow({mode:"open"});

            SELF.DOM={};

            SELF.ENV={};

            SELF.$ENV={};

            SELF.STATE={};

            SELF.$STATE={};

        };

        SELF.setup_dom=async function(){
    
            console.debug("setup_dom");

            await SELF.GetHTML("/elements/app-element/app-element.html");

            SELF.map_dom();

            SELF.setup_dom_listeners();

            SELF.update_dom();
    
        };

        SELF.setup_dom_listeners=function(){

            console.debug("setup_dom_listeners");

            SELF.DOM["PANEL1"].addEventListener("click",(data)=>{

            });

            SELF.DOM["init_button"].addEventListener("click",(data)=>{

                SELF.CLEF_init();

            });

            SELF.DOM["attest_button"].addEventListener("click",(data)=>{

                SELF.CLEF_attest();

            });

            SELF.DOM["start_button"].addEventListener("click",(data)=>{

                SELF.CLEF_start();

            });

            SELF.DOM["list_button"].addEventListener("click",async(data)=>{

                await SELF.CLEF_list();

            });

            SELF.DOM["version_button"].addEventListener("click",async(data)=>{

                await SELF.CLEF_version();

            });

            SELF.DOM["new_button"].addEventListener("click",async(data)=>{

                await SELF.CLEF_new();

            });

            WINDOW.addEventListener("keydown",(event_data)=>{

                if(!(event_data.key=="1"&&event_data.ctrlKey)) return;

                const nw_menu=new NW.Menu();
    
                const menu_item_1=new NW.MenuItem({
                
                    label:"option1",
                
                    click:function(){}
                
                });
                
                nw_menu.append(menu_item_1);
                
                nw_menu.popup(0,0);

            });

            NW.Window.get().on("close",function(){

                try{

                    node_process.kill(history.state.pid);
        
                }catch(e){
        
                    console.warn(e.message);
        
                };

                this.close(true);

            });

        };

        SELF.setup_environment_variables=function(){

            console.debug("setup_environment_variables");

            Object.defineProperty(SELF.ENV,"vh",{

                configurable:false,
                enumerable:true,
                get(){

                    return SELF.$ENV["vh"];

                },
                set(data){

                    if(data.VALUE==this["vh"]) return;
                    
                    SELF.$ENV["vh"]=data.VALUE;
                    
                    if(data.UPDATE){

                        // SELF.DOM["PANEL1"].innerHTML=`${this["vw"]} ${this["vh"]}`;

                    };

                }
                
            });

            Object.defineProperty(SELF.ENV,"vw",{

                configurable:false,
                enumerable:true,
                get(){

                    return SELF.$ENV["vw"];

                },
                set(data){

                    if(data.VALUE==this["vw"]) return;
    
                    SELF.$ENV["vw"]=data.VALUE;

                    if(data.SAVE){
    
                        SELF.SAVE_STATE({
                            
                            KEY:"vw",
                            VALUE:this["vw"]
                            
                        });

                        
                    }; 
                        
                    if(data.UPDATE){

                        // SELF.DOM["PANEL1"].innerHTML=`${this["vw"]} ${this["vh"]}`;

                    };

                }
                
            });

            Object.freeze(SELF.ENV)

            SELF.setup_environment_variables_backend();

        };

        SELF.setup_environment_variables_backend=function(){

            console.debug("setup_environment_variables_backend");

            SELF.$ENV["vh"]=WINDOW.visualViewport.height;
            
            SELF.$ENV["vw"]=WINDOW.visualViewport.width;

            Object.seal(SELF.$ENV);

        };

        SELF.setup_global_listeners=function(){
            
            console.debug("setup_global_listeners");
    
            WINDOW.addEventListener("popstate",(data)=>{

                console.debug("popstate");
    
                SELF.PULL_HISTORY();
    
            });

            WINDOW.addEventListener("resize",(data)=>{

                console.debug("resize");

                SELF.ENV["vh"]={

                    UPDATE:true,
                    VALUE:WINDOW.visualViewport.height

                };

                SELF.ENV["vw"]={

                    UPDATE:true,
                    VALUE:WINDOW.visualViewport.width
                
                };

            });
    
        };

        SELF.setup_state=function(){

            console.debug("setup_state");

            SELF.setup_environment_variables();

            SELF.setup_variables();

            SELF.PullHistory();

        };

        SELF.setup_variables=function(){
    
            console.debug("setup_variables");

            Object.defineProperty(SELF.STATE,"theme",{

                configurable:false,
                enumerable:true,
                get(){

                    return SELF.$STATE["theme"];

                },
                set(data){

                    if(data.VALUE==this["theme"]) return;
                    
                    SELF.$STATE["theme"]=data.VALUE;
                    
                    if(data.SAVE){

                        SELF.REPLACE_STATE({

                            KEY:"theme",
                            VALUE:this["theme"]

                        });
                        
                    }; 
                        
                    if(data.UPDATE){

                        WINDOW.alert(`${this["theme"]}`);

                    };

                }
                
            });

            Object.freeze(SELF.STATE);

            SELF.setup_variables_backend();

        };

        SELF.setup_variables_backend=function(){

            console.debug("setup_variables_backend");

            SELF.$STATE["theme"]="theme_one";
    
            Object.seal(SELF.$STATE);

        };

        SELF.update_dom=function(){
            
            console.debug("update_dom")

            // SELF.DOM["PANEL1"].innerHTML=`${SELF.ENV["vw"]} ${SELF.ENV["vh"]}`;

        };

    };

};