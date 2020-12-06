<?php

//////////////////////////////////////////////////////////
// arrayiterator.php
//
// Iterateur d'objet dont la liste est contenue dans un
// tableau de type array()
//
// 28/04/2011
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "iiterator.php" ) ;

class tArrayIterator implements iIterator
	{
	protected $indice ; // Indice courant
	protected $currentobject ; // Objet courant
	protected $array ; // Tableau contenant la liste des objet

	public function __construct( $array )
		{
		$this->array = $array ;
		$this->currentobject = null ;
		$this->indice = -1 ;
	 	}

	// Renvoie l'objet courant
	public function getCurrentObject( $appctx )
		{
		return $this->currentobject ;
		}

	// Renvoie le row courant
	public function getCurrentDataRow()
		{
		return $this->currentobject ;
		}

	// Reset le filtre
	function resetFilter()
		{
		}
	// Renvoie la chaine de filtre
	function getFilter()
		{
		return "" ;
		}
	// Met a jour directement la chaine de filtrage
	function setFilter( $filter )
		{
		}
	// Ajoute une condition de filtrage de type =
	// $field: nom du champ
	// $type: type de valeur real, string, date
	// $value: valeur
	function addFilterEqual( $field, $type, $value )
		{
		}
	// Positionne l'iterateur sur la premiere ligne
	public function goToFirst()
		{
		$this->currentobject = reset( $this->array ) ;
		$this->indice = 0 ;
		return 0 ;
		}
	// Positionne l'iterateur sur la derniere ligne
	public function goToLast()
		{
		$this->currentobject = end( $this->array ) ;
		$this->indice = count( $this->array ) -1 ;
		return $this->indice ;
		}
	// Positionne l'iterateur a l'enregistrement suivant
	public function goToNext( $n=1 )
		{
		$currentobject = $this->currentobject ;
		$indice = $this->indice ;
		while( $n && $currentobject )
			{
			$currentobject = next( $this->array ) ;
			$indice++ ;
			$n-- ;
			}
		if( $currentobject )
			{
			$this->currentobject = $currentobject ;
			$this->indice = $indice ;
			return $indice ;
			}
		return -1 ;
		}
	// Positionne l'iterateur a l'enregistrement precedent
	public function goToPrevious( $n=1 )
		{
		$currentobject = $this->currentobject ;
		$indice = $this->indice ;
		while( $n && $currentobject )
			{
			$currentobject = prev( $this->array ) ;
			$indice-- ;
			$n-- ;
			}
		if( $currentobject )
			{
			$this->currentobject = $currentobject ;
			$this->indice = $indice ;
			return $indice ;
			}
		return -1 ;
		}
	// Positionne l'iterateur a la ligne numero $n
	public function goToNum( $n )
		{
		$currentobject = reset( $this->array ) ;
		$indice = 0 ;
		while( $n && $currentobject )
			{
			$currentobject = next( $this->array ) ;
			$indice++ ;
			$n-- ;
			}
		if( $currentobject )
			{
			$this->currentobject = $currentobject ;
			$this->indice = $indice ;
			return $indice ;
			}
		return -1 ;
		}
	// Positionne l'iterateur sur la premiere ligne
	// contenant la valeur $value pour le champ $field
	public function goToValue( $fieldname, $value )
		{
		$currentobject = reset( $this->array ) ;
		$indice = 0 ;
		while( $currentobject )
			{
			if( $currentobject->$fieldname == $value )
				{
				$this->indice = $indice ;
				$this->currentobject = $currentobject ;
				return $this->indice ;
				}
			$currentobject = next( $this->array ) ;
			if( $currentobject ) $indice++ ;
			}
		return -1 ;
		}
	// Positionne l'iterateur sur la premiere ligne
	// contenant la valeur $value dans le debut du champ $field
	public function goToLikeValue( $fieldname, $value, $mode="cassenocare" )
		{
		$ucase = false ;
		if( $mode == "cassenocare" )
			{
			$value = strtoupper( $value ) ;
			$ucase = true ;
			}

		$l = strlen( $value ) ;

		$currentobject = reset( $this->array ) ;
		$indice = 0 ;
		while( $currentobject )
			{
			// Case sensitive
			if( $ucase )$ccp = strtoupper( $currentobject->$fieldname ) ;
			else $ccp = $currentobject->$fieldname ;

			// Compare valeur
			if( substr( $ccp, 0, $l ) == $value )
				{
				$this->indice = $indice ;
				$this->currentobject = $currentobject ;
				return $this->indice ;
				}
			$currentobject = next( $this->array ) ;
			if( $currentobject ) $indice++ ;
			}
		return -1 ;
		}
	// Recupere directement le champ $fieldname de l'objet courant
	public function __get( $fieldname )
		{
		if( $this->currentobject ) return $this->currentobject->$fieldname ;
		return "" ;
		}

	// Cree un clone de l'iterateur
	function buildClone()
		{
		return new tArrayIterator( $this->array ) ;
		}
	}

?>