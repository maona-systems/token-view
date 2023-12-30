export default class CustomHTMLElement extends HTMLElement{

    constructor(){
        
        super();

    };

    async GetHTML(data){

        console.debug("GetHTML");

        const SELF=this;
        
        const response=await fetch(data);

        if(!response.ok) throw new Error("FetchError");

        const template=document.createElement("template");
    
        template.innerHTML=await response.text();

        SELF.shadowRoot.replaceChildren(template.content);

    };

    PullHistory(){

        // Overrides the default state values

        console.debug("PullHistory");

        const SELF=this;

        if(!history.state?.[SELF.uid]) return SELF.SetupHistory();

        const state=SELF.STATE;

        const state_history=history.state[SELF.uid];

        for(const key in state_history){
            
            if(!Object.hasOwn(state,key)) continue;

            state[key]={VALUE:state_history[key]};
        
        };

    };

    PushState(data){

        console.debug("PushState");

        const SELF=this;

        if(!history.state?.[SELF.uid]) SELF.SetupHistory();

        const state={...history.state};

        Object.assign(state[SELF.uid],{[data.KEY]:data.VALUE});

        history.pushState(state,null);

    };

    ReplaceState(data){

        console.debug("ReplaceState");

        const SELF=this;

        if(!history.state?.[SELF.uid]) SELF.SetupHistory();

        const state={...history.state};

        Object.assign(state[SELF.uid],{[data.KEY]:data.VALUE});

        history.replaceState(state,null);

    };

    SetupHistory(){

        console.debug("SetupHistory");

        const SELF=this;

        const temp1={...history.state};

        const temp2={[SELF.uid]:{...SELF.STATE}};

        history.replaceState(Object.assign(temp1,temp2),null);

    };

};