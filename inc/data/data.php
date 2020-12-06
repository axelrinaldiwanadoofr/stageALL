<?php
//////////////////////////////////////////////////////////
// data.php
//
// Classe de base pour les objets créé à partir d'une
// base de donnée
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

class Data
	{
	protected $fields ;
	// Constructeur
	// $appctx contexte d'application.
	// $fields tableau associatif contenant les valeurs des champs
	function __construct( $appctx, $fields )
		{
		$this->fields = $fields ;
		$this->updateValues( $fields ) ;
 		}
	// Met a jour les champs à partir du tableau associatif
	protected function updateValues( $row )
		{
		foreach( $row as $field=>$value )
			{
			$this->$field = $value ;
			}
		}
	// Cree un tableau associatif de tous les champs
	protected function createRow()
		{
		$row = array() ;
		foreach( $this as $field=>$value )
			{
			$row[$field] = $value ;
			}
		return $row ;
		}
	}
?>