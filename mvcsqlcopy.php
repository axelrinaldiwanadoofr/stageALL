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

	if( array_key_exists( "classname", $_POST ) )	$classname = $_POST["classname"] ;
	else if( array_key_exists( "classname", $_GET ) )	$classname = $_GET["classname"] ;

	if( array_key_exists( "keystring", $_POST ) )	$keystring = $_POST["keystring"] ;
	else if( array_key_exists( "keystring", $_GET ) )	$keystring = $_GET["keystring"] ;

	$rowstring = null ;
	if( array_key_exists( "rowstring", $_POST ) )	$rowstring = $_POST["rowstring"] ;
	else if( array_key_exists( "rowstring", $_GET ) )	$rowstring = $_GET["rowstring"] ;
	
	//$appctx =	$_SESSION["appctx"] ;

	if( $appctx )
		{
		// Genere la key et le row
		$key = createRowFromString( $keystring ) ;
		$row = createRowFromString( $rowstring ) ;

		// Cree la factory et charge l'objet 
		$factory = new $classname( $appctx ) ;
		$object = $factory->loadObjectFromKey( $appctx, $key ) ;
		$factory->onAfterLoadObjects( $appctx ) ;

		if( $object )
			{
			$copy = $object->createCopy( $appctx, $row ) ;
			$copy->save() ;
			$factory->sendAnswerValuesOnlyFor( $appctx, $copy ) ;
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