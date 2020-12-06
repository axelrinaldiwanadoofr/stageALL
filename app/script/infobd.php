<?php
//////////////////////////////////////////////////////////
// showlistdb.php
//
// Affiche la liste des bases de donnees
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

echo( "<h1>Liste des bases de donnees:</h1><br><br>" ) ;

if( $appctx->db->selectDB( "INFORMATION_SCHEMA" ) )
	{
	ShowSqlRows( $appctx->db, "select * from schemata" ) ;
	}
else echo( "Ne peux pas selectionner la base des schemas" ) ;
?>