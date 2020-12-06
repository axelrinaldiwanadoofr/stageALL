<?php

//////////////////////////////////////////////////////////
// sqllib.php
//
// Specialisation de DbConnect et de DbCursor pour
// les access aux bases de donn�es
// relationnelles MySql.
//
// 28/10/2005
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Curseur MySQL d'acces aux base
// de donn�es relationnelle SQL
///////////////////////////////////////////////////////////

class MySqlDbCursor extends DbCursor
	{
	var $db ;
	var $sql ;
	var $mysqlcursor ;

	function __construct( &$db )
		{
		//parent::__construct() ;
		$this->db = $db ;
		}

	function open( $sqltxt )
		{
		$this->sql = $sqltxt ;
		if( $this->mysqlcursor = mySql_query( $sqltxt, $this->db->db ) ) return true ;
		die( "Requ�te $sqltxt invalide : " . mysql_error() ) ;
		return false ;
		}

	function requery( $sqltxt )
		{
		$this->db->connect() ;
		$this->sql = $sqltxt ;
		if( $this->mysqlcursor = mySql_query( $sqltxt, $this->db->db ) ) return true ;
		die( "Requ�te $sqltxt invalide : " . mysql_error() ) ;
		return false ;
		}

	function close()
		{
		//mysql_close( $this->mysqlcursor ) ;
		}

	function fieldName( $num )
		{
		$this->db->connect() ;
		if( !$this->mysqlcursor ) $this->mysqlcursor = mySql_query( $this->sql, $this->db->db ) ;
		return mysql_field_name( $this->mysqlcursor, $num ) ;
		}

	function fieldType( $num )
		{
		$this->db->connect() ;
		if( !$this->mysqlcursor ) $this->mysqlcursor = mySql_query( $this->sql, $this->db->db ) ;
		return mysql_field_type( $this->mysqlcursor, $num ) ;
		}

	function countField()
		{
		$this->db->connect() ;
		if( !$this->mysqlcursor ) $this->mysqlcursor = mySql_query( $this->sql, $this->db->db ) ;
		return mysql_num_fields( $this->mysqlcursor ) ;
		}

	function fetchRow( $nrow=1 )
		{
		$this->db->connect() ;
		if( !$this->mysqlcursor ) $this->mysqlcursor = mySql_query( $this->sql, $this->db->db ) ;
		for( $i=0 ; $i < $nrow ; $i++) $row = mysql_fetch_row( $this->mysqlcursor ) ;
		return $row ;
		}

	function goToRow( $nrow )
		{
		$this->db->connect() ;
		if( !$this->mysqlcursor ) $this->mysqlcursor = mySql_query( $this->sql, $this->db->db ) ;
		$nb = mysql_num_rows( $this->mysqlcursor ) ;
		if( $nrow < $nb )	return @mysql_data_seek( $this->mysqlcursor, $nrow ) ;
		else return false ;
		}

	function fetchAssoc( $nrow=1 )
		{
		$this->db->connect() ;
		if( !$this->mysqlcursor ) $this->mysqlcursor = mySql_query( $this->sql, $this->db->db ) ;
		for( $i=0 ; $i < $nrow ; $i++) $row = mysql_fetch_assoc( $this->mysqlcursor ) ;
		if( $row )
			{
			$i = 0 ;
			foreach( $row as $n => $value )
				{
				$ft = mysql_field_type( $this->mysqlcursor, $i ) ;
				$row[$n] = $this->db->sql2value( $ft, $value ) ;
				$i++ ;
				}
			}
		return $row ;
		}

	function countRow()
		{
		$this->db->connect() ;
		if( !$this->mysqlcursor ) $this->mysqlcursor = mySql_query( $this->sql, $this->db->db ) ;
		return mysql_num_rows( $this->mysqlcursor ) ;
		}
	}

///////////////////////////////////////////////////////////
// Connecteur a une base de donn�es relationnelle
// de type MySql
///////////////////////////////////////////////////////////

