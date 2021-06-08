<?php
	require_once( "baseinclude.php") ;

	session_start() ;

	if( array_key_exists( "idx", $_POST ) )	$idx = $_POST["idx"] ;
	else if( array_key_exists( "idx", $_GET ) )	$idx = $_GET["idx"] ;

	$appctx =	$_SESSION["appctx"] ;

	if( $appctx )
		{
		$appctx->setCurrentWindow() ;

		$menuitem = $appctx->getJsObjectByIdx( $idx ) ;

		$menuitem->onClick( $appctx ) ;

		$appctx->sendInstructionsForAjax() ;
		}
?>