<?php
require_once( "includebackofficecms.php" ) ;

// Cree l'objet cms
echo( "<script>var cms = new Cms( false, 0, 0, 0 ) ;</script>" ) ;

// Définition des modèles
$appctx->loadJsScript( "app/cms/mvccms.js" ) ;


// fichier de demarrage du module
//$appctx->loadJsScript( "app/cms/maincms.js" ) ;
?>