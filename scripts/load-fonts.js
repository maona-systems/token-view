const ChivoBold=new FontFace("Chivo","url(/assets/chivo-font/chivo-bold.ttf)",{style:"normal",weight:"700"});

const ChivoBlack=new FontFace("Chivo","url(/assets/chivo-font/chivo-black.ttf)",{style:"normal",weight:"900"});

const ChivoBlackItalic=new FontFace("Chivo","url(/assets/chivo-font/chivo-black-italic.ttf)",{style:"italic",weight:"900"});

const ChivoBoldItalic=new FontFace("Chivo","url(/assets/chivo-font/chivo-bold-italic.ttf)",{style:"italic",weight:"700"});

const ChivoLight=new FontFace("Chivo","url(/assets/chivo-font/chivo-light.ttf)",{style:"normal",weight:"300"});

const ChivoLightItalic=new FontFace("Chivo","url(/assets/chivo-font/chivo-light-italic.ttf)",{style:"italic",weight:"300"});

const ChivoRegular=new FontFace("Chivo","url(/assets/chivo-font/chivo-regular.ttf)",{style:"normal",weight:"400"});

const ChivoRegularItalic=new FontFace("Chivo","url(/assets/chivo-font/chivo-regular.ttf)",{style:"italic",weight:"400"});

ChivoBold.load();

ChivoLight.load();

ChivoRegular.load();

document.fonts.add(ChivoBold);

document.fonts.add(ChivoLight);

document.fonts.add(ChivoRegular);