<?php
require_once( "baseinclude.php") ;
require_once( "inc/treeview/treeview.php") ;
require_once( "inc/treeview/treenode.php") ;
require_once( "inc/formulaire/singleformulairecontroler.php") ;
require_once( "inc/formulaire/multiformulairecontroler.php") ;
require_once( "inc/mvc/mvcviewcontrolermanager.php") ;

session_start() ;

$appctx =	$_SESSION["appctx"] ;

$appctx->setCurrentWindow( "formulaire" ) ;

$viewclassname = "" ;
if( array_key_exists( "viewclassname", $_GET ) )	$viewclassname = $_GET["viewclassname"] ;
if( array_key_exists( "viewclassname", $_POST ) ) $viewclassname = $_POST["viewclassname"] ;

$modelecontrolerid = "" ;
if( array_key_exists( "modelecontrolerid", $_GET ) )	$modelecontrolerid = $_GET["modelecontrolerid"] ;
if( array_key_exists( "modelecontrolerid", $_POST ) ) $modelecontrolerid = $_POST["modelecontrolerid"] ;

$modelenrow = "" ;
if( array_key_exists( "modelenrow", $_GET ) )	$modelenrow = $_GET["modelenrow"] ;
if( array_key_exists( "modelenrow", $_POST ) ) $modelenrow = $_POST["modelenrow"] ;

$viewcontroler = null ;

if( $viewclassname != "" && $modelecontrolerid != "" && $modelenrow != "" )
	{
	$viewcontroler = $appctx->mvcviewcontrolermanager->getViewControler( $viewclassname ) ;
	$modelecontroler = $appctx->objectmanager->getObjectByIdx( $modelecontrolerid ) ;
	if( !$viewcontroler )
		{
		$viewcontroler = new MultiFormulaireControler( $appctx, $viewclassname, $modelecontroler, 8 ) ;
		$appctx->mvcviewcontrolermanager->addViewControler( $viewcontroler ) ;
		}
	else $viewcontroler->setModeleControler( $modelecontroler ) ;
	}

$appctx->jsobjectmanager->createAllJsObjects( $appctx ) ;

$appctx->beginHtmlHead() ;
$appctx->loadJsScript() ;
$appctx->endHtmlHead() ;

$appctx->beginHtmlBody() ;

if( $viewcontroler )
	{
	$layout = new ChPage( $appctx ) ;

	$viewcontroler->doLayout( $appctx, $layout ) ;

	$appctx->domobjectmanager->createAllDomObject( $appctx ) ;
	$layout->createDomObject( $appctx ) ;

	$viewcontroler->goToRow( $appctx, $modelenrow ) ;
	}

$appctx->jsinstructionlistmanager->sendJsInstructions() ;

$appctx->endHtmlBody() ;
?>