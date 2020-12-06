<?php

//////////////////////////////////////////////////////////
// sqliterator.php
//
// Iterateur de requete SQL
//
// 28/10/2005
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
// Iterateur de row
///////////////////////////////////////////////////////////////////////

require_once( "inc/data/iiterator.php" ) ;

class SqlIterator implements iIterator
	{
	protected $db ;  // Connecteur a la base de donnee
	protected $select ; // Clause SELECT de la requete SQL
	protected $from ; // Clause FROM de la requete SQL
	protected $where ; // Clause WHERE de la requete SQL
	protected $filter ; // Complement de condition de clause WHERE de la requette SQL
	protected $groupby ; // Clause GROUP BY de la requete SQL
	protected $having ; // Clause HAVING de la requete SQL
	protected $orderby ; // Clause ORDER BY de la requete SQL
	protected $redoquery ; // Flag indiquant s'il faut reexecuter la requete SQL
	protected $cursor ; // Cursor associe
	protected $currentnrow ; // Numero d'enregistrement courant
	protected $row ; // Ligne de l'enregistrement courant
	protected $objectcontroler ; // Controleur d'objet

	function __construct( $db, $select, $from, $where="", $groupby="", $having="", $orderby="", $objectcontroler=null )
		{
		$this->db = $db ;
		$this->select = $select ;
		$this->from = $from ;
		$this->where = $where ;
		$this->filter = "" ;
		$this->groupby = $groupby ;
		$this->having = $having ;
		$this->orderby = $orderby ;
		$this->redoquery = true ;
		$this->currentnrow = -1 ;
		$this->row = array() ;
		$this->objectcontroler = $objectcontroler ;
	 	}

	// Renvoie  le controleur d'objet
	function getObjectControler()
		{
		return $this->objectcontroler ;
		}

	// Renvoie l'objet courant
	function getCurrentObject( $appctx )
		{
		if( $this->objectcontroler )
			{
			return $this->objectcontroler->getObjectFromDataRow( $appctx, $this->row ) ;
			}
		return null ;
		}

	// Renvoie le row courant
	function getCurrentDataRow()
		{
		return $this->row ;
		}

	// Génère la requete SQL
	function buildSqlQuery()
		{
		$sql = "select $this->select from $this->from" ;
		if( $this->where != "" ) $sql = $sql . " where $this->where" ;
		if( $this->filter != "" )
			{
			if( $this->where != "" ) $sql = $sql . " and $this->filter" ;
			else $sql = $sql . " where $this->filter" ;
			}
		if( $this->groupby != "" ) $sql = $sql . " group by $this->groupby" ;
		if( $this->having != "" ) $sql = $sql . " having $this->having" ;
		if( $this->orderby != "" ) $sql = $sql . " order by $this->orderby" ;
		return $sql ;
		}
	// Ouvre le curseur SQL
	function openCursor()
		{
		$sql = $this->buildSqlQuery() ;
		$this->redoquery = false ;
		$this->cursor = $this->db->buildCursor( $sql ) ;
		}

	// Reexcute la requete SQL
	function requery()
		{
		$sql = $this->buildSqlQuery() ;
		$this->redoquery = false ;
		return $this->cursor->requery( $sql ) ;
		}
	// Reset l'iterateur
	function reset()
		{
		$this->currentnrow = -1 ;
		$this->filter = null ;
		}
	// Reset le filtre
	function resetFilter()
		{
		$this->filter = null ;
		$this->redoquery = true ;
		}
	// Renvoie la chaine de filtre
	function getFilter()
		{
		return $this->filter ;
		}
	// Met a jour directement la chaine de filtrage
	function setFilter( $filter )
		{
		if( $this->filter ) $this->filter = $this->filter . " and " . $filter ;
		else $this->filter = $filter ;
		$this->redoquery = true ;
		}
	// Ajoute une condition de filtrage de type =
	// $field: nom du champ
	// $type: type de valeur real, string, date
	// $value: valeur
	function addFilterEqual( $field, $type, $value )
		{
		if( $this->filter ) $this->filter = $this->filter . " and $field " . $this->db->value2sqlWhere( $type, $value ) ;
		else $this->filter = "$field " . $this->db->value2sqlWhere( $type, $value ) ;
		$this->redoquery = true ;
		}
	// Positionne l'iterateur sur la premiere ligne
	function goToFirst()
		{
		if( !$this->cursor ) $this->openCursor() ;
		if( $this->redoquery ) $this->requery() ;

		// Demande au curseur d'aller sur le premier enregistrement
		if( !$this->cursor->goToRow( 0 ) )
			{
			$this->row = null ;
			return -1 ;
			}

		// Charge le nouvel enregistrement
		$this->currentnrow = 0 ;
		$this->row = $this->cursor->fetchAssoc() ;
		return $this->currentnrow ;
		}
	// Positionne l'iterateur sur la derniere ligne
	function goToLast()
		{
		if( !$this->cursor ) $this->openCursor() ;
		if( $this->redoquery ) $this->requery() ;

		// Demande au curseur d'aller sur le dernier enregistrement

		$nrow = $this->cursor->countRow() - 1 ;
		if( !$this->cursor->goToRow( $nrow ) )
			{
			$this->row = null ;
			return -1 ;
			}

		// Charge le nouvel enregistrement
		$this->currentnrow = $nrow ;
		$this->row = $this->cursor->fetchAssoc() ;
		return $this->currentnrow ;
		}
	// Positionne l'iterateur a l'enregistrement suivant
	function goToNext( $n=1 )
		{
		if( !$this->cursor ) $this->openCursor() ;
		if( $this->redoquery ) $this->requery() ;

		// Demande au curseur d'aller sur l'enregistrement suivant
		if( !$this->cursor->goToRow( $this->currentnrow + $n ) )
			{
			$this->row = null ;
			return -1 ;
			}

		// Charge le nouvel enregistrement
		$this->currentnrow += $n ;
		$this->row = $this->cursor->fetchAssoc() ;
		return $this->currentnrow ;
		}
	// Positionne l'iterateur a l'enregistrement precedent
	function goToPrevious( $n=1 )
		{
		if( !$this->cursor ) $this->openCursor() ;
		if( $this->redoquery ) $this->requery() ;

		if( !$this->cursor->goToRow( $this->currentnrow - $n ) )
			{
			$this->row = null ;
			return -1 ;
			}

		// Charge le nouvel enregistrement
		$this->currentnrow -= $n ;
		$this->row = $this->cursor->fetchAssoc() ;
		return $this->currentnrow ;
		}
	// Positionne l'iterateur a la ligne numero $n
	function goToNum( $n )
		{
		if( !$this->cursor ) $this->openCursor() ;
		if( $this->redoquery ) $this->requery() ;

		// Demande au curseur d'aller sur l'enregistrement n° $n
		if( !$this->cursor->goToRow( $n ) )
			{
			$this->row = null ;
			return -1 ;
			}

		// Charge le nouvel enregistrement
		$this->currentnrow = $n ;
		$this->row = $this->cursor->fetchAssoc() ;
		return $this->currentnrow ;
		}
	// Positionne l'iterateur sur la premiere ligne
	// contenant la valeur $value pour le champ $field
	function goToValue( $fieldname, $value )
		{
		if( !$this->cursor ) $this->openCursor() ;
		if( $this->redoquery ) $this->requery() ;

		$this->cursor->goToRow( 0 ) ;

		$n = 0 ;
		$row = $this->cursor->fetchAssoc() ;
		while( $row )
			{
			if( $row[$fieldname] == $value )
				{
				$this->currentnrow = $n ;
				$this->row = $row ;
				return $this->currentnrow ;
				}
			$row = $this->cursor->fetchAssoc() ;
			$n++ ;
			}
		return -1 ;
		}
	// Positionne l'iterateur sur la premiere ligne
	// contenant la valeur $value dans le debut du champ $field
	function goToLikeValue( $fieldname, $value, $mode="cassenocare" )
		{
		if( !$this->cursor ) $this->openCursor() ;
		if( $this->redoquery ) $this->requery() ;

		$this->cursor->goToRow( 0 ) ;
		$ucase = false ;
		if( $mode == "cassenocare" )
			{
			$value = strtoupper( $value ) ;
			$ucase = true ;
			}

		$l = strlen( $value ) ;
		$n = 0 ;
		$row = $this->cursor->fetchAssoc() ;
		while( $row )
			{
			// Case sensitive
			if( $ucase )$ccp = strtoupper( $row[$fieldname] ) ;
			else $ccp = $row[$fieldname] ;

			// Compare valeur
			if( substr( $ccp, 0, $l ) == $value )
				{
				$this->currentnrow = $n ;
				$this->row = $row ;
				return $this->currentnrow ;
				}
			$row = $this->cursor->fetchAssoc() ;
			$n++ ;
			}
		return -1 ;
		}
	// Recupere directement le champ $fieldname de l'objet courant
	function __get( $fieldname )
		{
		if( $this->row && array_key_exists( $fieldname, $this->row ) ) return $this->row[$fieldname] ;
		return "" ;
		}

	// Cree un clone de l'iterateur
	function buildClone()
		{
		return new SqlIterator( $this->db, $this->select, $this->from, $this->where, $this->groupby, $this->having, $this->orderby ) ;
		}
	}

?>