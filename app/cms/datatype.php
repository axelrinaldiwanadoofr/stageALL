<?php
//////////////////////////////////////////////////////////
// datatype.php
//
// DataType type de valeur pour les propriétés du CMS
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

class DataType
	{
	var $type ;		// Nom du type
	var $libelle ; // Libelle

	var $fields ; // Liste des champs

	function __construct( $type, $libelle )
		{
		$this->type = $type ;
		$this->libelle = $libelle ;
		$this->fields = array() ;
		}
	}
?>