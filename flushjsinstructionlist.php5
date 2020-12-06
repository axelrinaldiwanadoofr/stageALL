<?php
	require_once( "baseinclude.php5") ;

	session_start() ;

	if( array_key_exists( "idx", $_POST ) )	$idx = $_POST["idx"] ;
	else if( array_key_exists( "idx", $_GET ) )	$idx = $_GET["idx"] ;

	if( array_key_exists( "appctx", $_SESSION ) )
		{
		$appctx =	$_SESSION["appctx"] ;
		$appctx->setCurrentWindow() ;
		$appctx->sendInstructionsForAjax() ;
		}
	else echo( "Saute" ) ;
?>