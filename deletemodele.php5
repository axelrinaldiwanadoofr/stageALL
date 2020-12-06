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

	if( array_key_exists( "keystring", $_POST ) )	$keystring = $_POST["keystring"] ;
	else if( array_key_exists( "keystring", $_GET ) )	$keystring = $_GET["keystring"] ;

	//$appctx =	$_SESSION["appctx"] ;

	if( $appctx )
		{
		$key = createRowFromString( $keystring ) ;
		$object = new $classname( $appctx, $key ) ;

		if( $object )
			{
			$object->remove() ;
			$object->save() ;
			$object->sendAnswerValues( $appctx ) ;
			}
		$appctx->sendAnswersForAjax() ;
		}

	// Cree un tableau de row à partir de la chaine de valeur
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