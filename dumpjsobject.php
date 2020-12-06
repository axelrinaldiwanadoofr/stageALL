<?php
require_once( "baseinclude.php5") ;

session_start() ;

$appctx = $_SESSION["appctx"] ;
$appctx->debugDumpJsObject( "" ) ;
?>