//Développé le 2019-03-01 par Michaël Juneau

//Classe pour générer des symboles de charge, version +, - ou 0.

SVG.extend(SVG.Circle, {
  charge: function({signe='plus'}={signe:'plus'}) {
  	if(signe==='plus') {
      //TODO trouver comment ajouter les signes avec des lines
      alert('on veut une positive icitte');
    } else if(signe==='moins'){
      alert('on veut une négative icitte');
    }

    return this;
  }
});
