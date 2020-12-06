<?php
require_once( "includebackofficecms.php" ) ;

// Cree l'objet cms
echo( "<script>var cms = new Cms( true, 500, 0, 0, 1000, 1000 ) ;</script>" ) ;

// Définition des modèles
$appctx->loadJsScript( "app/cms/mvccms.js" ) ;

// fichier de demarrage du module
$appctx->loadJsScript( "app/cms/maincms.js" ) ;
?>