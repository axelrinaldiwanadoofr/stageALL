<?php
	require_once( "baseinclude.php5") ;

	session_start() ;
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

	if( array_key_exists( "state", $_POST ) )	$state = $_POST["state"] ;
	else if( array_key_exists( "state", $_GET ) )	$state = $_GET["state"] ;
	
	//$appctx =	$_SESSION["appctx"] ;
	
	// Demarre une requete de mise a jour en completant les donnees recues par plusieurs appels
	$doupdate = false ;
	if( $state == "start" )
		{
		$_SESSION["nbrequest"] = 0 ;		
		$_SESSION["rowstring0"] = $rowstring ;
		$appctx->sendAnswersForAjax() ;
		}
	elseif( $state == "continue" )
		{
		$_SESSION["nbrequest"]++ ;		
		$i = $_SESSION["nbrequest"] ;		
		$_SESSION["rowstring" . $i] = $rowstring ;
		$appctx->sendAnswersForAjax() ;
		}
	elseif( $state == "end" )
		{
		$r = "" ;
		$n = $_SESSION["nbrequest"] ;		
		for( $i=0 ; $i<=$n ; $i++ ) $r .= $_SESSION["rowstring" . $i] ;
		$r .= $rowstring ;
		$rowstring = $r ;
		$doupdate = true ;
		}
	else
		{
		$doupdate = true ;
		}
	if( $doupdate )
		{
		// Traite la requete de mise a jour
		if( $mainclassname != "" )
			{
			// Mise à jour d'un objet à partir d'un objet principal auquel il appartient
			
			// Reconstitue le row et le key à partir du rowstring et du keystring
			$mainkey = createRowFromString( $mainkeystring ) ;
			$key = createRowFromString( $keystring ) ;
			$row = createRowFromString( $rowstring ) ;

			// Cree une instance de la factory pour le l'objet principal charge l'instance de l'objet principal
			$mainfactory = new $mainclassname( $appctx ) ;
			$mainobject = $mainfactory->loadObjectFromKey( $appctx, $mainkey ) ;
			
			$mainfactory->onAfterLoadObjects( $appctx ) ;

			//echo( "mainkeystring: $mainkeystring " ) ;
			//foreach( $mainkey as $n=>$v ) echo( "$n:$v " ) ;
			//echo( "keystring: $keystring " ) ;
			//foreach( $key as $n=>$v ) echo( "$n:$v " ) ;

			if( $mainobject )
				{
				$childobject = $mainobject->getChildObject( $classname, $key ) ;
				if( $childobject )
					{
					//echo( "child: $keystring" ) ;
					if( $childobject->updateAttributesFromRow( $appctx, $row ) )
						{
						$mainobject->onValueChanged( $appctx ) ;
						$mainobject->setToUpdate() ;
						}
					}
				$mainobject->save( $appctx ) ;
				$mainfactory->sendAnswerValues( $appctx ) ;
				}
			}
		else
			{
			// Reconstitue le row et le key à partir du rowstring et du keystring
			$key = createRowFromString( $keystring ) ;
			$row = createRowFromString( $rowstring ) ;
			
			// Cree la factory et charge l'objet 
			$factory = new $classname( $appctx ) ;
			$object = $factory->loadObjectFromKey( $appctx, $key ) ;

			$factory->onAfterLoadObjects( $appctx ) ;
			
			if( $object )
				{
				$object->updateAttributesFromRow( $appctx, $row ) ;
				$object->save() ;
				$factory->sendAnswerValues( $appctx ) ;
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