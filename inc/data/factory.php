<?php
//////////////////////////////////////////////////////////
// factory.php
//
// Classe de fabrique pour les objets persistant
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/primarykey.php" ) ;
require_once( "inc/data/sqltablecontener.php" ) ;

class Factory
	{
	protected 	$classname ; // Nom de la classe de la factory
	protected 	$objectclassname ; // Nom de la classe des instances ou objet
	protected	$primarykey ; // Clé primaire
	protected	$tablecontener ; // Contener SQL
	protected	$objects ; // Collection d'objet chargé
	protected	$nrow ; // N° d'enregistrement courrant
	protected	$lastnrow ; // N° du dernier enregistrement à charger
	protected	$incondition ; // Ensemble des keystring chargés

	// Constructeur
	// $appctx: contexte d'application.
	// $pkstring: chaine de caractère listant les champs de la cle primaire séparé par des ,
	// $table: nom de la table stockant les objets
	function __construct( $appctx, $pkstring, $table=null )
		{
		$this->classname = get_class( $this ) ;
		$this->objectclassname = "in" . $this->classname ;
		$this->primarykey =	new PrimaryKey( $pkstring ) ;
		$this->incondition = null ;
 		if( $table )
		 	{
		 	$this->tablecontener = new SqlTableContener(
			$appctx->db,
			$table,
			$this->primarykey ) ;
			}
		$this->objects = array() ;
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
	// Chargement des objets à partir des clauses $from, $where et $orderby d'une requette SQL
	// entre les limites de n° d'enregistrement $firstnrow et $lastnrow
	public function loadObjectsFromWhereWithNrowLimits( $appctx, $from, $where, $orderby, $firstnrow, $lastnrow )
		{
		$sql = "select * from $from " ;
		if( $where ) $sql .= "where $where " ;
		if( $orderby ) $sql .= "order by $orderby" ;
		
		//echo( "<<SQL: $sql>> <<FROM: $from>> <<ORDER BY: $orderby>> " ) ;
		$this->loadObjectsSqlWithNrowLimits( $appctx, $sql, $firstnrow, $lastnrow ) ;
		}
	// Chargement des objets à partir des clauses $from, $where et $orderby d'une requette SQL
	public function loadObjectsFromWhere( $appctx, $from, $where, $orderby=null )
		{
		$sql = "select * from $from " ;
		if( $where ) $sql .= "where $where " ;
		if( $orderby ) $sql .= "order by $orderby" ;
		
		//echo( "<<SQL: $sql>> <<FROM: $from>> <<ORDER BY: $orderby>> " ) ;
		$this->loadObjectsSql( $appctx, $sql ) ;
		}
	// Chargement des objets à partir d'une requette SQL entre les limites de n° d'enregistrement
	// $firstnrow et $lastnrow
	public function loadObjectsSqlWithNrowLimits( $appctx, $sql, $firstnrow, $lastnrow )
		{
		$dbc = $appctx->db->buildCursor( $sql ) ;

		$this->nrow = $firstnrow ;
		$this->lastnrow = $lastnrow ;
		
		if( $dbc->goToRow( $this->nrow ) )
			{
			while( $row = $dbc->fetchAssoc() )
				{
				$key = $this->primarykey->createKeyFromDataRow( $row ) ;
				$keystring = $this->primarykey->createKeyStringFromDataRow( $row ) ;
				$object = new $this->objectclassname( $appctx, $this, $key, $row ) ;
				$this->objects[$keystring] = $object ;
				
				if( !$this->incondition ) $this->incondition = "(" . $this->tablecontener->buildInCondition( $row ) . ")" ;
				else $this->incondition .= ",(" . $this->tablecontener->buildInCondition( $row ) . ")" ;
				
				$this->nrow++ ;
				if( $this->nrow > $this->lastnrow ) break ;
				}
			}
		}		
	// Chargement des objets à partir d'une requette SQL
	public function loadObjectsSql( $appctx, $sql )
		{
		$dbc = $appctx->db->buildCursor( $sql ) ;

		$this->nrow = 0 ;
		$this->lastnrow = 0 ;
		
		while( $row = $dbc->fetchAssoc() )
			{
			$key = $this->primarykey->createKeyFromDataRow( $row ) ;
			$keystring = $this->primarykey->createKeyStringFromDataRow( $row ) ;
			$object = new $this->objectclassname( $appctx, $this, $key, $row ) ;
			$this->objects[$keystring] = $object ;
				
			if( !$this->incondition ) $this->incondition = "(" . $this->tablecontener->buildInCondition( $row ) . ")" ;
			else $this->incondition .= ",(" . $this->tablecontener->buildInCondition( $row ) . ")" ;
				
			$this->nrow++ ;
			}
		}		
	// Chargement d'un objet à partir de sa key et de son row
	public function loadObjectFromKey( $appctx, $key )
		{
		$row = $this->tablecontener->loadDataRow( $key ) ;
		$keystring = $this->primarykey->createKeyStringFromDataRow( $row ) ;
		$object = new $this->objectclassname( $appctx, $this, $key, $row ) ;
		$this->objects[$keystring] = $object ;
		if( !$this->incondition ) $this->incondition = "(" . $this->tablecontener->buildInCondition( $row ) . ")" ;
		else $this->incondition .= ",(" . $this->tablecontener->buildInCondition( $row ) . ")" ;
		$this->nrow = 0 ;
		$this->lastnrow = 0 ;
		return $object ;
		}
	// Cree un objet à partir d'un row
	public function createObjectFromRow( $appctx, $row )
		{
		$key = $this->primarykey->createKeyFromDataRow( $row ) ;
		$keystring = $this->primarykey->createKeyStringFromDataRow( $row ) ;
		$object = new $this->objectclassname( $appctx, $this, $key, $row ) ;
		$this->objects[$keystring] = $object ;
		$this->nrow = 0 ;
		$this->lastnrow = 0 ;
		return $object ;
		}
	// Cree un objet en mettant à jour les champs non créé par le constructeur à partir de ceux du row
	// Le constructeur de l'objet met à jour les attributs specifique et les autres sont
	// créés et completés par ceux du $row ou par les champs definis dans la table et des valeurs nulles
	public function createNewObject( $appctx, $row = null )
		{
		$object = new $this->objectclassname( $appctx, $this, null, $row ) ;
		if( $row ) 
			{
			if( $this->tablecontener )
				{
				// Complete le row avec les champs qui n'y sont pas presents
				$fields = $this->tablecontener->loadFieldDesc() ;
				foreach( $fields as $field=>$type )
					{
					if( !array_key_exists( $field, $row ) )
						{
						if( $type == "real" ) $row[$field] = "" ;
						else if( $type == "int" ) $row[$field] = "" ;
						else if( $type == "date" ) $row[$field] = "" ;
						else if( $type == "string" ) $row[$field] = null ;
						}
					}
				}
			$object->completeFromRow( $row ) ;
			}
		else 
			{
			if( $this->tablecontener )
				{
				// Cree un $row avec des valeurs nulles pour initialiser l'objet
				$row = $this->tablecontener->loadFieldDesc() ;
				foreach( $row as $field=>$type )
					{
					if( $type == "real" ) $row[$field] = "" ;
					else if( $type == "int" ) $row[$field] = "" ;
					else if( $type == "date" ) $row[$field] = "" ;
					else if( $type == "string" ) $row[$field] = null ;
					}
				$object->completeFromRow( $row ) ;
				}
			}
		//foreach( $object as $field=>$value ) echo( " $field = $value " ) ;
		$object->key = $this->primarykey->createKeyFromObject( $object ) ;
		$keystring = $this->primarykey->createKeyStringFromObject( $object ) ;
		$this->objects[$keystring] = $object ;
		$this->nrow = 0 ;
		$this->lastnrow = 0 ;
		return $object ;
		}
	// Cree une copie de l'objet en mettant à jour les champs non créé par le constructeur à partir de ceux de l'original
	public function copyObject( $appctx, $original, $row = null )
		{
		$values = array() ;
		foreach( $original->values as $field=>$value ) $values[$field] = $value ;
		if( $row ) foreach( $row as $field=>$value ) $values[$field] = $value ;
		
		$object = $this->createNewObject( $appctx, $values ) ;
		return $object ;
		}		
	// Appelé après le chargement d'un ensemble d'objet
	public function onAfterLoadObjects( $appctx )
		{
		}
	// Cree les modeles en JS des objets generes par la classe de fabrique
	public function createModeles( $appctx )
		{
		$this->sendAnswerValues( $appctx ) ;
		$answer = $appctx->getAnswersString() ;
		$answer = str_replace( "\x0a", "", $answer ) ;
		$answer = str_replace( "\x5c", "", $answer ) ;
		$answer = str_replace( "\x22", "\x5c\x22", $answer ) ;
		$appctx->clearAnswers() ;
		$appctx->sendJs( "ayawf.mvc.updateModeleFromAjaxAnswer( \"\", null, null, true, \"$answer\" ) ;" ) ;
		}
	// Prépare la réponse AJAX pour l'envoie des valeurs des objets chargés
	public function sendAnswerValues( $appctx )
		{
		foreach( $this->objects as $keystring=>$object ) 
			{
			$object->sendAnswerValues( $appctx ) ;
			}
		if( $this->nrow > $this->lastnrow ) $appctx->sendAnswer( "1<sep>$this->lastnrow" ) ; 
		else $appctx->sendAnswer( "0<sep>$this->nrow" ) ; 
		}
	// Prépare la réponse AJAX pour l'envoie uniquement de l'objet spécifié dans objet
	public function sendAnswerValuesOnlyFor( $appctx, $object )
		{
		$object->sendAnswerValues( $appctx ) ;
		$appctx->sendAnswer( "0<sep>$this->nrow" ) ; 
		}
	// Cree la chaine de caractère pour l'envoie de l'entete d'un objet
	// Renvoie une chaine avec $classname<sep>$keystring<sep>$state
	public function createStringHeadToSend( $object )
		{		
		$classname = $this->classname ;
		$keystring = $this->primarykey->createKeyStringFromDataRow( $object->key ) ;
		return "$classname<sep>$keystring<sep>$object->state" ;
		}

	// Cree et renvoie la chaine keystring 
	public function createKeyString( $object )
		{
		$keystring = $this->primarykey->createKeyStringFromDataRow( $object->key ) ;
		return $keystring ;
		}
		
	// Insere un objet dans la table associée de la BD
	public function insertObjectIntoDB( $object )
		{
		if( $this->tablecontener )
			{
			if( $this->tablecontener->insertDataRow( $object->values ) ) return true ;
			else 
				{
				$error = $this->tablecontener->getError() ;
				echo( "Factory: erreur dans insert d'un nouvel objet " . get_class( $object ) . ": $error" ) ;
				return false ;
				}
			}
		return true ;
		}		
	// Enregistre les modifications d'un objet dans la BD
	public function updateObjectIntoDB( $object )
		{
		if( $this->tablecontener )
			{
			if( $this->tablecontener->updateDataRow( $object->key, $object->values ) ) return true ;
			else 
				{
				$error = $this->tablecontener->getError() ;
				echo( "Factory: erreur dans update d'un objet " . get_class( $object ) . ": $error" ) ;
				return false ;
				}
			}
		return true ;
		}
	// Supprime un objet de la base de donnée
	public function deleteObjectIntoDB( $object )
		{
		if( $this->tablecontener )
			{
			if( $this->tablecontener->deleteDataRow( $object->key ) ) return true ;
			else 
				{
				$error = $this->tablecontener->getError() ;
				echo( "Factory: erreur dans delete d'un objet " . get_class( $object ) . ": $error" ) ;
				return false ;
				}
			}
		return true ;
		}
		
	// Debugage
	public function debugDump( $indent )
		{
		}
	}
?>