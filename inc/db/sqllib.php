<?php

//////////////////////////////////////////////////////////
// sqllib.php
//
// Outils de base les access aux bases de données
// relationnelles SQL.
//
// 28/10/2005
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Class interface d'un curseur
// de données relationnelle SQL
///////////////////////////////////////////////////////////
class DbCursor
	{
	//
	// Ouvre le curseur sur la requette
	//
	function Open( $sqltxt )
		{
		return false ;
		}
	//
	// Ferme le curseur sur la requette
	//
	function Close()
		{
		}
	//
	// Renvoie le nom du champ n° num
	//
	function FieldName( $num )
		{
		return 0 ;
		}

	//
	// Renvoie le type du champ n° num
	//
	function FieldType( $num )
		{
		return 0 ;
		}
	//
	// Renvoie le nombre de champs
	//
	function NbFields()
		{
		return 0 ;
		}
	//
	// Renvoie la valeur SQL du champ n° num
	//
	function SqlValue( $num )
		{
		return 0 ;
		}

	//
	// Effectue un fetch de tous les champs d'un enregistrement
	// et passe à l'enregistrement suivant
	// Renvoie un tableau de valeur a indexation numerique
	// Renvoie 0 si arrive en fin de curseur.

	function FetchRow()
		{
		return 0 ;
		}
	//
	// Effectue un fetch de tous les champs d'un enregistrement
	// et passe à l'enregistrement suivant
	// Renvoie un tableau associatif de valeur.
	// Renvoie 0 si arrive en fin de curseur.

	function FetchArray()
		{
		return 0 ;
		}
	}

///////////////////////////////////////////////////////////
// Class interface d'un connecteur a une base
// de données relationnelle SQL
///////////////////////////////////////////////////////////
class DbConnect
	{
	//
	// Connection a la base de donnee
	//
	function Connecter()
		{
		return false ;
		}
	//
	// Fermer le connecteur
	//
	function Fermer()
		{
		}
	//
	// Creation d'un curseur
	//
	function BuildCursor( $sqltxt )
		{
		return 0 ;
		}

	function Execute( $sqltxt )
		{
		return 0 ;
		}
	//
	// Convertie la valeur contenue dans $value
	// en valeur SQL pour le type donne par $type
	// dans le cas d'un insert ou d'un update
	//
	function value2sql( $type, $value )
		{
		if( $type == "VARCHAR" || $type == "varchar" || $type == "char" )
			{
			if( $value == "") return " null" ;
			return "'" . $value . "'" ;
			}
		else if( $type == "DATETIME" )
			{
			if( $value == "") return " null" ;
			return strftime( "#%Y-%m-%d %H:%M:%S#", $value ) ;
			}
		return $value ;
		}
	//
	// Convertie la valeur contenue dans $value
	// en valeur SQL pour le type donne par $type
	// dans le cas d'un WHERE
	//
	function value2sqlWhere( $type, $value )
		{
		if( $type == "VARCHAR" || $type == "varchar" || $type == "char" )
			{
			if( $value == "") return " is null" ;
			return "='" . $value . "'" ;
			}
		else if( $type == "DATETIME" )
			{
			if( $value == "") return " is null" ;
			return "=#" . $value . "#" ;
			}
		return "=".$value ;
		}
	}

?>