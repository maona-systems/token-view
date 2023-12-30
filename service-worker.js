const SELF=globalThis;

SELF.addEventListener("install",async function(data){

    const cache1=await caches.open("cache1");

    if(cache1){

        cache1.add("/index.html");

        cache1.add("/scripts/index.js");

        cache1.add("/elements/root-element/root-element.js");

        cache1.add("/elements/app-element/app-element.js");

        cache1.add("/elements/app-element/app-element.html");

        cache1.add("/scripts/load-elements.js");
        
        cache1.add("/scripts/load-fonts.js");

        cache1.add("/css/index.css");

        cache1.add("/css/global.css");

    };

});
    
SELF.addEventListener("fetch",async function(data){
    
    async function use_cache(){

        const request=data.request;

        const cached_response=await caches.match(request);

        if(cached_response) return cached_response;

        try {
            
            await fetch(request);

        }catch(e){

            console.error(e);

        };
        
    };

    await data.respondWith(use_cache());

});