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

	if( array_key_exists( "nrow", $_POST ) ) $nrow = $_POST["nrow"] ;
	else if( array_key_exists( "nrow", $_GET ) ) $nrow = $_GET["nrow"] ;

	if( array_key_exists( "rowcount", $_POST ) ) $rowcount = $_POST["rowcount"] ;
	else if( array_key_exists( "rowcount", $_GET ) ) $rowcount = $_GET["rowcount"] ;
	
	//$appctx =	$_SESSION["appctx"] ;
	
	if( $appctx )
		{
		$dbc = $appctx->db->buildCursor( $sql ) ;

		$n = 0 ;		
		if( $dbc->goToRow( $nrow ) )
			{
			while( $row = $dbc->fetchRow() )
				{
				$data = implode( "<sep>", $row ) ;
				$data = $appctx->db->sql2value( "string", $data ) ;
				$appctx->sendAnswer( $data ) ;
				$n++ ;
				$nrow++ ;
				if( $n >= $rowcount ) break ;
				}
			}
		if( $n >= $rowcount ) $appctx->sendAnswer( "1<sep>$nrow" ) ; 
		else $appctx->sendAnswer( "0<sep>$nrow" ) ; 
			
		$appctx->sendAnswersForAjax() ;
		}
?>