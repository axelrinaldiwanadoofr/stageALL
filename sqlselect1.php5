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

	if( array_key_exists( "firstnrow", $_POST ) )	$firstnrow = $_POST["firstnrow"] ;
	else if( array_key_exists( "firstnrow", $_GET ) )	$firstnrow = $_GET["firstnrow"] ;

	if( array_key_exists( "lastnrow", $_POST ) )	$lastnrow = $_POST["lastnrow"] ;
	else if( array_key_exists( "lastnrow", $_GET ) )	$lastnrow = $_GET["lastnrow"] ;

	$valuetofind = "" ;
	if( array_key_exists( "valuetofind", $_POST ) )	$valuetofind = $_POST["valuetofind"] ;
	else if( array_key_exists( "valuetofind", $_GET ) )	$valuetofind = $_GET["valuetofind"] ;
	
	//$appctx =	$_SESSION["appctx"] ;
	
	if( $appctx )
		{
		$dbc = $appctx->db->buildCursor( $sql ) ;
		
		$nrow = $firstnrow ;

		if( $dbc->goToRow( $nrow ) )
			{
			while( $row = $dbc->fetchRow() )
				{
				$data = implode( "<sep>", $row ) ;
				$data = $appctx->db->sql2value( "string", $data ) ;
				$appctx->sendAnswer( $data ) ;
				$nrow++ ;
				if( $nrow >= $lastnrow ) break ;
				}
			}
		if( $nrow >= $lastnrow ) $appctx->sendAnswer( "1<sep>$lastnrow" ) ; 
		else $appctx->sendAnswer( "0<sep>$nrow" ) ; 
			
		$appctx->sendAnswersForAjax() ;
		}
?>