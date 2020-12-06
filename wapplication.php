<?php
require_once( "baseinclude.php5") ;

session_start() ;

if( array_key_exists( "jeton", $_POST ) )	$jeton = $_POST["jeton"] ;
else if( array_key_exists( "jeton", $_GET ) )	$jeton = $_GET["jeton"] ;

$window = "appctx" ;
if( array_key_exists( "window", $_POST ) )	$window = $_POST["window"] ;
else if( array_key_exists( "window", $_GET ) )	$window = $_GET["window"] ;

$viewclassname = "" ;
if( array_key_exists( "viewclassname", $_GET ) )	$viewclassname = $_GET["viewclassname"] ;
if( array_key_exists( "viewclassname", $_POST ) ) $viewclassname = $_POST["viewclassname"] ;

$objectclassname = "" ;
if( array_key_exists( "objectclassname", $_GET ) )	$objectclassname = $_GET["objectclassname"] ;
if( array_key_exists( "objectclassname", $_POST ) ) $objectclassname = $_POST["objectclassname"] ;

$modelekey = "" ;
if( array_key_exists( "keystring", $_GET ) )	$keystring = $_GET["keystring"] ;
if( array_key_exists( "keystring", $_POST ) ) $keystring = $_POST["keystring"] ;

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

		$appctx->runJsScript( "app/article/fm_article.js" ) ;

		$appctx->endHtmlBody() ;
		}
	else echo( "Session non valide, veuillez vous reconnecter." ) ;
	}
else echo( "Pas de session, veuillez vous reconnecter." ) ;

?>