<?php
//////////////////////////////////////////////////////////
// dbobject.php
//
// Classe de base pour les objets persistant
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/primarykey.php" ) ;
require_once( "inc/data/sqltablecontener.php" ) ;

class DbObject
	{
	protected	$primarykey ;
	protected	$tablecontener ;
	protected 	$todo ; // 0 rien ne doit etre fait, 1 insert, 2 update, 3 delete
	protected	$values ; // Valeurs de l'object
	protected	$key ; // Valeurs de la clé primaire
	protected	$state ; // Etat de l'objet
	protected	$mainobject ; // Objet principal auquel l'objet est rattaché

	// Constructeur
	// $appctx contexte d'application.
	// $fields tableau associatif contenant les valeurs des champs
	function __construct( $appctx, $pkstring, $table=null, $key=null, $newobject=false )
		{
		$this->primarykey =	new PrimaryKey( $pkstring ) ;
 		if( $table )
		 	{
		 	$this->tablecontener = new SqlTableContener(
			$appctx->db,
			$table,
			$this->primarykey ) ;

			if( !$newobject )
				{
				//echo( "Key: " ) ;
				//foreach( $key as $f=>$v ) echo( "$f=$v " ) ;
				$this->key = $this->primarykey->createKeyFromDataRow( $key ) ;
				$row = $this->tablecontener->loadDataRow( $this->key ) ;
				if( $row )
					{
					$this->todo = 0 ;
					$this->state = "loaded" ;
					$this->values = $row ;
					$this->copyValuesToAttributes() ;
					}
				else
					{
					$this->state = "dberror" ;
					$classname = get_class( $this ) ;
					echo( "DbObject: load $classname no data found with key: " ) ;
					foreach( $key as $n=>$v ) echo( "$n:$v " ) ;
					}
				}
			else
				{
				$this->todo = 1 ;
				$this->values = $this->tablecontener->loadFieldDesc() ;
				if( $key )
					{
					$this->key = $this->primarykey->createKeyFromDataRow( $key ) ;
					foreach( $key as $field=>$value )
						{
						$this->values[$field] = $value ;
						}
					}
				$this->copyValuesToAttributes() ;
				$this->setNullAllAttributes() ;
				}
			}
		else
			{
			$this->todo = 0 ;
			$this->state = "loaded" ;
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
		if( $this->tablecontener )
			{
			switch( $this->todo )
				{
				case 1: // Insert
					if( $this->tablecontener->insertDataRow( $this->values ) ) 
						{
						$this->state = "inserted" ;
						}
					else 
						{
						$this->state = "dberror" ;
						$error = $this->tablecontener->getError() ;
						echo( "DbObject: erreur dans insert d'un nouvel objet " . get_class( $this ) . ": $error" ) ;
						}
					break ;
				case 2:
					if( $this->tablecontener->updateDataRow( $this->key, $this->values ) ) $this->state = "updated" ;
					else 
						{
						$this->state = "dberror" ;
						$error = $this->tablecontener->getError() ;
						echo( "DbObject: erreur dans update d'un objet " . get_class( $this ) . ": $error" ) ;
						}
					break ;
				case 3:
					if( $this->tablecontener->deleteDataRow( $this->key ) ) $this->state = "deleted" ;
					else 
						{
						$this->state = "dberror" ;
						$error = $this->tablecontener->getError() ;
						echo( "DbObject: erreur dans delete d'un objet " . get_class( $this ) . ": $error" ) ;
						}
					break ;
				}
			}
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
	public function updateFromRow( $appctx, $row )
		{
		foreach( $row as $field=>$value )
			{
			if( array_key_exists( $field, $this ) && $this->$field != $value )
				{
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
	public function copyAttributesToValues( $todo=2 )
		{
		if( $this->todo ) $todo = $this->todo ;
		foreach( $this->values as $field=>$value )
			{
			if( $this->$field != $this->values[$field] ) $this->todo = $todo ;
			$this->values[$field] = $this->$field ;
			}
		}
	// Cree les valeurs des attributs dans la cle
	public function copyAttributesToKey()
		{
		foreach( $this->primarykey->fields as $n=>$field )
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
	// Cree un tableau associatif de tous les champs avec les valeur
	// et ajoute ou remplace les valeurs données dans $newvalues
	public function createDataRowIncluding( $newvalues )
		{
		$row = $this->createDataRow() ;
		foreach( $newvalues as $field=>$value )
			{
			if( isset( $row[$field] ) ) $row[$field] = $value ;
			}
		return $row ;
		}
	// Cree une copie d'un objet incluant les nouvelle valeurs contenues
	// dans $newvalues
	public function createCopy( $appctx, $newvalues )
		{
		$row = $this->createDataRowIncluding( $newvalues ) ;		
		$classname = get_class( $this ) ;
		return new $classname( $appctx, $row, true ) ;
		}
	// Cree un objet vide
	static public function createNew( $appctx, $classname )
		{
		return new $classname( $appctx, null, true ) ;
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
		$classname = get_class( $this ) ;
		$keystring = $this->primarykey->createKeyStringFromDataRow( $this->key ) ;
		$answer = "$classname<sep>$keystring<sep>$this->state" ;

		if( $this->mainobject )
			{
			$mainclassname = get_class( $this->mainobject ) ;
			$mainkeystring = $this->mainobject->primarykey->createKeyStringFromDataRow( $this->mainobject->values ) ;
			$answer .= "<sep>$mainclassname<sep>$mainkeystring" ;
			}
		else $answer .= "<sep><sep>" ;
		
		return $answer ;
		}
	// Cree la chaine de caractère pour l'envoie des valeurs du tableau values 
	public function createStringValuesToSend()
		{
		$answer = "" ;
		if( $this->state == "dberror" )
			{
			$answer .= "<sep>" . $this->tablecontener->getError() ;
			$answer .= "<sep>" . $this->tablecontener->getSql() ;
			}
		else
			{
			foreach( $this->values as $field=>$value )
				{
				$answer .= "<sep>$field<eql>$value" ;
				}
			}
		return $answer ;
		}
	// Appelée après mise à jour
	public function onValueChanged( $appctx )
		{
		}
	// Debugage
	public function debugDump( $indent )
		{
		$this->copyAttributesToValues() ;
		$keystring = $this->primarykey->createKeyStringFromDataRow( $this->values ) ;
		$classname = get_class( $this ) ;
		echo( "<br>" . $indent . "$classname: $keystring\n") ;
		echo( "<br>" . $indent . "  fields:\n") ;

		foreach( $this->values as $field=>$value )
			{
			echo( "<br>" . $indent . "    $field: $value\n") ;
			}
		}
	}
?>