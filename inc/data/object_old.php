<?php
//////////////////////////////////////////////////////////
// object.php
//
// Classe de base pour les objets gérés par un controleur
// d'objet de type ObjectControler
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/iobject.php" ) ;

class Object implements iObject
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
	public function getDataRow()
		{
		$row = array() ;
		foreach( $this as $field=>$value )
			{
			$row[$field] = $value ;
			}
		return $row ;
		}
	// Cree un tableau associatif avec les champs identifiants l'objet
	public function getKey()
		{
		return array() ;
		}
	// Cree une chaine de caractere identifiants l'objet
	public function getKeyString()
		{
		return array() ;
		}
	// Cree une instance de modele pour un objet
	public function createModele( $appctx, $controler )
		{
		$keystring = $this->getKeyString() ;
		return new MvcModele( $controler, $keystring, $this ) ;
		}
	}
?>