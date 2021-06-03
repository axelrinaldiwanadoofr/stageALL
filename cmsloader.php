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
		//$appctx->setUserId( $row["id"] ) ;

		echo( "<script>window.name = \"appctx\" ;</script>" ) ;
		echo( "<script>var config = \"$config\" ;</script>" ) ;

		//$appctx->debug = $debug ;
				
		$appctx->beginHtmlHead() ;
		$appctx->loadIncJsScripts() ;
		
		$appctx->endHtmlHead() ;

		$appctx->beginHtmlBody( $cfg["cmscss"] ) ;

		require_once( $cfg["cmsphpstart"] ) ;
		
		$fcmsnode = new CmsNode( $appctx ) ;
		
		$fcmsnode->loadModule( $appctx, $module, $version ) ;		
		
		$rootnode = $fcmsnode->getRootNodeForModule( $module ) ;
		$rootview = $rootnode->createAllViews( $appctx, null, $arguments ) ;
		
		$fcmsnode->createModeles( $appctx ) ;
		
		$rootview->createDom( $appctx ) ;
		$rootview->createAllJsViews( $appctx ) ;
		$appctx->sendJs( "cms.refreshAllViews() ;" ) ;
		$appctx->sendJs( "cms.startAllActions() ;" ) ;

		$appctx->endHtmlBody() ;
		
		$appctx->sendInstructionsForJs() ;
		}
?>