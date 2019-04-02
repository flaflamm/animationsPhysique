<?php
//Liste des animations existantes : queryString=>{titre, cours, chemin}
$animations = array(
  'penombre'=>array('titre'=>'Ombre & Pénombre', 'cours'=>'A42', 'chemin'=>'A42/penombre.html'),
	'accerateurLineaire'=>array('titre'=>'Accélérateur Linéaire', 'cours'=>'C42', 'chemin'=>'C42/accelerateurLineaire.html'),
  'resistanceEcoulementTube'=>array('titre'=>'Résistance à l\'écoulement dans un tube', 'cours'=>'143', 'chemin'=>'143/resistanceEcoulementTube.html'),
  'resistanceEcoulement'=>array('titre'=>'Résistance à l\'écoulement dans un orifice', 'cours'=>'143', 'chemin'=>'143/resistanceEcoulement.html')
  //'ombre'=>array('titre'=>'Ombre & Pénombre', 'cours'=>'A42', 'chemin'=>'A42/penombre.html')
);
//Liste des cours : code=>titre
$cours = array(
  'NYA'=>'Mécanique',
  'NYB'=>'Électricité & Magnétisme',
  'NYC'=>'Ondes & Physique Moderne',
	'143'=>'Principes physiques des appareils d\'inhalothérapie',
  'A42'=>'Phénomènes Physique (Radiodiagnostic)',
	'C42'=>'Phénomènes Physique (Radio-oncologie)'
);
?>

<!DOCTYPE html>
<html  lang="fr">

<head>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width, initial-scale=1">

 <title>Animations Interactives en Physique</title>

 <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600" rel="stylesheet">

 <link href="utils/base.css" rel="stylesheet">
 <link href="utils/mainStyle.css?v=<?php echo mt_rand(); ?>" rel="stylesheet">

 <!--MathJax pour les équations-->
 <script type="text/x-mathjax-config">
 MathJax.Hub.Config({
   tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
 });
 </script>
 <script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-MML-AM_CHTML' async></script>

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
<header><h1><a href="index.php">Animations Interactives en Physique</a><?php if(isset($_GET['anim']) && isset($animations[$_GET['anim']])) {echo '<span class="small">'.$animations[$_GET['anim']]['titre'].'</span>';}?></h1></header>
<main>
<?php
//Si $_GET['anim'] est défini (querystring), afficher l'animation demandée, sinon afficher une liste des animations existantes.
if(isset($_GET['anim']) && isset($animations[$_GET['anim']])) {include($animations[$_GET['anim']]['chemin']);}
else {
  foreach($cours as $code=>$titre) {
    echo "<div><h2>$titre</h2>";
    foreach($animations as $query=>$animation) { if($animation['cours']==$code) {
      echo "<a class='list' href='index.php?anim=$query'>$animation[titre]</a>";
    }}
    echo '</div>';
  }
}
 ?>

</main>
<footer><a href='http://www.cegep-ste-foy.qc.ca'><img src='utils/logocsf.svg'></a></footer>

</body>
</html>
