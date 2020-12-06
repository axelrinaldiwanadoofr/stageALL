<?php
//////////////////////////////////////////////////////////
// aobject.php
//
// Classe pour le referencement d'objet JavaScript
//
// Gere un tableau qui reference l'ensemble de objets
// JavaScript cree. Utilise un indentifiant qui est le
// numero de la case du tableau aobjects contenant la reference
// a un objet.
//
// 28/10/2005
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

class AObject
	{
	var $idx ;    // Numero de l'objet courant
	var $to_refresh_jsobject ; 	// L'objet JS associes doit etre rafraichi

	function __construct( &$appctx )
		{
		$appctx->addObject( $this ) ;
		$this->idx = $appctx->objectid ;
		$this->to_refresh_jsobject = false ;
 		}
	// Retourne une chaine de caractere contenant une commande JS de creation
	// d'une instance JS de l'objet.
	function getCreateJsObjectStr( &$appctx )
		{
		return "null" ;
		}
	// Retourne une chaine de caractere pour rafraichir l'objet JS associe
	function getRefreshJsObjectStr( &$appctx )
		{
		return "" ;
		}
	// Demande le rafraichissement de l'objet JS client
	function toRefresh()
		{
		$this->to_refresh_jsobject = true ;
		}
	}
?>