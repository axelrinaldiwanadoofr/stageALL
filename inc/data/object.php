<?php
//////////////////////////////////////////////////////////
// object.php
//
// Classe de base pour les objets persistant
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/factory.php" ) ;
require_once( "inc/data/primarykey.php" ) ;
require_once( "inc/data/sqltablecontener.php" ) ;

class Object
	{
	protected	$factory ; // Fabrique de l'objet
	protected 	$todo ; // 0 rien ne doit etre fait, 1 insert, 2 update, 3 delete
	public		$values ; // Valeurs de l'object
	public		$key ; // Valeurs de la clé primaire
	public		$state ; // Etat de l'objet
	protected	$mainobject ; // Objet principal auquel l'objet est rattaché

	// Constructeur
	// $appctx: contexte d'application.
	// $factory:
	// $key tableau associatif contenant les valeurs de la clée primaire, si null alors nouvel objet à inserer dans la DB
	// $row tableau associatif contenant les valeurs des champs
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
		$this->factory = $factory ;
		if( $key )
			{
			$this->key = $key ;
			if( $row ) 
				{
				$this->todo = 0 ;
				$this->state = "loaded" ;
				$this->values = $row ;
				$this->copyValuesToAttributes() ;
				}
			}
		else 
			{
			$this->todo = 1 ;
			$this->key = array() ;
			$this->values = array() ;
			}
 		}

	// Définie le mainobjet
	public function setMainObject( $object )
		{
		$this->mainobject = $object ;
		}
	// Retourne ce qui doit etre fait à la prochaine sauvegarde
	public function getTodo()
		{
		return $this->todo ;
		}
	// Specifie l'attribut todo a 2 pour un update
	public function setToUpdate()
		{
		$this->todo = 2 ;
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
		$this->copyAttributesToValues() ;
		if( $this->factory )
			{
			switch( $this->todo )
				{
				case 1: // Insert
					if( $this->factory->insertObjectIntoDB( $this ) ) $this->state = "inserted" ;
					else $this->state = "dberror" ;
					break ;
				case 2: // update
					if( $this->factory->updateObjectIntoDB( $this ) ) $this->state = "updated" ;
					else $this->state = "dberror" ;
					break ;
				case 3: // delete
					if( $this->factory->deleteObjectIntoDB( $this ) ) $this->state = "deleted" ;
					else $this->state = "dberror" ;
					break ;
				}
			}
		}
	// Demande à la factory de créer une copie
	public function createCopy( $appctx, $row=null )
		{
		return $this->factory->copyObject( $appctx, $this, $row ) ;
		}
	// Met a jour les champs avec la valeur NULL
	protected function setNullAllAttributes()
		{
		foreach( $this->values as $field=>$value )
			{
			if( $value == "real" ) $this->$field = "" ;
			else if( $value == "int" ) $this->$field = "" ;
			else if( $value == "date" ) $this->$field = "" ;
			else if( $value == "string" ) $this->$field = null ;
			}
		}
	// Met a jour les champs à partir du tableau associatif
	public function updateAttributesFromRow( $appctx, $row )
		{
		foreach( $row as $field=>$value )
			{
			if( array_key_exists( $field, $this ) && $this->$field != $value )
				{
				if( $value == "null" ) $value = "" ;
				$this->$field = $value ;
				$this->todo = 2 ;
				}
			}

			if( $this->todo == 2 )
			{
			$this->onValueChanged( $appctx ) ;
			return true ;
			}
		return false ;
		}
	// Met a jour les champs: attribut + case du tableau values inexistant à partir du tableau associatif
	public function completeFromRow( $row )
		{
		foreach( $row as $field=>$value )
			{
			if( !array_key_exists( $field, $this ) ) $this->$field = $value ;
			$this->values[$field] = $this->$field ;
			}
		}
	// Met a jour les champs à partir du tableau associatif
	protected function copyValuesToAttributes()
		{
		foreach( $this->values as $field=>$value )
			{
			$this->$field = $value ;
			}
		}
	// Met a jour les champs à partir du tableau associatif
	protected function copyDataRowToAttributes( $row )
		{
		$this->values = $row ;
		$this->copyValuesToAttributes() ;
		}
	// Cree un tableau associatif de tous les champs avec les valeur
	public function copyAttributesToValues()
		{
		foreach( $this->values as $field=>$value )
			{
			$this->values[$field] = $this->$field ;
			}
		}
	// Cree les valeurs des attributs dans la cle
	public function copyAttributesToKey()
		{
		$primarykey = $this->factory->getPrimarykey ;
		foreach( $primarykey->fields as $n=>$field )
			{
			$this->key[$field] = $this->$field ;
			}
		}
	// Cree un tableau associatif de tous les champs avec les valeur
	public function createDataRow()
		{
		$row = array() ;
		foreach( $this->values as $field=>$value )
			{
			$row[$field] = $this->$field ;
			}
		return $row ;
		}
	// Renvoie les données de l'objet
	public function sendAnswerValues( $appctx )
		{		
		$this->copyAttributesToValues() ;		
		$answer = $this->createStringHeadToSend() ;
		$answer .= $this->createStringValuesToSend() ;
		$appctx->sendAnswer( $answer ) ;
		}
	// Cree la chaine de caractère pour l'envoie de l'entete
	public function createStringHeadToSend()
		{		
		$answer = $this->factory->createStringHeadToSend( $this ) ;

		if( $this->mainobject ) $answer .= "<sep>" . $this->mainobject->factory->createStringHeadToSend( $this->mainobject ) ;
		else $answer .= "<sep><sep><sep>" ;
		
		return $answer ;
		}
	// Cree la chaine de caractère pour l'envoie des valeurs du tableau values 
	public function createStringValuesToSend()
		{
		$answer = "" ;
		if( $this->state != "dberror" )
			{
			foreach( $this->values as $field=>$value )
				{
				$answer .= "<sep>$field<eql>$value" ;
				}
			}
		return $answer ;
		}
	// Cree et renvoie la chaine keystring 
	public function createKeyString()
		{
		$keystring = $this->factory->createKeyString( $this ) ;
		return $keystring ;
		}
		
	// Appelée après mise à jour
	public function onValueChanged( $appctx )
		{
		}
	}
?>