class MySqlConnect extends DbConnect
	{
	var $db ;
	var $srv ;
	var $usr ;
	var $passwd ;
	var $dbname ;
	var $sql ;

	function __construct( $dbname="test", $srv="localhost", $usr="root", $passwd="" )
		{
		$this->dbname = $dbname ;
		$this->srv = $srv ;
		$this->usr = $usr ;
		$this->passwd = $passwd ;
		}

	function __destruct()
		{
		if( $this->db ) $this->close() ;
		}
		
		/*
	function MySqlConnect( $srv, $usr, $passwd, $dbname )
		{
		$this->dbname = $dbname ;
		$this->srv = $srv ;
		$this->usr = $usr ;
		$this->passwd = $passwd ;
		}
	*/

	function connect()
		{
		if( !$this->db )
			{
			if( $this->db = mySql_connect( "$this->srv", "$this->usr", "$this->passwd" ) )
				{
				if( mySql_select_db( "$this->dbname", $this->db ) )
					{
					if (!mysql_set_charset('utf8', $conn)) 
						{
						//die( "Erreur : Impossible de définir le jeu de caractères. Jeu de caractères courant : " .  mysql_client_encoding($conn) ) ;
						}						
					return true ;
					}
				else
					{
					die( "Selection impossible de la base de donnee $this->dnname : " . mysql_error() ) ;
					}
				}
			else
				{
				die( "Connexion impossible a $this->srv : " . mysql_error() ) ;
				}
			}
		}

	function selectDB( $dbname )
		{
		if( !$this->db ) $this->connect() ;
		if( $this->db )
			{
			if( mySql_select_db( "$dbname", $this->db ) )
				{
				$this->dbname = $dbname ;
				return true ;
				}
			else
				{
				die( "Selection impossible de la base de donnee $dnname : " . mysql_error() ) ;
				}
			}
		}

	function close()
		{
		mySql_close( $this->db ) ;
		}

	function buildCursor( $sqltxt )
		{
		$sqltxt = str_replace( "\'", "'", $sqltxt ) ;
		$this->connect() ;
		$cursor = new MySqlDbCursor( $this ) ;
		if( $cursor->open( $sqltxt ) ) return $cursor ;
		else return 0 ;
		}
	// Execute une requette SQL
	function execute( $sqltxt )
		{
		$this->connect() ;
		$this->sql = $sqltxt ;
		if( @mysql_query( $sqltxt, $this->db ) ) return true ;
		return false ;
		}
	// Recupere le message d'erreur
	function getError()
		{
		return mysql_error() ;
		}
	// Convertie la valeur contenue dans $sql
	// en valeur normale
	function sql2value( $type, $sql )
		{
		if( $type == "string" )
			{
			$sql = str_replace( "#cote#", "'", $sql ) ;
			}
		return $sql ;
		}
	// Convertie la valeur contenue dans $value
	// en valeur SQL pour le type donne par $type
	// dans le cas d'un insert ou d'un update
	//
	function value2sql( $type, $value )
		{
		if( $type == "string" )
			{
			if( !$value ) return "null" ;
			$value = str_replace( "'", "#cote#", $value ) ;
			if( $value == "") return "''" ;
			return "'" . $value . "'" ;
			}
		else if( $type == "real" )
			{
			if( $value == "" ) return "null" ;
			if( $value == "NaN" ) return "null" ;
			return $value ;
			}
		else if( $type == "date" )
			{
			if( $value == "") return "null" ;
			return "'" . $value . "'" ;
			//return "'" . strftime( "%Y-%m-%d", $value ) . "'" ;
			//return strftime( "#%Y-%m-%d %H:%M:%S#", $value ) ;
			}
		if( $value == "" ) return "null" ;
		return $value ;
		}
	//
	// Convertie la valeur contenue dans $value
	// en valeur SQL pour le type donne par $type
	// dans le cas d'un WHERE
	//
	function value2sqlWhere( $type, $value )
		{
		if( $type == "string" )
			{
			$value = str_replace( "'", "#cote#", $value ) ;
			if( $value == "") return "=''" ;
			return "='" . $value . "'" ;
			}
		else if( $type == "real" )
			{
			if( $value == "") return " is null" ;
			return "=" . $value ;
			}
		else if( $type == "date" )
			{
			if( $value == "") return " is null" ;
			return "='" . $value . "'" ;
			}
		return "=".$value ;
		}
	}

?>