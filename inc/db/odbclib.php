<?php

//////////////////////////////////////////////////////////
// odbclib.php
//
// Specialisation de DbConnect et de DbCursor pour
// les access aux bases de données
// relationnelles Odbc.
//
// 28/10/2005
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Curseur MySQL d'acces aux base
// de données relationnelle SQL
///////////////////////////////////////////////////////////

class OdbcCursor extends DbCursor
	{
	var $db ;
	var $cursor ;
	var $utf8 ;

	function OdbcCursor( $db, $utf8 = true )
		{
		$this->db = $db ;
		$this->utf8 = $utf8 ;
		}

	function Ouvrir( $sqltxt )
		{
		if( $this->cursor = odbc_do( $this->db, $sqltxt ) ) return true ;
		return false ;
		}

	function FieldName( $num )
		{
		return odbc_field_name( $this->cursor, $num + 1 ) ;
		}

	function NbFields()
		{
		return odbc_num_fields( $this->cursor ) ;
		}

	function NbRows()
		{
		return odbc_num_rows( $this->cursor ) ;
		}

	function Value( $num )
		{
		return odbc_result( $this->cursor, $num + 1 ) ;
		}

	function GetDate( $num )
		{
		$v = odbc_result( $this->cursor, $num + 1 ) ;
		if( $v == "" ) return 0 ;
		$s = explode( " ", $v ) ;
		$d = explode( "-", $s[0] ) ;
		$t = explode( ":", $s[1] ) ;
		return mktime( $t[0],$t[1],$t[2],$d[1],$d[2],$d[0]) ;
		}

	function SetDate( $val )
		{
		return strftime( "#%Y-%m-%d %H:%M:%S#", $val ) ;
		}

	function GetStr( $num )
		{
		$v = odbc_result( $this->cursor, $num + 1 ) ;
		if( $this->utf8 ) return utf8_encode( $v ) ;
		return $v ;
		}

	function SetStr( $val )
		{
		return "'$val'" ;
		}

	function GetNumber( $num )
		{
		return odbc_result( $this->cursor, $num + 1 ) ;
		}

	function SetNumber( $val )
		{
		return $val ;
		}
	function FetchRow( $numrow=-1 )
		{
		if( $numrow > -1 ) return odbc_fetch_row( $this->cursor, $numrow ) ;
		else return odbc_fetch_row( $this->cursor ) ;
		}
	function FetchArray()
		{
		return odbc_fetch_array( $this->cursor ) ;
		}
	//
	// Renvoie le type du champ n° num
	//
	function FieldType( $num )
		{
		return odbc_field_type( $this->cursor, $num + 1 ) ;
		}
	}
///////////////////////////////////////////////////////////
// Connecteur a une base de données relationnelle
// de type Odbc
///////////////////////////////////////////////////////////

class OdbcConnect extends DbConnect
	{
	var $db ;
	var $source ;
	var $error ;
	var $usr ;
	var $passwd ;
	var $dbname ;
	var $utf8 ;

	function OdbcConnect( $error, $source, $usr="", $passwd="", $utf8=true )
		{
		$this->error = $error ;
		$this->source = $source ;
		$this->usr = $usr ;
		$this->passwd = $passwd ;
		$this->utf8 = $utf8 ;

		if( !extension_loaded( 'odbc'))
			{
			$this->error->NewWarning( "Chargement du module odbc.") ;
  		if (strtoupper(substr(PHP_OS, 0, 3)) == 'WIN')
				{
    		dl('php_odbc.dll');
  			}
			else
				{
    		dl('odbc.so');
  			}
  		}
		}

	function Connecter()
		{
		if( $this->db = odbc_connect( "$this->source", "$this->usr", "$this->passwd", SQL_CUR_USE_DRIVER ) )
			{
			return true ;
			}
		$this->error->NewError( "Connection ODBC a $this->source impossible.") ;
		return false ;
		}

	function Fermer()
		{
		odbc_close( $this->db ) ;
		}

	function BuildCursor( $sqltxt )
		{
		$cursor = new OdbcCursor( $this->db, $this->utf8 ) ;
		if( $cursor->Ouvrir( $sqltxt ) )
			{
			return $cursor ;
			}
		else return 0 ;
		}

	function Execute( $sqltxt )
		{
		echo( $sqltxt ) ;
		if( !odbc_do( $this->db, $sqltxt ) )
			{
			$this->error->NewMsg( odbc_errormsg( $this->db) ." " . $sqltxt ) ;
			return false ;
			}
		return true ;
		}

	//
	// Convertie la valeur contenue dans $value
	// en valeur SQL pour le type donne par $type
	// dans le cas d'un insert ou d'un update
	//
	function value2sql( $type, $value )
		{
		if( $type == "VARCHAR" || $type == "varchar" || $type == "char" )
			{
			if( $value == "") return " null" ;
			return "'" . $value . "'" ;
			}
		else if( $type == "DATETIME" )
			{
			if( $value == "") return " null" ;
			return strftime( "#%Y-%m-%d %H:%M:%S#", $value ) ;
			}
		return $value ;
		}
	//
	// Convertie la valeur contenue dans $value
	// en valeur SQL pour le type donne par $type
	// dans le cas d'un WHERE
	//
	function value2sqlWhere( $type, $value )
		{
		if( $type == "VARCHAR" || $type == "varchar" || $type == "char" )
			{
			if( $value == "") return " is null" ;
			return "='" . $value . "'" ;
			}
		else if( $type == "DATETIME" )
			{
			if( $value == "") return " is null" ;
			return "=#" . $value . "#" ;
			}
		return "=".$value ;
		}
	}

?>