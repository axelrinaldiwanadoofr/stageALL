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
	
	$module = "" ;
	if( array_key_exists( "module", $_POST ) ) $module = $_POST["module"] ;
	else if( array_key_exists( "module", $_GET ) ) $module = $_GET["module"] ;

	$version = null ;
	if( array_key_exists( "version", $_POST ) ) $version = $_POST["version"] ;
	else if( array_key_exists( "version", $_GET ) ) $version = $_GET["version"] ;

	$arguments = null ;
	if( array_key_exists( "arguments", $_POST ) )	$arguments = $_POST["arguments"] ;
	else if( array_key_exists( "arguments", $_GET ) )	$arguments = $_GET["arguments"] ;
			
	if( $appctx )
		{		
		$fcmsnode = new CmsNode( $appctx ) ;
		
		$fcmsnode->loadModule( $appctx, $module, $version ) ;
		//$fcmsnode->onAfterLoadObjects( $appctx ) ;
		//$fcmsnode->createAllViews( $appctx ) ;
		$rootnode = $fcmsnode->getRootNodeForModule( $module ) ;
		$rootview = $rootnode->createAllViews( $appctx, null, $arguments ) ;
		
		$fcmsnode->createModeles( $appctx ) ;
		
		$appctx->beginHtmlBuffering() ;
		$rootview->createDom( $appctx ) ;
		$html = $appctx->endHtmlBuffering() ;
		$html = str_replace( "\x0a", "", $html ) ;
		$html = str_replace( "\x5c", "", $html ) ;
		$html = str_replace( "\x22", "\x5c\x22", $html ) ;
                //$html = utf8_decode("toto " . $html) ;
                //$html = "toto " . $html ;
		$appctx->sendJs( "cms.createAllDomObjectFromHtml( \"$html\" ) ;" ) ;

		$rootview->createAllJsViews( $appctx ) ;
		$appctx->sendJs( "cms.refreshAllViews() ;" ) ;
		$appctx->sendJs( "cms.startAllActions() ;" ) ;
		
		$appctx->sendInstructionsForAjax() ;
		}
?>