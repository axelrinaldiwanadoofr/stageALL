<?php
//////////////////////////////////////////////////////////
// persistant.php
//
// Classe de base pour les objets persistant
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/objectcontroler.php" ) ;
require_once( "inc/data/iobject.php" ) ;

class Persistant implements iObject
	{
	protected 	$todo ; // 0 rien ne doit etre fait, 1 insert, 2 update, 3 delete
	protected 	$initialevalues ; // Tableau des valeurs donnée à la creation de l'objet
	protected		$controler ; // Controler d'objet associé

	// Constructeur
	// $appctx contexte d'application.
	// $fields tableau associatif contenant les valeurs des champs
	function __construct( $appctx, $row, $controler )
		{
		$this->controler = $controler ;
		$this->initialevalues = array() ;

		if( $row )
			{
			$this->todo = 2 ;
			$this->updateInitialeValues( $row ) ;
			$this->updateValues( $row ) ;
			}
		else $this->todo = 1 ;
 		}
	// Destructeur, effectue la sausvegarde si l'objet est sale.
	function __destruct()
		{
		$this->save() ;
 		}

	// Retourne true si l'objet peut etre inserer
	public function canInsert()
		{
		return true ;
		}
	// Retourne true si l'objet peut etre updater
	public function canUpdate()
		{
		return true ;
		}
	// Retourne true si l'objet peut etre supprimé
	public function canRemove()
		{
		return true ;
		}
	// Methode appelée avant l'insertion
	public function beforeInsert()
		{
		}
	// Methode appelée avant l'update
	public function beforeUpdate()
		{
		}
	// Methode appelée avant le delete
	public function beforeDelete()
		{
		}
	// Marque l'objet comme etant a detruire au prochain save
	public function remove()
		{
		$this->todo = 3 ;
		}
	// Enregistre l'objet si $dirty == true
	// Selon $todo:
	// 1: insertion
	// 2: update
	// 3: delete
	public function save()
		{
		if( $this->todo == 1 || $this->todo == 3 || $this->compareInitialeValuesWithValues() )
			{
			switch( $this->todo )
				{
				case 1:
					$this->beforeInsert() ;
					if( $this->controler->insertObject( $this ) )
						{
						$this->copyValuesToInitialeValues() ;
						$this->todo = 2 ;
						return true ;
						}
				case 2:
					$this->beforeUpdate() ;
					if( $this->controler->updateObject( $this ) )
						{
						$this->copyValuesToInitialeValues() ;
						return true ;
						}
				case 3:
					$this->beforeDelete() ;
					if( $this->controler->deleteObject( $this ) )
						{
						return true ;
						}
				}
			}
		}
	// Met a jour les champs à partir du tableau associatif
	protected function updateValues( $row )
		{
		foreach( $row as $field=>$value )
			{
			$this->$field = $value ;
			}
		}
	// Met a jour le tableau des valeurs initiales
	protected function updateInitialeValues( $row )
		{
		foreach( $row as $field=>$value )
			{
			$this->initialevalues[$field] = $value ;
			}
		}
	// Met a jour le tableau des valeurs initiales a partir des valeurs courantes
	protected function copyValuesToInitialeValues()
		{
		foreach( $this->initialevalues as $field=>$value )
			{
			$this->initialevalues[$field] = $this->$field ;
			}
		}
	// Met a jour les valeurs courante a partir du tableau des valeurs initiales
	protected function copyInitialeValuesToValues()
		{
		foreach( $this->initialevalues as $field=>$value )
			{
			$this->$field = $value ;
			}
		}
	// Compare les valeur courantes aux valeurs initiales
	// renvoie true s'il y a une difference
	// renvoie false si égalité
	protected function compareInitialeValuesWithValues()
		{
		foreach( $this->initialevalues as $field=>$value )
			{
			if( $this->initialevalues[$field] != $this->$field ) return true ;
			}
		return false ;
		}
	// Cree un tableau associatif de tous les champs avec les valeur
	public function getDataRow()
		{
		$row = array() ;
		foreach( $this->initialevalues as $field=>$value )
			{
			$row[$field] = $this->$field ;
			}
		return $row ;
		}
	// Cree un tableau associatif identifiant l'objet
	public function getKey()
		{
		$primarykey = $this->controler->getPrimaryKey() ;
		return $primarykey->createKeyFromObject( $this ) ;
		}

	// Cree un tableau associatif identifiant l'objet à partir des valeurs initiales
	public function getInitialeKey()
		{
		$primarykey = $this->controler->getPrimaryKey() ;
		return $primarykey->createKeyFromDataRow( $this->initialevalues ) ;
		}

	// Cree une chaine identifiante de l'objet
	public function getKeyString()
		{
		$primarykey = $this->controler->getPrimaryKey() ;
		return $primarykey->createKeyStringFromObject( $this ) ;
		}

	// Cree une chaine identifiante de l'objet à partir des données initiales
	public function getInitialeKeyString()
		{
		$primarykey = $this->controler->getPrimaryKey() ;
		return $primarykey->createKeyStringFromDataRow( $this->initialevalues ) ;
		}

	// Cree une instance de modele pour un objet
	public function createModele( $appctx, $controler )
		{
		$keystring = $this->getInitialeKeyString() ;
		return new MvcModele( $controler, $keystring, $this ) ;
		}

	// Debugage
	public function debugDump( $indent )
		{
		$keystring = $this->getInitialeKeyString() ;
		$classname = get_class( $this ) ;
		echo( "<br>" . $indent . "$classname: $keystring\n") ;
		echo( "<br>" . $indent . "  fields:\n") ;

		foreach( $this->initialevalues as $field=>$value )
			{
			$cvalue = $this->$field ;
			echo( "<br>" . $indent . "    $field: initiale: $value  current: $cvalue \n") ;
			}
		}
	}
?>