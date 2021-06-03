<?php
	
	require_once( "baseinclude.php") ;

	$config = "" ;
	if( array_key_exists( "config", $_GET ) )	$config = $_GET["config"] ;
	if( array_key_exists( "config", $_POST ) ) $config = $_POST["config"] ;

	$appctx = new AppContexte( "home", "Ayawf" ) ;
	$_POST["appctx"] = $appctx ;
	$cfg = $appctx->loadCfgFile( "app/start/cfg_$config.txt" ) ;
	$appctx->db = new MySqlConnect( $cfg["dbname"], $cfg["dbsrv"], $cfg["dbusr"], $cfg["dbpasswd"] ) ;
	$appctx->db->connect() ;
	
			
	if( $appctx )
	{				
		$url = $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"] ;
		
		$r_page = $appctx->db->buildCursor( "select * from cms_page where url='$url'" ) ;
		$page = $r_page->fetchAssoc() ;
		
		if( $page )
		{
			$module = $page["module"] ;
			$appctx->setTitle( $page["title"] ) ;
			$appctx->setDescription( $page["description"] ) ;
			$appctx->setKeyWords( $page["keywords"] ) ;
		
			$appctx->beginHtmlHead() ;
			$appctx->loadIncJsScripts() ;
			echo( "<script>window.name = \"appctx\" ;</script>" ) ;
			echo( "<script>var config = \"$config\" ;</script>" ) ;
		
			$appctx->endHtmlHead() ;

			$appctx->beginHtmlBody( $cfg["cmscss"] ) ;

			require_once( $cfg["cmsphpstart"] ) ;
		
			$fcmsnode = new CmsNode( $appctx ) ;
		
			$fcmsnode->loadModule( $appctx, $module ) ;		
		
			$rootnode = $fcmsnode->getRootNodeForModule( $module ) ;
			$rootview = $rootnode->createAllViews( $appctx, null, "" ) ;
		
			$fcmsnode->createModeles( $appctx ) ;
		
			$rootview->createDom( $appctx ) ;
			$rootview->createAllJsViews( $appctx ) ;
			$appctx->sendJs( "cms.refreshAllViews() ;" ) ;
			$appctx->sendJs( "cms.startAllActions() ;" ) ;

			$appctx->endHtmlBody() ;
		
			$appctx->sendInstructionsForJs() ;
		}
		else
		{
			echo( "Erreur: Pas de page définie pour l'URL: $url " ) ;
		}
	}
?>