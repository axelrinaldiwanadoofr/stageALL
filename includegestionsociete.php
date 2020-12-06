<?php

// Fichiers concernant les societes
$appctx->loadJsScript( "app/societe/tnsociete.js" ) ;
$appctx->loadJsScript( "app/societe/fmsociete.js" ) ;

// Fichiers concernant les sites
$appctx->loadJsScript( "app/societe/tnsites.js" ) ;
$appctx->loadJsScript( "app/societe/tnsite.js" ) ;
$appctx->loadJsScript( "app/societe/fmsite.js" ) ;

// Fichiers concernant les employes
$appctx->loadJsScript( "app/societe/tnemployes.js" ) ;
$appctx->loadJsScript( "app/societe/tnemploye.js" ) ;
$appctx->loadJsScript( "app/societe/fmemploye.js" ) ;

// Fichier divers
$appctx->loadJsScript( "app/societe/tnsocietedivers.js" ) ;
$appctx->loadJsScript( "app/societe/tntauxhoraire.js" ) ;
$appctx->loadJsScript( "app/societe/tntauxhorairevaleur.js" ) ;
$appctx->loadJsScript( "app/societe/fmtauxhoraire.js" ) ;
$appctx->loadJsScript( "app/societe/fmtauxhorairevaleur.js" ) ;
$appctx->loadJsScript( "app/societe/fmtauxtva.js" ) ;

// fichier de demarrage du module
$appctx->loadJsScript( "app/societe/tngestionsociete.js" ) ;
?>