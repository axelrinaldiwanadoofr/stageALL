<?php

//////////////////////////////////////////////////////////
// sqltablecontener.php
//
// Outils de base les access aux bases de données
// relationnelles SQL.
//
// Conteneur de type table sql d'une BD relationnelle
// Implemente l'iterface iDbContener
//
// 28/10/2005
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/primarykey.php" ) ;

class SqlTableContener //implements iDbContener
	{
	var $db ;      // Connecteur de BD
	var $error ; 	 // Message d'erreur
	var $sql ; 		 // Requette SQL
	var $table ;   // Nom de la table pour les transactions
	var $fields ;  // Tableau listant les champs avec leur type
	var $primarykey ; // Tableau listant la primary key

	function __construct( $db, $table, $primarykey )
		{
		$this->db = $db ;
		$this->table = $table ;
		$this->error = "" ;
		$this->sql = "" ;
		$this->primarykey = $primarykey ;
	 	}

	// Renvoie le tableau des champs de la cle primaire
	function getPrimaryKey()
		{
		return $this->primarykey ;
		}

	// Charge la description des champs de la table
	// Remplit les tableau fields
	function loadFieldDesc()
		{
		$cursor = $this->db->buildCursor( "select * from $this->table" ) ;

		if( $cursor )
			{
			$this->fields = array() ;
			$nb = $cursor->countField()  ;

			for( $ii = 0 ; $ii<$nb ; $ii++ )
				{
				$field = $cursor->fieldName( $ii ) ;
				$type = $cursor->fieldType( $ii ) ;
				$this->fields[$field] = $type ;
				}
			$cursor->Close() ;
			}
		return $this->fields ;
		}

	// Met a jour la ligne pointee les valeurs du tableau de champ $row
	// a partir des valeurs contenue dans le tableau de champ $key
	function updateDataRow( $key, $row )
		{
		if( !$this->fields ) $this->loadFieldDesc() ;

		$sql = "update " . $this->table . " set " ;

		// Construit la liste des valeurs
		$i = 0 ;
		foreach( $row as $name=>$value )
			{
			if( array_key_exists( $name, $this->fields ) )
				{
				$type = $this->fields[$name] ;
				if( $i ) $sql = $sql . "," . $name . "=" . $this->db->value2sql( $type, $value ) ;
				else $sql = $sql . $name . "=" . $this->db->value2sql( $type, $value ) ;
				$i++ ;
				}
			}
		$sql = $sql . " where " . $this->buildWhereCondition( $key ) ;

		$this->sql = $sql ;
		if( $this->db->execute( $sql ) ) return true ;

		$this->error = "Error: $sql : " . $this->db->getError() ;
		return false ;
		}
	// Supprime l'enregistrement contenant les valeurs donnees
	// le tableau $row
	function deleteDataRow( $key )
		{
		if( !$this->fields ) $this->loadFieldDesc() ;

		$sql = "delete from " . $this->table ;
		$sql = $sql . " where " . $this->buildWhereCondition( $key ) ;

		$this->sql = $sql ;
		if( $this->db->execute( $sql ) ) return true ;

		$this->error = "Error: $sql : " . $this->db->getError() ;
		return false ;
		}
	// Charge l'enregistrement contenant les valeurs donnees
	// le tableau $key
	function loadDataRow( $key )
		{
		if( !$this->fields ) $this->loadFieldDesc() ;

		$sql = "select * from " . $this->table ;
		$sql = $sql . " where " . $this->buildWhereCondition( $key ) ;
		$this->sql = $sql ;
//echo( "sql: $sql " ) ;
		$cursor = $this->db->buildCursor( $sql ) ;
		$row = $cursor->fetchAssoc() ;
//if( $row ) echo( "row ok " ) ;
		if( $row ) return $row ;

		$this->error = "Error: $sql : " . $this->db->getError() ;
		return false ;
		}
	// Insert un enregistrement avec les valeurs du tableau $row
	function insertDataRow( $row )
		{
		if( !$this->fields ) $this->loadFieldDesc() ;

		$sql = "insert into " . $this->table . "(" ;

		// Construit la liste des champs
		$i = 0 ;
		foreach( $row as $name=>$value )
			{
			if( array_key_exists( $name, $this->fields ) )
				{
				if( $i ) $sql = $sql . "," . $name ;
				else $sql = $sql . $name ;
				$i++ ;
				}
			}

		$sql = $sql . ") values (" ;

		// Construit la liste des valeurs
		$i = 0 ;
		foreach( $row as $name=>$value )
			{
			if( array_key_exists( $name, $this->fields ) )
				{
				$type = $this->fields[$name] ;
				if( $i ) $sql = $sql . "," . $this->db->value2sql( $type, $value ) ;
				else $sql = $sql . $this->db->value2sql( $type, $value ) ;
				$i++ ;
				}
			}
		$sql = $sql . ")" ;

		$this->sql = $sql ;
		if( $this->db->execute( $sql ) ) return true ;

		$this->error = "Error: $sql : " . $this->db->getError() ;
		return false ;
		}

	// Construit une chaine de caracteres pour une condition where
	// a partir des valeurs contenue dans le tableau de champ $key
	function buildWhereCondition( $key )
		{
		if( !$this->fields ) $this->loadFieldDesc() ;

		$sql = "" ;
		$i = 0 ;

		foreach( $this->primarykey->fields as $num=>$name )
			{
			if( array_key_exists( $name, $key ) && array_key_exists( $name, $this->fields ) )
				{
				$value = $key[$name] ;
				$type = $this->fields[$name] ;
				if( $i ) $sql = $sql . " and " . $name . $this->db->value2sqlWhere( $type, $value ) ;
				else $sql = $sql . $name . $this->db->value2sqlWhere( $type, $value ) ;
				$i++ ;
				}
			}
		return $sql ;
		}
	// Construit une chaine de caracteres pour une condition in dans un where
	// a partir des valeurs contenue dans le tableau de champ $row
	function buildInCondition( $row )
		{
		if( !$this->fields ) $this->loadFieldDesc() ;

		$in = "" ;
		$i = 0 ;

		foreach( $this->primarykey->fields as $num=>$name )
			{
			if( array_key_exists( $name, $row ) && array_key_exists( $name, $this->fields ) )
				{
				$value = $row[$name] ;
				$type = $this->fields[$name] ;
				if( $i ) $in = $in . "," . $this->db->value2sql( $type, $value ) ;
				else $in = $this->db->value2sql( $type, $value ) ;
				$i++ ;
				}
			}
		return $in ;
		}
	// Renvoie le message d'erreur
	function getError()
		{
		return $this->error ;
		}
	// Renvoie la dernière requette SQL
	function getSql()
		{
		return $this->sql ;
		}
	}
?>