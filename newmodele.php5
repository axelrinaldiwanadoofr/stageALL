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

	if( array_key_exists( "classname", $_POST ) )	$classname = $_POST["classname"] ;
	else if( array_key_exists( "classname", $_GET ) )	$classname = $_GET["classname"] ;
	
	$rowstring = null ;
	if( array_key_exists( "rowstring", $_POST ) )	$rowstring = $_POST["rowstring"] ;
	else if( array_key_exists( "rowstring", $_GET ) )	$rowstring = $_GET["rowstring"] ;


	//$appctx =	$_SESSION["appctx"] ;

	if( $appctx )
		{
		$row = null ;
		if( $rowstring ) $row = createRowFromString( $rowstring ) ;

		$object = new $classname( $appctx, $row, true ) ;

		$object->save() ;
		$object->sendAnswerValues( $appctx ) ;

		$appctx->sendAnswersForAjax() ;
		}
		
	// Cree un tableau de row � partir de la chaine de valeur
	// field:=:value%%field:=:value ...
	function createRowFromString( $str )
		{
		$result = array() ;
		$fields = explode( "<sep>" , $str ) ;
		foreach( $fields as $n=>$fieldstr )
			{
			$data = explode( "<eql>", $fieldstr ) ;
			$result[$data[0]] = $data[1] ;
			}
		return $result ;
		}		
?>