<?php
//////////////////////////////////////////////////////////
// primarykey.php
//
// Classe PrimaryKey
//
// G�re les cl�s primaires
//
// Une cl� est un tableau associatif contenant les valeurs
// permettant d'identifier un objet.
//
// Une keystring est une chaine de caract�re contenant des
// valeurs s�par�es par des virgules dans l'ordre des champs
// mentionn�s dans la cl� primaire.
//
// 20/03/2011
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

//require_once( "inc/data/data.php" ) ;

class PrimaryKey
	{
	var $fields ; // Tableau des champs forment la cle primaire

	// $fieldstring contient le nom des champs de la cl� primaire
	// s�par�s par des virgules
	function __construct( $fieldstring )
		{
		$this->fields = explode( ",", $fieldstring ) ;
		}

	// Retourne une keystring � partir des champs d'un objet
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

	// Retourne une key � partir d'un tableau associatif de valeur
	function createKeyFromObject( $object )
		{
		$key = array() ;
		foreach( $this->fields as $i=>$field )
			{
			$key[$field] = $object->$field ;
			}
		return $key ;
		}

	// Retourne une keystring � partir d'un tableau associatif de valeur
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

	// Retourne une key � partir d'un tableau associatif de valeur
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

	// Retourne une cl� � partir du $keystring
	// Construit un tableau associatif contenant les valeurs des champs de
	// la cl�
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