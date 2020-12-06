<?php
//////////////////////////////////////////////////////////
// showtablecolumns.php
//
// Affiche la liste des champs de la tables tablename de la base de donnee
// dont le nom est donne dans l'argument dbname
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "baseinclude.php5") ;

session_start() ;

$appctx = $_SESSION["appctx"] ;

$dbname = $_GET["dbname"] ;
$tablename = $_GET["tablename"] ;

echo( "<h1>Liste des champs de la table $tablename:</h1><br><br>" ) ;

if( $appctx->db->selectDB( "INFORMATION_SCHEMA" ) )
	{
	ShowSqlRows( $appctx->db, "select * from columns where table_schema='$dbname' and table_name='$tablename'" ) ;
	}
else echo( "Ne peux pas selectionner la base des schemas" ) ;
?>