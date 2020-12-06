<?php
//////////////////////////////////////////////////////////
// primarykey.php
//
// Classe PrimaryKey
//
// Gère les clés primaires
//
// Une clé est un tableau associatif contenant les valeurs
// permettant d'identifier un objet.
//
// Une keystring est une chaine de caractère contenant des
// valeurs séparées par des virgules dans l'ordre des champs
// mentionnés dans la clé primaire.
//
// 20/03/2011
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

//require_once( "inc/data/data.php" ) ;

class PrimaryKey
	{
	var $fields ; // Tableau des champs forment la cle primaire

	// $fieldstring contient le nom des champs de la clé primaire
	// séparés par des virgules
	function __construct( $fieldstring )
		{
		$this->fields = explode( ",", $fieldstring ) ;
		}

	// Retourne une keystring à partir des champs d'un objet
	function createKeyStringFromObject( $object )
		{
		$key = "" ;
		foreach( $this->fields as $i=>$field )
			{
			if( $key == "" ) $key = $object->$field ;
			else $key .= "," . $object->$field ;
			}
		return $key ;
		}

	// Retourne une key à partir d'un tableau associatif de valeur
	function createKeyFromObject( $object )
		{
		$key = array() ;
		foreach( $this->fields as $i=>$field )
			{
			$key[$field] = $object->$field ;
			}
		return $key ;
		}

	// Retourne une keystring à partir d'un tableau associatif de valeur
	function createKeyStringFromDataRow( $row )
		{
		$keystring = "" ;
		foreach( $this->fields as $i=>$field )
			{
			if( $keystring == "" ) $keystring = $row[$field] ;
			else $keystring .= ",$row[$field]" ;
			}
		return $keystring ;
		}

	// Retourne une key à partir d'un tableau associatif de valeur
	function createKeyFromDataRow( $row )
		{
		$key = array() ;
		foreach( $this->fields as $i=>$field )
			{
			if( $row && array_key_exists( $field, $row ) ) $key[$field] = $row[$field] ;
			else $key[$field] = "" ;
			}
		return $key ;
		}

	// Retourne une clé à partir du $keystring
	// Construit un tableau associatif contenant les valeurs des champs de
	// la clé
	function createKeyFromKeyString( $keystring )
		{
		$t = explode( ",", $keystring ) ;
		$key = array() ;
		foreach( $this->fields as $i=>$field )
			{
			$key[$field] = $t[$i] ;
			}
		return $key ;
		}
	}

?>