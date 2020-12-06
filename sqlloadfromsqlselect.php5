<?php
	require_once( "baseinclude.php5") ;

	//session_start() ;

	if( array_key_exists( "config", $_GET ) )	$config = $_GET["config"] ;
	if( array_key_exists( "config", $_POST ) ) $config = $_POST["config"] ;

	$appctx = new AppContexte( "home", "Ayawf" ) ;
	$_POST["appctx"] = $appctx ;
	$cfg = $appctx->loadCfgFile( "app/start/cfg_$config.txt" ) ;
	$appctx->db = new MySqlConnect( $cfg["dbname"], $cfg["dbsrv"], $cfg["dbusr"], $cfg["dbpasswd"] ) ;
	$appctx->db->connect() ;
	
	if( array_key_exists( "sql", $_POST ) )	$sql = $_POST["sql"] ;
	else if( array_key_exists( "sql", $_GET ) )	$sql = $_GET["sql"] ;

	$classname = "" ;
	if( array_key_exists( "classname", $_POST ) )	$classname = $_POST["classname"] ;
	else if( array_key_exists( "classname", $_GET ) )	$classname = $_GET["classname"] ;

	$fieldclassname = "" ;
	if( array_key_exists( "fieldclassname", $_POST ) )	$fieldclassname = $_POST["fieldclassname"] ;
	else if( array_key_exists( "fieldclassname", $_GET ) )	$fieldclassname = $_GET["fieldclassname"] ;
	
	$startrow = 0 ;
	if( array_key_exists( "startrow", $_POST ) )	$startrow = $_POST["startrow"] ;
	else if( array_key_exists( "startrow", $_GET ) )	$startrow = $_GET["startrow"] ;

	$lastrow = 9999999 ;
	if( array_key_exists( "lastrow", $_POST ) )	$lastrow = $_POST["lastrow"] ;
	else if( array_key_exists( "lastrow", $_GET ) )	$lastrow = $_GET["lastrow"] ;
		
	//$appctx =	$_SESSION["appctx"] ;

	if( $appctx )
		{
		//echo( "startrow: $startrow lastrow: $lastrow SQL: $sql " ) ;
		$dbc = $appctx->db->buildCursor( $sql ) ;

		$nrow = $startrow ;
		if( $dbc->goToRow( $nrow ) )
			{
			if( $classname != "" )
				{
				while( $row = $dbc->fetchAssoc() )
					{
					$object = new $classname( $appctx, $row ) ;
					if( $object ) $object->sendAnswerValues( $appctx ) ;
					$nrow++ ;
					}
				}
			else
				{
				while( $row = $dbc->fetchAssoc() && $nrow < $lastrow )
					{
					$classname = $row[$fieldclassname] ;
					$object = new $classname( $appctx, $row ) ;
					if( $object ) $object->sendAnswerValues( $appctx ) ;
					$nrow++ ;
					}
				}
			}
		$appctx->sendAnswersForAjax() ;
		}
?>