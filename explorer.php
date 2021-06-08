<?php
require_once( "baseinclude.php") ;

session_start() ;

if( array_key_exists( "jeton", $_POST ) )	$jeton = $_POST["jeton"] ;
else if( array_key_exists( "jeton", $_GET ) )	$jeton = $_GET["jeton"] ;

$window = "appctx" ;
if( array_key_exists( "window", $_POST ) )	$window = $_POST["window"] ;
else if( array_key_exists( "window", $_GET ) )	$window = $_GET["window"] ;

$classname = "" ;
if( array_key_exists( "classname", $_POST ) )	$classname = $_POST["classname"] ;
else if( array_key_exists( "classname", $_GET ) )	$classname = $_GET["classname"] ;

$debug = 0 ;
if( array_key_exists( "debug", $_POST ) )	$debug = $_POST["debug"] ;
else if( array_key_exists( "debug", $_GET ) )	$debug = $_GET["debug"] ;

if( array_key_exists( "appctx", $_SESSION ) )	$appctx = $_SESSION["appctx"] ;

if( $appctx )
	{
	if( $debug || $appctx->testJeton( $jeton ) )
		{
		$appctx->clearAll() ;

		$appctx->beginHtmlHead() ;
		$appctx->endHtmlHead() ;
		$appctx->beginHtmlFrame( "main", "40%,60%,0%" ) ;
		if( $classname != "" ) $appctx->showFrame( "wtreeview.php?classname=$classname", "treeview", $jeton ) ;
		else $appctx->showFrame( "wtreeview.php", "treeview", $jeton ) ;
		$appctx->showFrame( "wsingleformulaire.php", "formulaire", $jeton ) ;
		$appctx->showFrame( "nothing.php", "nothing", $jeton ) ;
		$appctx->endHtmlFrame() ;
		$appctx->endHtml() ;
		}
	else echo( "Session non valide, veuillez voue reconnecter." ) ;
	}
else echo( "Pas de session, veuillez vous reconnecter." ) ;


?>