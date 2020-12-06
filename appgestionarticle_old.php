<?php
require_once( "baseinclude.php5") ;

session_cache_limiter( 'nocache' );
session_start() ;

if( array_key_exists( "jeton", $_POST ) )	$jeton = $_POST["jeton"] ;
else if( array_key_exists( "jeton", $_GET ) )	$jeton = $_GET["jeton"] ;

$window = "appctx" ;
if( array_key_exists( "window", $_POST ) )	$window = $_POST["window"] ;
else if( array_key_exists( "window", $_GET ) )	$window = $_GET["window"] ;*/

$debug = 0 ;
if( array_key_exists( "debug", $_POST ) )	$debug = $_POST["debug"] ;
else if( array_key_exists( "debug", $_GET ) )	$debug = $_GET["debug"] ;

if( array_key_exists( "appctx", $_SESSION ) )	$appctx = $_SESSION["appctx"] ;


if( $appctx )
	{
	if( $debug || $appctx->testJeton( $jeton ) )
		{
		$appctx->beginHtmlHead() ;
		$appctx->loadJsScript() ;
		$appctx->endHtmlHead() ;

		$appctx->beginHtmlBody() ;

		// Fichiers concernant les article
		$appctx->runJsScript( "app/article/tnarticles.js" ) ;
		$appctx->runJsScript( "app/article/tnarticle.js" ) ;
		$appctx->runJsScript( "app/article/tnlistearticles.js" ) ;

		$appctx->runJsScript( "app/article/tnarticleproperties.js" ) ;
		$appctx->runJsScript( "app/article/tnarticlepropertyrubrique.js" ) ;
		$appctx->runJsScript( "app/article/tnapstring.js" ) ;
		$appctx->runJsScript( "app/article/tnapstringml.js" ) ;
		$appctx->runJsScript( "app/article/tnapimage.js" ) ;
		$appctx->runJsScript( "app/article/tnaprefarticle.js" ) ;
		$appctx->runJsScript( "app/article/tnaptexte.js" ) ;

		// Gestion des regroupements d'article
		$appctx->runJsScript( "app/article/tnarticleregroupements.js" ) ;
		$appctx->runJsScript( "app/article/tnarticleregroupement.js" ) ;

		// Valeurs et articles des regroupements
		$appctx->runJsScript( "app/article/tnarroot.js" ) ;
		$appctx->runJsScript( "app/article/tnarvalue.js" ) ;

		$appctx->runJsScript( "app/article/fmarticle.js" ) ;
		$appctx->runJsScript( "app/article/fmapstring.js" ) ;
		$appctx->runJsScript( "app/article/fmapstringml.js" ) ;
		$appctx->runJsScript( "app/article/fmaptexte.js" ) ;
		$appctx->runJsScript( "app/article/fmapimage.js" ) ;
		$appctx->runJsScript( "app/article/fmaprefarticle.js" ) ;

		$appctx->runJsScript( "app/article/fmarticleregroupement.js" ) ;

		// fichiers concernant les propriétés
		$appctx->runJsScript( "app/property/tnpropertyrubriques.js" ) ;
		$appctx->runJsScript( "app/property/tnpropertyrubrique.js" ) ;
		$appctx->runJsScript( "app/property/tnproperty.js" ) ;

		$appctx->runJsScript( "app/property/fmpropertyrubrique.js" ) ;
		$appctx->runJsScript( "app/property/fmproperty.js" ) ;

		// fichier de demarrage du module
		$appctx->runJsScript( "app/article/mdarticle.js" ) ;

		$appctx->endHtmlBody() ;
		}
	else echo( "Session non valide, veuillez vous reconnecter." ) ;
	}
else echo( "Pas de session, veuillez vous reconnecter." ) ;

?>