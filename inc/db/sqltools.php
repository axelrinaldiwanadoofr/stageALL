<?php

//////////////////////////////////////////////////////////
// sqltools.php
//
// Ensemble d'outils SQL
//
// 28/10/2005
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

// Requette SQL select
function DbSql( $db, $sql )
	{
	$cursor = $db->buildCursor( $sql ) ;
	return $cursor->fetchAssoc() ;
	}

// Cherche une occurence dans une table
function DbGetRowWhere( $db, $table, $where )
	{
	$cursor = $db->buildCursor( "select * from $table where $where" ) ;
	return $cursor->fetchAssoc() ;
	}

// Cherche une occurence a partir de la valeur d'un champ texte
function DbGetRowWhereStr( $db, $table, $fieldname, $valuestr )
	{
	$value = $db->value2sqlWhere( "string", $valuestr ) ;
	$cursor = $db->buildCursor( "select * from $table where $fieldname $value" ) ;
	return $cursor->fetchAssoc() ;
	}

// Cherche une occurence a partir de la valeur d'un champ numerique
function DbGetRowWhereNumeric( $db, $table, $fieldname, $valuenum )
	{
	$value = $db->value2sqlWhere( "real", $valuenum ) ;
	$cursor = $db->buildCursor( "select * from $table where $fieldname $value" ) ;
	return $cursor->fetchAssoc() ;
	}

// Cherche si une occurence existe
function DbExistStr( $db, $table, $fieldname, $valuestr )
	{
	$cursor = $db->buildCursor( "select * from $table where $fieldname='$valuestr'" ) ;
	if( $cursor->fetchRow() ) return true ;
	return false ;
	}

// Cherche si une occurence existe
function DbExistReal( $db, $table, $fieldname, $valuereal )
	{
	$cursor = $db->buildCursor( "select * from $table where $fieldname=$valuereal" ) ;
	if( $cursor->fetchRow() ) return true ;
	return false ;
	}

// Cherche le maximum d'un champ
function DbMax( $db, $table, $fieldname, $where=null )
	{
	if( $where ) $cursor = $db->buildCursor( "select max( $fieldname ) from $table where $where" ) ;
	else $cursor = $db->buildCursor( "select max( $fieldname ) from $table" ) ;
	$max = $cursor->fetchRow() ;
	if( $max ) return $max[0] ;
	return 0 ;
	}

// Cherche un parametre
function DbParametre( $db, $rubrique, $parametre )
	{
	$cursor = $db->buildCursor( "select value from parametres where rubrique='$rubrique' and parametre='$parametre'" ) ;
	$row = $cursor->fetchRow() ;
	if( $row ) return $row[0] ;
	return 0 ;
	}

// Cherche un parametre et incremente sa valeur
function DbParametreInc( $db, $rubrique, $parametre )
	{
	$cursor = $db->buildCursor( "select value from parametres where rubrique='$rubrique' and parametre='$parametre'" ) ;
	$row = $cursor->fetchRow() ;
	if( $row )
		{
		$value = $row[0] + 1 ;
		$db->execute( "update parametres set value='$value' where rubrique='$rubrique' and parametre='$parametre'" ) ;
		return $value - 1 ;
		}
	return 0 ;
	}

// Recupere la date courante
function DbCurrentDate( $db )
	{
	$dj = getdate() ;
	return $dj["year"] . "-" . $dj["mon"] . "-" . $dj["mday"] ;
	}

// Affiche toutes les donnees ramenee par une requete SQL
// $db: Connecteur a la BD
// $sql: Requete SQL
// $fieldlink: Nom du champ sur lequel placer un lien hypertext
// $script: Script php a executer si lien hypertext
// $argname: Nom de l'argument renseigne par la valeur du champ portant le lien hypertext
function ShowSqlRows( $db, $sql, $fieldlink="", $script=null, $argname=null )
	{
	$cursor = $db->buildCursor( $sql ) ;
	
	$numrow = 0 ;
	echo( "<table>" ) ;
	while( $row = $cursor->fetchAssoc() )
		{
		if( !$numrow )
			{
			echo( "<tr>" ) ;
			foreach( $row as $field=>$value )
				{
				echo( "<td>$field</td>" ) ;
				}
			echo( "</tr>" ) ;
			}
		echo( "<tr>" ) ;
		foreach( $row as $field=>$value )
			{
			if( $field == $fieldlink ) echo( "<td><a href=$script$argname=$value>$value</a></td>" ) ;
			else echo( "<td>$value</td>" ) ;
			}
		echo( "</tr>" ) ;
		$numrow++ ;
		}
	echo( "</table>" ) ;
	}
	
?>