<?php

//////////////////////////////////////////////////////////
// iiterator.php
//
// Interface iIterator pour les itérateur d'objet
//
// 28/04/2011
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
// Iterateur de row
///////////////////////////////////////////////////////////////////////

interface iIterator
	{
	// Retourne l'objet courant
	function getCurrentObject( $appctx ) ;

	// Retourne le row courant
	function getCurrentDataRow() ;

	//--------------------------------------------------------------------
	// Methodes de parcour de l'iterateur, chacune d'elle retourne le n°
	// de l'objet dans la liste parcourue.
	// La liste est supposée commencer son indexation à l'indice 0.
	// Si l'iterateur sort de la liste la valeur -1 est retournée.
	//--------------------------------------------------------------------

	// Positionne l'iterateur sur le premier objet
	function goToFirst() ;
	// Positionne l'iterateur sur la dernier objet
	function goToLast() ;
	// Positionne l'iterateur sur l'objet suivant
	function goToNext( $n=1 ) ;
	// Positionne l'iterateur sur l'objet precedent
	function goToPrevious( $n=1 ) ;
	// Positionne l'iterateur a la ligne numero $n
	function goToNum( $n ) ;
	// Positionne l'iterateur sur la premiere ligne
	// contenant la valeur $value pour le champ $field
	function goToValue( $fieldname, $value ) ;
	// Positionne l'iterateur sur la premiere ligne
	// contenant la valeur $value dans le debut du champ $field
	function goToLikeValue( $fieldname, $value, $mode="cassenocare" ) ;

	//----------------------------------------------------------------------
	// Methode de filtrage des objets de la liste parcourue par l'iterateur
	//----------------------------------------------------------------------

	// Reset le filtre
	function resetFilter() ;
	// Renvoie la chaine de filtre
	function getFilter() ;
	// Met a jour directement la chaine de filtrage
	function setFilter( $filter ) ;
	// Ajoute une condition de filtrage de type =
	// $field: nom du champ
	// $type: type de valeur real, string, date
	// $value: valeur
	function addFilterEqual( $field, $type, $value ) ;
	}

?>