export default class AppElement extends CustomHTMLElement{

    constructor(){

        console.debug("constructor");

        super();

        this.define_methods();
        
        this.prepare_element();

        this.setup_state();

        this.setup_clef();

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
        
        try{

            node_process.kill(history.state.pid);

        }catch(e){

            console.warn(e.message);

        };
            
        SELF.map_dom=function(){
                
            console.debug("map_dom");
                
            SELF.DOM["PANEL1"]=SELF.shadowRoot.querySelector("#PANEL1");

            SELF.DOM["attest_button"]=SELF.shadowRoot.querySelector("#attest");
            
            SELF.DOM["init_button"]=SELF.shadowRoot.querySelector("#init");

            SELF.DOM["list_button"]=SELF.shadowRoot.querySelector("#list");
            
            SELF.DOM["start_button"]=SELF.shadowRoot.querySelector("#start");

            SELF.DOM["ec_recover_button"]=SELF.shadowRoot.querySelector("#ec_recover");

            SELF.DOM["sign_data_button"]=SELF.shadowRoot.querySelector("#sign_data");

            SELF.DOM["sign_transaction_button"]=SELF.shadowRoot.querySelector("#sign_transaction");

            SELF.DOM["sign_typed_data_button"]=SELF.shadowRoot.querySelector("#sign_typed_data");
            
            SELF.DOM["version_button"]=SELF.shadowRoot.querySelector("#version");

            SELF.DOM["new_button"]=SELF.shadowRoot.querySelector("#new");

            SELF.DOM["modal"]=SELF.shadowRoot.querySelector("modal-element");

            SELF.DOM["password-prompt"]=SELF.shadowRoot.querySelector("password-prompt");

            SELF.DOM["sign-data-prompt"]=SELF.shadowRoot.querySelector("sign-data-prompt");

            Object.freeze(SELF.DOM);

        };

        SELF.prepare_element=function(){
    
            console.debug("prepare_element");
    
            SELF.uid="AppElement";

            WINDOW.Elements[SELF.uid]=SELF;

            SELF.attachShadow({mode:"open"});

            SELF.DOM={};

            SELF.CLEF={};

            SELF.ENV={};

            SELF.$ENV={};

            SELF.STATE={};

            SELF.$STATE={};

        };

        SELF.setup_clef=function(){

            const CLEF_config="/Users/admin8/Home/clef/";

            const CLEF_keystore="/Users/admin8/Home/clef/keystore";
        
            const CLEF_rules="./scripts/rules.js";
        
            const CLEF_seed="/Users/admin8/Home/clef/masterseed.json";    

            SELF.CLEF.attest=async function(){

                // clef attest
    
                const command=await spawn("clef",[

                    "--stdio-ui",
                    "--configdir",CLEF_config,
                    "attest",
                    `$(shasum -a 256 ${CLEF_rules} | awk '{print $1}')`

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

            SELF.CLEF.delpw=function(){
            
                // clef delpw
    
                const command=spawn("clef",[

                    "--stdio-ui",
                    "--keystore",CLEF_keystore,
                    "--configdir",CLEF_config,
                    "delpw"

                ]);
    
                command.stdout.on("data",function(data){
    
                    console.log(data.toString());
    
                });
    
                command.stderr.on("data",function(data){
    
                    console.log(data.toString());
                    
                });
    
            };

            SELF.CLEF.ec_recover=async function(){

                const options={

                    body:JSON.stringify({

                        id:2,
                        jsonrpc:"2.0",
                        method:"account_ecRecover",
                        params:[
                            "0xaabbccdd",
                            "0x5b6693f153b48ec1c706ba4169960386dbaa6903e249cc79a8e6ddc434451d417e1e57327872c7f538beeb323c300afa9999a3d4a5de6caf3be0d5ef832b67ef1c"
                        ]

                    }),
                    
                    headers:{

                        "content-type":"application/json"

                    },
                    
                    method:"POST"
                    
                };

                const timeout1=(function (){

                    return setTimeout(function(){
    
                        SELF.DOM["modal"].write(`Timeout!`);
    
                    },5000);
    
                })();

                let response;
    
                try{
    
                    response=await fetch("http://localhost:9000",options);
    
                    const message=await response.text();
                    
                    SELF.DOM["modal"].write(message);
                    
                }catch(e){
                    
                    console.error(e.message);
                    
                    SELF.DOM["modal"].write(e);
                    
                };

                clearTimeout(timeout1);
    
            };

            SELF.CLEF.init=function(){
            
                // clef init
    
                const command=spawn("clef",[

                    "--stdio-ui",
                    "--keystore",CLEF_keystore,
                    "--configdir",CLEF_config,
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

            SELF.CLEF.list=async function(){

                const options={
    
                    body:`{"id":2,"jsonrpc":"2.0","method":"account_list","params":[]}`,
                    
                    headers:{
                        "content-type":"application/json"
                    },
                    
                    method:"POST"
                    
                };
    
                const timeout1=(function (){

                    return setTimeout(function(){
    
                        SELF.DOM["modal"].write(`Timeout!`);
    
                    },5000);
    
                })();

                let response;
    
                try{
    
                    response=await fetch("http://localhost:9000",options);
    
                    const message=await response.text();
                    
                    SELF.DOM["modal"].write(message);
                    
                }catch(e){
                    
                    console.error(e.message);
                    
                    SELF.DOM["modal"].write(e.message);
                    
                };
                
                clearTimeout(timeout1);
    
            };

            SELF.CLEF.new=function(){
            
                // clef newaccount
    
                try{

                    SELF.CLEF.process.kill();
    
                }catch(e){

                    console.warn(e.message);

                };

                SELF.CLEF.process=spawn("clef",[

                    "--stdio-ui",
                    "--keystore",CLEF_keystore,
                    "newaccoun"

                ]);
    
                SELF.CLEF.process.stdout.on("data",async function(data){

                    // console.debug(data.toString());
    
                    if(data.toString().includes(`New account password`)){

                        SELF.DOM["modal"].write(`Password requested`);
                        try{
                            
                            const message=JSON.stringify({
                                
                                id:1,
                                jsonrpc:"2.0",
                                result:{
                                    text:await SELF.DOM["password-prompt"].prompt()
                                }
                                
                            });

                            console.log(message);
                            
                            SELF.CLEF.process.stdin.write(message);

                            SELF.CLEF.process.stdin.end();

                        }catch(e){

                            console.error(e);

                        };
                        
                        return
    
                    };

                });
    
                SELF.CLEF.process.stderr.on("data",function(data){
    
                    console.info(data.toString());

                    const address_regex=/address=0x[0-9a-fA-F]+/;

                    const address=data.toString().match(address_regex)?.[0];

                    const path_regex=/path=([^ ]+)/;

                    const path=data.toString().match(path_regex)?.[0];


                });
    
            };

            SELF.CLEF.start=function(){
                
                // clef
                
                if(SELF.CLEF.process) SELF.CLEF.process.kill();
                
                SELF.CLEF.process=spawn("clef",[

                    "--stdio-ui",
                    "--ipcdisable",
                    "--http",
                    "--http.port","9000",
                    "--configdir",CLEF_config,
                    "--keystore",CLEF_keystore,
                    "--signersecret",CLEF_seed,
                    "--rules",CLEF_rules

                ]);
                
                history.replaceState({pid:SELF.CLEF.process.pid},null);
                
                SELF.CLEF.process.stdout.on("data",async function(data){
                    
                    let method;
                    
                    try{
                        
                        method=JSON.parse(data)?.method;
                        
                    }catch(e){
                        
                        console.warn(e.message);
                        
                    };

                    if(method=="ui_approveSignData") return;
                    
                    if(method=="ui_approveListing") return;

                    if(method=="ui_onInputRequired"){

                        SELF.DOM["modal"].write(`Password requested`);
                        
                        const message=JSON.stringify({
                            
                            id:1,
                            jsonrpc:"2.0",
                            result:{
                                text:await SELF.DOM["password-prompt"].prompt()
                            }
                            
                        });
                        
                        return SELF.CLEF.process.stdin.write(message);
                        
                    };

                    if(method=="ui_onSignerStartup"){
                      
                        SELF.DOM["modal"].write(`Signer ready`);

                        return;

                    };
                    
                    SELF.DOM["modal"].write(`stdout: \n ${data.toString()}`);
                    
                    if(method=="ui_approveNewAccount"){

                        // SELF.DOM["modal"].write(`Password requested`);

                        console.log("ui_approveNewAccount");

                        // const message=JSON.stringify({
                            
                        //     id:3,
                        //     jsonrpc:"2.0",
                        //     result:{
                        //         text:await SELF.DOM["password-prompt"].prompt()
                        //     }
                            
                        // });
                        
                        // return SELF.CLEF.process.stdin.write(message);
                        
                    };
                    
                });
                
                SELF.CLEF.process.stderr.on("data",function(data){
                    
                    const message=data.toString();
                    
                    console.info(message);
                    
                    const check=message.includes(`err="failed to decrypt the master seed of clef"`);
                    
                    if(check) {
                        
                        console.warn("Authentication failed");

                        SELF.DOM["modal"].write("Authentication failed!");

                        if(SELF.CLEF.process) SELF.CLEF.process.kill();

                    };
                    
                });
                
            };

            SELF.CLEF.setpw=function(){
            
                // clef setpw
    
                const command=spawn("clef",[

                    "--stdio-ui",
                    "--keystore",CLEF_keystore,
                    "--configdir",CLEF_config,
                    "setpw"

                ]);
    
                command.stdout.on("data",function(data){
    
                    console.log(data.toString());
    
                });
    
                command.stderr.on("data",function(data){
    
                    console.log(data.toString());
                    
                });
    
            };

            SELF.CLEF.sign_data=async function(){



                const options={
    
                    // body:`{"id":2,"jsonrpc":"2.0","method":"account_signData","params":[

                    //     "text/plain",
                    //     "0xd9dff16193d3ac787f09f09a96ec98bee47a78c4",
                    //     "0xaabbccdd"

                    // ]}`,

                    body:JSON.stringify({
                    
                        id:2,
                        jsonrpc:"2.0",
                        method:"account_signData",
                        params:await SELF.DOM["sign-data-prompt"].prompt()
    
                    }),
                    
                    headers:{

                        "content-type":"application/json"

                    },
                    
                    method:"POST"
                    
                };
    
                const timeout1=(function (){

                    return setTimeout(function(){
    
                        SELF.DOM["modal"].write(`Timeout!`);
    
                    },5000);
    
                })();

                let response;
    
                try{
                    
                    response=await fetch("http://localhost:9000",options);
    
                    const message=await response.text();
                    
                    SELF.DOM["modal"].write(message);
                    
                }catch(e){
                    
                    console.error(e.message);
                    
                    SELF.DOM["modal"].write(e);
                    
                };
                
                clearTimeout(timeout1);
    
            };

            SELF.CLEF.sign_transaction=async function(){

                const options={
    
                    body:`{"id":2,"jsonrpc":"2.0","method":"account_signTransaction","params":[{

                        "from":"0xd9dff16193d3ac787f09f09a96ec98bee47a78c4",
                        "gas":"",
                        "gasPrice":"",
                        "input":"",
                        "nonce":"",
                        "to":"",
                        "value":""

                    }]}`,
                    
                    headers:{

                        "content-type":"application/json"

                    },
                    
                    method:"POST"
                    
                };
    
                const timeout1=(function (){

                    return setTimeout(function(){
    
                        SELF.DOM["modal"].write(`Timeout!`);
    
                    },5000);
    
                })();

                let response;
    
                try{
    
                    response=await fetch("http://localhost:9000",options);
    
                    const message=await response.text();
                    
                    SELF.DOM["modal"].write(message);
                    
                }catch(e){
                    
                    console.error(e.message);
                    
                    SELF.DOM["modal"].write(e);
                    
                };
                
                clearTimeout(timeout1);
    
            };

            SELF.CLEF.sign_typed_data=async function(){

                const options={
    
                    body:`{"id":2,"jsonrpc":"2.0","method":"account_signTypedData","params":[

                        "0xd9dff16193d3ac787f09f09a96ec98bee47a78c4",
                        {}

                    ]}`,
                    
                    headers:{

                        "content-type":"application/json"

                    },
                    
                    method:"POST"
                    
                };
    
                const timeout1=(function (){

                    return setTimeout(function(){
    
                        SELF.DOM["modal"].write(`Timeout!`);
    
                    },5000);
    
                })();

                let response;
    
                try{
    
                    response=await fetch("http://localhost:9000",options);
    
                    const message=await response.text();
                    
                    SELF.DOM["modal"].write(message);
                    
                }catch(e){
                    
                    console.error(e.message);
                    
                    SELF.DOM["modal"].write(e);
                    
                };
                
                clearTimeout(timeout1);
    
            };

            SELF.CLEF.version=async function(){

                const options={
    
                    body:`{"id":2,"jsonrpc":"2.0","method":"account_version"}`,
                    
                    headers:{

                        "content-type":"application/json"

                    },
                    
                    method:"POST"
                    
                };

                const timeout1=(function (){

                    return setTimeout(function(){
    
                        SELF.DOM["modal"].write(`Timeout!`);
    
                    },5000);
    
                })();

                let response;
    
                try{
    
                    response=await fetch("http://localhost:9000",options);
    
                    const message=await response.text();

                    SELF.DOM["modal"].write(message);
                    
                }catch(e){
                    
                    console.error(e.message);
                    
                    SELF.DOM["modal"].write(e.message);
                    
                };

                clearTimeout(timeout1);
    
            };

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

            SELF.DOM["init_button"].addEventListener("click",(data)=>{

                SELF.CLEF.init();

            });

            SELF.DOM["attest_button"].addEventListener("click",(data)=>{

                SELF.CLEF.attest();

            });

            SELF.DOM["ec_recover_button"].addEventListener("click",(data)=>{

                SELF.CLEF.ec_recover();

            });

            SELF.DOM["sign_transaction_button"].addEventListener("click",(data)=>{

                SELF.CLEF.sign_transaction();

            });

            SELF.DOM["sign_typed_data_button"].addEventListener("click",(data)=>{

                SELF.CLEF.sign_typed_data();

            });

            SELF.DOM["sign_data_button"].addEventListener("click",(data)=>{

                SELF.CLEF.sign_data();

            });

            SELF.DOM["start_button"].addEventListener("click",(data)=>{

                SELF.CLEF.start();

            });

            SELF.DOM["list_button"].addEventListener("click",async(data)=>{

                await SELF.CLEF.list();

            });

            SELF.DOM["version_button"].addEventListener("click",async(data)=>{

                await SELF.CLEF.version();

            });

            SELF.DOM["new_button"].addEventListener("click",async(data)=>{

                await SELF.CLEF.new();

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
    
                SELF.PullHistory();
    
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

        SELF.setup_state=function(){

            console.debug("setup_state");

            SELF.setup_environment_variables();

            SELF.setup_runtime_variables();

            SELF.PullHistory();

        };

        SELF.setup_runtime_variables=function(){
    
            console.debug("setup_runtime_variables");

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

            SELF.setup_runtime_variables_backend();

        };

        SELF.setup_runtime_variables_backend=function(){

            console.debug("setup_runtime_variables_backend");

            SELF.$STATE["theme"]="theme_one";
    
            Object.seal(SELF.$STATE);

        };

        SELF.update_dom=function(){
            
            console.debug("update_dom")

            // SELF.DOM["PANEL1"].innerHTML=`${SELF.ENV["vw"]} ${SELF.ENV["vh"]}`;

        };

    };

};