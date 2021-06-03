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
	protected $db ;
	protected $sql ;
	protected $mysqlcursor ;

	function __construct( &$db )
	{
		//parent::__construct() ;
		$this->db = $db ;
	}

	function open( $sqltxt )
	{
		//$cursor = $db->prepare( $sqltxt ) ;
		//if( $cursor->execute( $whereValues ) ) 
		//while( ($row = $cursor->fetch()) && $numLine < $nbLines  ) 

		$this->sql = $sqltxt ;
		try 
		{
			//$this->mysqlcursor = $this->db->prepare( $sqltxt ) ;
			$this->mysqlcursor = $this->db->query( $sqltxt ) ;
			return true ;
		} 
		catch( PDOException $e ) 
		{
			die( "MySqlDbCursor::open Requete $sqltxt invalide : " . $e->getMessage() ) ;
			return false ;
		}
	}

	function requery( $sqltxt )
	{
		try 
		{
			//$this->mysqlcursor = $this->db->query( $sqltxt ) ;
			$this->mysqlcursor = $this->db->prepare( $sqltxt ) ;
			return true ;
		} 
		catch( PDOException $e ) 
		{
			die( "MySqlDbCursor::requery Requete $sqltxt invalide : " . $e->getMessage() ) ;
			return false ;
		}
	}

	function close()
	{
		$this->mysqlcursor = null ;
	}

	function fieldName( $num )
	{
		if( !$this->mysqlcursor ) $this->mysqlcursor = mySql_query( $this->sql, $this->db->db ) ;
		$meta = $this->mysqlcursor->getColumnMeta( $num ) ;
		return $meta["name"] ;
	}

	function fieldType( $num )
	{
		if( !$this->mysqlcursor ) $this->mysqlcursor = mySql_query( $this->sql, $this->db->db ) ;
		$meta = $this->mysqlcursor->getColumnMeta( $num ) ;
		return $meta["pdo_type"] ;
	}

	function countField()
	{
		if( !$this->mysqlcursor ) $this->mysqlcursor = mySql_query( $this->sql, $this->db->db ) ;
		return $this->mysqlcursor->columnCount() ;
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
		$row = $this->mysqlcursor->fetch( PDO::FETCH_ASSOC, PDO::FETCH_ORI_ABS, $nrow ) ;
		if( $row )
		{
			$i = 0 ;
			foreach( $row as $n => $value )
			{
				$meta = $this->mysqlcursor->getColumnMeta( $i++ ) ;
				$row[$n] = $this->db->sql2value( $meta, $value ) ;
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
	protected $connexion ;
	protected $srv ;
	protected $usr ;
	protected $passwd ;
	protected $dbname ;
	protected $sql ;

	function __construct( $dbname="test", $srv="localhost", $usr="root", $passwd="" )
	{
		$this->dbname = $dbname ;
		$this->srv = $srv ;
		$this->usr = $usr ;
		$this->passwd = $passwd ;
	}

	function __destruct()
	{
		if( $this->connexion ) $this->close() ;
	}
		
	function connect()
	{
		if( !$this->connexion )
		{
			try
			{
				$this->connexion = new PDO( 'mysql:host=' . $this->srv . ';dbname=' . $this->dbname, 
					$this->usr, 
					$this->passwd,
					array( PDO::ATTR_PERSISTENT => true ) );

				$this->connexion->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION ) ;
			}
			catch( Exception $e )
			{
				die( "Connexion impossible a $this->srv : " . $e->getMessage() ) ;
			}
		}
	}

	function selectDB( $dbname )
	{
		if( !$this->connexion ) $this->connect() ;
		if( $this->connexion )
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
		$this->connexion = null ;
	}

	function buildCursor( $sqltxt )
	{
		$sqltxt = str_replace( "\'", "'", $sqltxt ) ;

		//$cursor = $db->prepare( $sqltxt ) ;
		//if( $cursor->execute( $whereValues ) ) 
		//while( ($row = $cursor->fetch()) && $numLine < $nbLines  ) 
		$cursor = new MySqlDbCursor( $this ) ;
		if( $cursor->open( $sqltxt ) ) return $cursor ;
		else return 0 ;
	}

	// Execute une requette SQL
	function query( $sqltxt )
	{
		//$this->connect() ;
		$this->sql = $sqltxt ;
		return $this->connexion->query( $sqltxt ) ;
	}

	// Execute une requette SQL
	function execute( $sqltxt )
	{
		//$this->connect() ;
		$this->sql = $sqltxt ;
		if( $this->connexion->exec( $sqltxt ) ) return true ;
		return false ;
	}

	// Recupere le message d'erreur
	function getError()
	{
		return mysql_error() ;
	}

	// Convertie la valeur contenue dans $sql
	// en valeur normale
	function sql2value( $meta, $sql )
	{
		if( $meta["pdo_type"] == PDO::PARAM_STR )
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