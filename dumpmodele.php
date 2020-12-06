<?php
require_once( "baseinclude.php5") ;

session_start() ;

$appctx = $_SESSION["appctx"] ;
//print_r( $appctx->modelecontrolermanager ) ;
$appctx->modelecontrolermanager->debugDump( "" ) ;
?>