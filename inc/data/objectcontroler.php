<?php
//////////////////////////////////////////////////////////
// objectcontroler.php
//
// Classe ObjectControler
//
// Référence tous les objets php créés à partir d'une
// classe PHP
//
// Sert également de fabrique d'objet
//
// 20/03/2011
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/primarykey.php" ) ;

class ObjectContener
{
}

class ObjectControler
	{
	protected $objectclassname ;  // Classe de l'objet à créer
	protected $dbcontener ; // Conteneur d'objet associé
	protected $primarykey ; // Clé primaire
	protected $loadedobject ; // Tableau des objets chargés

	public function __construct( $appctx, $objectclassname="Object", $primarykey=null, $dbcontener=null )
		{
		$this->objectclassname = $objectclassname ;
		$this->loadedobject = array() ;

		$this->dbcontener = $dbcontener ;
		$this->primarykey = $primarykey ;

		$appctx->addObjectControler( $objectclassname, $this ) ;
		}

	public function getObjectClassName()
		{
		return $this->objectclassname ;
		}

	public function getPrimaryKey()
		{
		return $this->primarykey ;
		}

	// Crée un objet à partir de ses données contenues dans le tableau
	// associatif $row s'il n'est pas déjà chargé
	public function getObjectFromDataRow( $appctx, $row )
		{
		$keystring = $this->primarykey->createKeyStringFromDataRow( $row ) ;
		if( array_key_exists( $keystring, $this->loadedobject ) ) return $this->loadedobject[$keystring] ;
		$object = new $this->objectclassname( $appctx, $row ) ;
		$this->loadedobject[$keystring] = $object ;
		return $object ;
 		}

	// Crée un objet identifié par la clé $key en le chargeant à partir
	// du dbcontener s'il n'est pas déjà chargé.
	public function getObjectFromKey( $appctx, $key )
		{
		echo( "<br>getObjetcFormKey $this->objectclassname") ;
		$keystring = $this->primarykey->createKeyStringFromDataRow( $key ) ;
		if( array_key_exists( $keystring, $this->loadedobject ) ) return $this->loadedobject[$keystring] ;
		return $this->loadObject( $appctx, $key, $keystring ) ;
 		}

	// Crée un objet identifié par la chaine $keystring en le chargeant
	// à partir du dbcontener s'il n'est pas déjà chargé.
	public function getObjectFromKeyString( $appctx, $keystring )
		{
		if( array_key_exists( $keystring, $this->loadedobject ) ) return $this->loadedobject[$keystring] ;
		$key = $this->primarykey->createKeyFromKeyString( $keystring ) ;
		return $this->loadObject( $appctx, $key, $keystring ) ;
 		}

	// Charge un objet à partir d'un DbContener
	// Utilise le tableau de valeur $key pour identifier l'objet
	// à charger et la chaine $keystring pour le référencer dans le tableau
	// des objets chargés.
	public function loadObject( $appctx, $key, $keystring, $arg1=null, $arg2=null, $arg3=null )
		{
		if( $this->dbcontener )
			{
			$row = $this->dbcontener->loadDataRow( $key ) ;
			if( $row )
				{
				$object = new $this->objectclassname( $appctx, $row, $arg1, $arg2, $arg3 ) ;
				$this->loadedobject[$keystring] = $object ;
				return $object ;
				}
			}
		return null ;
 		}

	// insert data
	public function insertObject( iObject $object )
		{
		$row = $object->getDataRow() ;
		if( !$this->dbcontener->insertDataRow( $row ) )
			{
			$error = $this->dbcontener->getError() ;
			echo( "alert( \"Erreur: ObjectControler::insertObject $error\" );") ;
			return false ;
			}
		return true ;
		}
	// update data
	public function updateObject( iObject $object )
		{
		$row = $object->getDataRow() ;
		$key = $object->getInitialeKey() ;
		$keystring = $object->getInitialeKeyString() ;
		if( $this->dbcontener->updateDataRow( $key, $row ) )
			{
			$newkeystring = $object->getKeyString() ;
			if( $keystring != $newkeystring )
				{
				unset( $this->loadedobject[$keystring] ) ;
				$this->loadedobject[$newkeystring] = $object ;
				}
			return true ;
			}
		else
			{
			$error = $this->dbcontener->getError() ;
			echo( "alert( \"Erreur: ObjectControler::updateObject $error\" );") ;
			}
		return false ;
		}
	// delete data
	public function deleteObject( iObject $object )
		{
		$key = $object->getInitialeKey() ;
		$keystring = $object->getInitialeKeyString() ;
		if( $this->dbcontener->deleteDataRow( $key ) )
			{
			unset( $this->loadedobject[$keystring] ) ;
			return true ;
			}
		return false ;
		}

	// ajoute un objet
	public function addObject( iObject $object )
		{
		$keystring = $object->getInitialeKeyString() ;
		$this->loadedobject[$keystring] = $object ;
		}

	public static function createObjectControlerWithSqlTable( $appctx, $classname, $tablename, $primarykeystring )
		{
		$primarykey = new PrimaryKey( $primarykeystring ) ;
		$dbcontener = new SqlTableContener( $appctx->db, $tablename, $primarykey ) ;
		$controler = new ObjectControler( $appctx, $classname, $primarykey, $dbcontener ) ;
		return $controler ;
 		}

	// Debugage
	public function debugDump( $indent )
		{
		echo( "<br>" . $indent . "ObjectControler: $this->objectclassname\n") ;
		echo( "<br>" . $indent . "  loadedobject:\n") ;

		foreach( $this->loadedobject as $keystring=>$object )
			{
			echo( "<br>" . $indent . "    $keystring \n") ;
			$object->debugDump( $indent . "      ") ;
			}
		}

	}
?>