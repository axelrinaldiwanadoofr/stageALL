<?php
//////////////////////////////////////////////////////////
// execscript.php5
//
// Execute le script php dans l'argument script avec
// l'environnement appctx
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "baseinclude.php5") ;

session_start() ;

$appctx = $_SESSION["appctx"] ;

$script = $_GET["script"] ;

//echo $script ;
require_once( "$script") ;

?>