//Développé le 2019-02-28 par Michaël Juneau

//Classe pour conserver les données de cinématique pour la position, vitesse et accélération
//Son utilisation devrait prendre compte des traductions entre le système de coordonnées globales à l'écran
//(0,0) étant dans le coin supérieur gauche, l'axe des y orienté positivement vers le bas; c'est le système utilisé
//par les méthodes de SVG.draw dans son viewbox. 'x' et 'y' devraient être en coordonnées globales.
//les coordonnées locales sont celles de la simulation et devraient remplir un besoin spécifique. C'est pourquoi
//il y a quelques méthodes statiques exemples pour effectuer la traduction de locale->globale
//cX et cY est le centre du système de coordonnées locales tel que représenté dans le système global
class Cinema{
      constructor(x, y, vX, vY, aX, aY, cX, cY){
      this.x = x;
      this.y = y;
      this.vX = vX;
      this.vY = vY;
      this.aX = aX;
      this.aY = aY;
      this.cX = cX;
      this.cY = cY;
      }

      //Ces deux méthodes permettent de retrouver les coordonnées du système local au centre (cX, cY)
      localX(){ return (this.x - this.cX); }
      localY(){ return -(this.y - this.cY); }

      //Ces deux méthodes acceptent des positions locales et les sauvegardent en coordonnées globales
      saveAsGlobalX(localX){ this.x = localX + this.cX; }
      saveAsGlobalY(localY){ this.y = -localY + this.cY; }
}
