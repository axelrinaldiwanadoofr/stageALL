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

	if( array_key_exists( "rowstring", $_POST ) )	$rowstring = $_POST["rowstring"] ;
	else if( array_key_exists( "rowstring", $_GET ) )	$rowstring = $_GET["rowstring"] ;

	if( array_key_exists( "classname", $_POST ) )	$classname = $_POST["classname"] ;
	else if( array_key_exists( "classname", $_GET ) )	$classname = $_GET["classname"] ;

	$mainclassname = "" ;
	if( array_key_exists( "mainclassname", $_POST ) )	$mainclassname = $_POST["mainclassname"] ;
	else if( array_key_exists( "mainclassname", $_GET ) )	$mainclassname = $_GET["mainclassname"] ;

	if( array_key_exists( "mainkeystring", $_POST ) )	$mainkeystring = $_POST["mainkeystring"] ;
	else if( array_key_exists( "mainkeystring", $_GET ) )	$mainkeystring = $_GET["mainkeystring"] ;

	if( array_key_exists( "keystring", $_POST ) )	$keystring = $_POST["keystring"] ;
	else if( array_key_exists( "keystring", $_GET ) )	$keystring = $_GET["keystring"] ;

	//$appctx =	$_SESSION["appctx"] ;

	if( $appctx )
		{
		if( $mainclassname != "" )
			{
			$mainkey = createRowFromString( $mainkeystring ) ;
			$key = createRowFromString( $keystring ) ;
			$row = createRowFromString( $rowstring ) ;
			$object = new $mainclassname( $appctx, $mainkey ) ;

			//echo( "mainkeystring: $mainkeystring " ) ;
			//foreach( $mainkey as $n=>$v ) echo( "$n:$v " ) ;
			//echo( "keystring: $keystring " ) ;
			//foreach( $key as $n=>$v ) echo( "$n:$v " ) ;

			if( $object )
				{
				$child = $object->getChildObject( $classname, $key ) ;
				if( $child )
					{
					//echo( "child: $keystring" ) ;
					if( $child->updateFromRow( $appctx, $row ) )
						$object->onValueChanged( $appctx ) ;
					}
				$object->save( $appctx ) ;
				$object->sendAnswerValues( $appctx ) ;
				}
			}
		else
			{
			//echo( "keystring: $keystring " ) ;
			$key = createRowFromString( $keystring ) ;
			//foreach( $key as $n=>$v ) echo( "$n:$v " ) ;
			//echo( "rowstring: $rowstring " ) ;
			$row = createRowFromString( $rowstring ) ;
			$object = new $classname( $appctx, $key ) ;

			if( $object )
				{
				$object->updateFromRow( $appctx, $row ) ;
				$object->save() ;
				$object->sendAnswerValues( $appctx ) ;
				}
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