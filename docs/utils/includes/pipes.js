/*********************************************************
***        Ce fichier ajoute l'élément threads         ***
*** qui dessine automatiquement les filets d'un tuyau, ***
***    les gradients horizontalPipe et verticalPipe    ***
***     ainsi que plusieurs couleurs (cuivrés)...      ***
*********************************************************/

/**********************************
Les couleurs sont utilisables en
utilisant simplement leur nom.
**********************************/

var copper = new SVG.Color('#b87333');
var lightCopper = new SVG.Color('#cc7c33');
var lighterCopper = new SVG.Color('#e58833');
var lightestCopper = new SVG.Color('#ffbc7f');
var darkCopper = new SVG.Color('#9a5515');
var darkerCopper = new SVG.Color('#7f4a19');
var darkestCopper = new SVG.Color('#663100');


/**********************************
Pour utiliser les gradients, if faut d'abord
les définir dans le document en utilisant:#b87333
draw.svg(vPipe); ou draw.svg(hPipe);
Ensuite, un élément pourra l'utiliser:
"url(#vPipe)" ou "url(#hPipe)" dans un fill.
**********************************/

var hPipe = "<linearGradient id='hPipe' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' style='stop-color:#b87333;stop-opacity:1'/><stop offset='32%' style='stop-color:#ffbc7f;stop-opacity:1'/><stop offset='45%' style='stop-color:#7f4a19;stop-opacity:1'/><stop offset='67%' style='stop-color:#cc7c33;stop-opacity:1'/><stop offset='100%' style='stop-color:#9a5515;stop-opacity:1'/></linearGradient>";
var hPipeInt = "<linearGradient id='hPipeInt' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' style='stop-color:#663100;stop-opacity:1'/><stop offset='32%' style='stop-color:#cc7c33;stop-opacity:1'/><stop offset='52%' style='stop-color:#9a5515;stop-opacity:1'/><stop offset='66%' style='stop-color:#ffbc7f;stop-opacity:1'/><stop offset='100%' style='stop-color:#7f4a19;stop-opacity:1'/></linearGradient>";
var vPipe = "<linearGradient id='vPipe' x1='0%' y1='0%' x2='100%' y2='0%'><stop offset='0%' style='stop-color:#b87333;stop-opacity:1'/><stop offset='32%' style='stop-color:#ffbc7f;stop-opacity:1'/><stop offset='45%' style='stop-color:#7f4a19;stop-opacity:1'/><stop offset='67%' style='stop-color:#cc7c33;stop-opacity:1'/><stop offset='100%' style='stop-color:#9a5515;stop-opacity:1'/></linearGradient>";

/********************************************
ÉLÉMENT threads
Cet élément représente les filets d'un tuyau.
Il peut être appelé avec draw.threads({});
On peut y passer différents paramètres:
draw.threads({width:50, length:100, threads:5, outward:false})
	width est la largeur du tuyau,
	length est la longueur des filets,
	threads est le nombre de filets,
	outwards: (les filets seront internes si faux - par défaut,
	 	ou externes (dépassant la largeur) si vrai).
********************************************/

SVG.Threads = SVG.invent({
	create: 'g',
	inherit: SVG.G,
  extend: {
		constructorMethod: function({width=50, length=100, threads=5, outward=false}={width:50, length:100, threads:5, outward:false}) {
						var g1 = new SVG.Gradient('linear', function(stop) {
							stop.at(0, '#ffbc7f')
							stop.at(1, '#9a5515')
						}).from(0, 0).to(0, 1);
						var g2 = new SVG.Gradient('linear', function(stop) {
						 stop.at(0, '#7f4a19')
						 stop.at(1, '#cc7c33')
					 }).from(0, 0).to(0, 1);

					 var l=length;

					 var d = l/(2*threads);

					 if(outward) {
						 var w=width+2*d;
						 var y0 = -d;
					 }
					 else {
						 var w = width;
						 var y0 = 0;
					 }

					 this.svg("<linearGradient id='threadGradient1' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' style='stop-color:#ffbc7f;stop-opacity:1'/><stop offset='100%' style='stop-color:#9a5515;stop-opacity:1'/></linearGradient>");
					 this.svg("<linearGradient id='threadGradient2' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' style='stop-color:#7f4a19;stop-opacity:1'/><stop offset='100%' style='stop-color:#cc7c33;stop-opacity:1'/></linearGradient>");

					 this.path('M 0 '+(y0+d)+' v'+(w-d)+' l'+d+' '+(-d)+' z').attr({fill: "url(#threadGradient2)"});

					 for(var i=0; i<2*threads-1; i++) {
						 if(i % 2 == 0) { this.path('M'+(d*i)+' '+(y0+d)+' l'+d+' '+(w-2*d)+' l'+d+' '+d+' l'+(-d)+' '+(-w)+' z').attr({fill: "url(#threadGradient1)"}); }
						 else { this.path('M'+(d*i)+' '+y0+' l'+d+' '+(w)+' l'+d+' '+(-d)+' l'+(-d)+' -'+(w-2*d)+' z').attr({fill: "url(#threadGradient2)"}); }
					 }

					 this.path('M'+(d*i)+' '+y0+' l'+d+' '+(d)+' v'+(w-2*d)+' z').attr({fill: "url(#threadGradient2)"});
					 

					 return this;
				 }
	    },
		construct: {
				threads: function({width=50, length=100, threads=5, outward=false}={width:50, length:100, threads:5, outward:false}) {
	 			 return this.put(new SVG.Threads).constructorMethod({width:width, length:length, threads:threads, outward:outward});
	 		 }
    }
});
