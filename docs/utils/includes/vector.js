/******************************************
***    Ce fichier ajoute la fonction    ***
*** vector() aux Line, Polyline et Path ***
*** et la fonction ray() aux Polylines. ***
******************************************/


/********************************************
FONCTION vector()
Cette fonction ajoute une flèche à une extrémité de la ligne.
La flèche alongera la ligne d'une longueur égale à la largeur de la ligne.
La flèche s'adaptera aux changements de longueur, largeur et directions de la ligne
mais pas aux changements de couleurs - il faut relancer la fonction vector().
La fonction accepte 3 paramètres (optionnels) vector({size:1,position:'end',style:'curved'})
	size: taille relative de la flèche (de 0.4 à l'infini)
	position: 'start', 'end' ou 'both' (où tracer la flèche...)
	style: 'curved', 'triangle' ou 'lines' (style de la flèche...)
********************************************/

SVG.extend(SVG.Path, SVG.Line, SVG.Polyline, {
  vector: function({size=1,position='end',style='curved'}={size:1,position:'end',style:'curved'}) {
  	var boxCenterizer;
  	if(position==='start') {size=-size; boxCenterizer=2;}
    else if(position==='both') {
    	this.vector({size:size,position:'start',style:style});
    	position='end';
      boxCenterizer=-2;
      }
   	else {position='end'; boxCenterizer=-2;}
  	var color = this.attr('stroke');
    if(style==='triangle') {
    	this.marker(position, 10*size+boxCenterizer, 5*size, function(add) {
      	add.path('M'+5*size+' '+2.5*size+' L0 '+5*size+' L 0 0 Z').fill(color).stroke('none'); });
       }
    else if(style==='lines') {
    	this.marker(position, 10*size+boxCenterizer, 5*size, function(add) {
      	add.path('M0.5 0.5 L'+5*size+' '+2.5*size+' L0.5 '+(5*size-0.5)).fill('none').stroke({ color: color }); });
    }
    else {
    	this.marker(position, 10*size+boxCenterizer, 5*size, function(add) {
      	add.path('M'+5*size+' '+2.5*size+' L0 '+5*size+' Q'+2*size+' '+2.5*size+' 0 0 Z').fill(color).stroke('none'); });
     }

    return this;
  }
});




/********************************************
FONCTION ray()
Cette fonction ajoute une flèche au milieu d'une polyline.
Contrairement à la fonction vector(), la flèche ne s'adaptera pas aux
changements de la polyline - il faut relancer la fonction ray().
La fonction accepte 3 paramètres (optionnels) ray({size:1,position:0.5,style:'curved'})
	size: taille relative de la flèche (de 0.2 à l'infini)
	position: position relative de la flèche (0 au début jusqu'à 1 à la fin de la polyline)
	style: 'curved', 'triangle' ou 'lines' (style de la flèche...)
********************************************/

SVG.extend(SVG.Polyline, {
  ray: function({position=0.5,size=1,style='curved'}={position:0.5,size:1,style:'curved'}) {
  	var color = this.attr('stroke');
    var points = this.array().valueOf();
    var firstPoint = points[0];
    var lastPoint = points[points.length-1];
    var midPoint = [];
    for(i=0;i<2;i++) {midPoint[i]=position*lastPoint[i]+(1-position)*firstPoint[i];}
    this.plot([firstPoint,midPoint,lastPoint]);

    if(style=='triangle') {
    	this.marker('mid', 5*size, 5*size, function(add) {
        add.path('M'+5*size+' '+2.5*size+' L0 '+5*size+' L 0 0 Z').fill(color).stroke('none');
      });
    }
    else if(style=='lines') {
    	this.marker('mid', 5*size, 5*size, function(add) {
        add.path('M0.5 0.5 L'+5*size+' '+2.5*size+' L0.5 '+(5*size-0.5)).fill('none').stroke(color);
      });
    }
    else {
      this.marker('mid', 5*size, 5*size, function(add) {
        add.path('M'+5*size+' '+2.5*size+' L0 '+5*size+' Q'+3*size+' '+2.5*size+' 0 0 Z').fill(color).stroke('none');
      });
    }

    return this;
  }
});
