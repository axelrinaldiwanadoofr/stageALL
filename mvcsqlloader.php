<?php
	require_once( "baseinclude.php") ;

	//session_start() ;

	if( array_key_exists( "config", $_GET ) )	$config = $_GET["config"] ;
	if( array_key_exists( "config", $_POST ) ) $config = $_POST["config"] ;

	$appctx = new AppContexte( "home", "Ayawf" ) ;
	$_POST["appctx"] = $appctx ;
	$cfg = $appctx->loadCfgFile( "app/start/cfg_$config.txt" ) ;
	$appctx->db = new MySqlConnect( $cfg["dbname"], $cfg["dbsrv"], $cfg["dbusr"], $cfg["dbpasswd"] ) ;
	$appctx->db->connect() ;
	
	$from = "" ;
	if( array_key_exists( "from", $_POST ) ) $from = $_POST["from"] ;
	else if( array_key_exists( "from", $_GET ) ) $from = $_GET["from"] ;

	$where = null ;
	if( array_key_exists( "where", $_POST ) ) $where = $_POST["where"] ;
	else if( array_key_exists( "where", $_GET ) ) $where = $_GET["where"] ;

	$orderby = null ;
	if( array_key_exists( "orderby", $_POST ) )	$orderby = $_POST["orderby"] ;
	else if( array_key_exists( "orderby", $_GET ) )	$orderby = $_GET["orderby"] ;
	
	$classname = "" ;
	if( array_key_exists( "classname", $_POST ) )	$classname = $_POST["classname"] ;
	else if( array_key_exists( "classname", $_GET ) )	$classname = $_GET["classname"] ;

	$fieldclassname = "" ;
	if( array_key_exists( "fieldclassname", $_POST ) )	$fieldclassname = $_POST["fieldclassname"] ;
	else if( array_key_exists( "fieldclassname", $_GET ) )	$fieldclassname = $_GET["fieldclassname"] ;
	
	$firstnrow = 0 ;
	if( array_key_exists( "firstnrow", $_POST ) )	$firstnrow = $_POST["firstnrow"] ;
	else if( array_key_exists( "firstnrow", $_GET ) )	$firstnrow = $_GET["firstnrow"] ;

	$lastnrow = 9999999 ;
	if( array_key_exists( "lastnrow", $_POST ) )	$lastnrow = $_POST["lastnrow"] ;
	else if( array_key_exists( "lastnrow", $_GET ) )	$lastnrow = $_GET["lastnrow"] ;
		
	//$appctx =	$_SESSION["appctx"] ;

	if( $appctx )
		{
		//echo( "firstnrow: $firstnrow lastnrow: $lastnrow SQL: $from $where $orderby " ) ;
		
		$factory = new $classname( $appctx ) ;
		
		$factory->loadObjectsFromWhereWithNrowLimits( $appctx, $from, $where, $orderby, $firstnrow, $lastnrow ) ;
		$factory->onAfterLoadObjects( $appctx ) ;

		$factory->sendAnswerValues( $appctx ) ;

		$appctx->sendAnswersForAjax() ;
		}
?>