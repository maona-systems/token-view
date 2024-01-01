const window_options={

    focus:true,
    frame:true,
    fullscreen:false,
    height:657,
    min_height:657,
    min_width:657,
    position:"center",
    resizable:true,
    show_in_taskbar: true,
    title:"Token View",
    width:657,

};

nw.Window.open("index.html",window_options);

const win=nw.Window.get();

console.log(this);

win.on("close",()=>{

    win.close(true);

});