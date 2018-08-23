<?php
//Liste des animations existantes : queryString=>{titre, cours, chemin}
$animations = array(
  'bourdon'=>array('titre'=>'Manomètre de Bourdon', 'cours'=>'143', 'chemin'=>'flash/Inhalo/bourdon.swf'),
	'bouteille'=>array('titre'=>'Bouteilles de gaz', 'cours'=>'143', 'chemin'=>'flash/Inhalo/bouteille.swf'),
	'detendeur'=>array('titre'=>'Le détendeur de pression', 'cours'=>'143', 'chemin'=>'flash/Inhalo/detendeur.swf'),
	'ecoulement'=>array('titre'=>'Résistance à l\'écoulement dans un tuyau', 'cours'=>'143', 'chemin'=>'flash/Inhalo/ecoulement.swf'),
	'injecteurventuri'=>array('titre'=>'Injecteur venturi', 'cours'=>'143', 'chemin'=>'flash/Inhalo/injecteurventuri.swf'),
	'orifice'=>array('titre'=>'Résistance à l\'écoulement dans un orifice', 'cours'=>'143', 'chemin'=>'flash/Inhalo/orifice.swf'),
	'pompe'=>array('titre'=>'Pompe à liquides domestiques', 'cours'=>'143', 'chemin'=>'flash/Inhalo/pompe.swf'),
	'rotametre'=>array('titre'=>'Rotamètre', 'cours'=>'143', 'chemin'=>'flash/Inhalo/rotamètre.swf'),
	'thermogalilee'=>array('titre'=>'Thermomètre de Galilée', 'cours'=>'143', 'chemin'=>'flash/Inhalo/thermogalilee.swf')
);

//Liste des cours : code=>titre
$cours = array(
  '143'=>'Principes Physiques des appareils d\'inhalothérapie'
);


//Si $_GET['anim'] est défini (querystring), afficher l'animation demandée, sinon afficher une liste des animations existantes.
if(isset($_GET['anim']) && isset($animations[$_GET['anim']])) {
	echo '<embed type="application/x-shockwave-flash" src="'.$animations[$_GET['anim']]['chemin'].'" width="100%" height="100%">';
}
else {
?>

<!DOCTYPE html>
<html  lang="fr">

<head>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
 <title>Animations Interactives en Physique</title>

 <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600" rel="stylesheet">

 <link href="utils/base.css" rel="stylesheet">
 <link href="utils/mainStyle.css?v=<?php echo mt_rand(); ?>" rel="stylesheet">
 <script type="text/javascript" src="utils/svg.min.js"></script>

 <script> //Script affichant un message si le navigateur de l'utilisateur est dépassé.
   var $buoop = {required:{e:-4,f:-3,o:-3,s:-1,c:-3},insecure:true,unsupported:true,api:2018.05 };
   function $buo_f(){
     var e = document.createElement("script");
     e.src = "//browser-update.org/update.min.js";
     document.body.appendChild(e);
   };
   try {document.addEventListener("DOMContentLoaded", $buo_f,false)}
   catch(e){window.attachEvent("onload", $buo_f)}
 </script>
</head>

<body>
<header><h1><a href="flash.php">Animations Interactives en Physique</a></h1></header>
<main>
<?php
  foreach($cours as $code=>$titre) {
    echo "<div><h2>$titre</h2>";
    foreach($animations as $query=>$animation) { if($animation['cours']==$code) {
      echo "<a class='list' href='flash.php?anim=$query'>$animation[titre]</a>";
    }}
    echo '</div>';
  }
?>
</main>
</body>
</html>
<?php } ?>
