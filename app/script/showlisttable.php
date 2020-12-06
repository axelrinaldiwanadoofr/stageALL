<?php
//////////////////////////////////////////////////////////
// showlisttable.php
//
// Affiche la liste des tables de la bases de donnees
// dont le nom est donne dans l'argument dbname
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "baseinclude.php5") ;

session_start() ;

$appctx = $_SESSION["appctx"] ;

$dbname = $_GET["dbname"] ;

echo( "<h1>Liste des tables de la bases de donnees $dbname:</h1><br><br>" ) ;

if( $appctx->db->selectDB( "INFORMATION_SCHEMA" ) )
	{
	ShowSqlRows( $appctx->db, "select * from tables where table_schema='$dbname'", "TABLE_NAME", "execscript.php5?script=app/script/showtablecolumns.php&dbname=$dbname&", "tablename" ) ;
	}
else echo( "Ne peux pas selectionner la base des schemas" ) ;
?>