console.debug("index.js");

await import("/scripts/load-fonts.js");

globalThis.Elements={};

globalThis.CustomHTMLElement=(await import("/scripts/custom-html-element.js")).default;

await import("/scripts/load-elements.js");

document.body.appendChild(document.createElement("root-element"));