<?php
//////////////////////////////////////////////////////////
// label.php
//
// Définition du typw d'objets LABEL du DOM
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/cms/node.php" ) ;

class Label extends Node
	{
	var $size ; // Largeur du label
	var $texte ;		// Texte du label

	function __construct( &$cms, $dbfields )
		{
		parent::__construct( $cms, $dbfields ) ;
		$this->texte = "" ;
		$this->size = $dbfields["size"] ;
		}
	// Genere une instance de Label
	function buildNodeInstance( &$cms, $parent )
		{
		return new LabelInstance( $cms, $this, $parent ) ;
		}
	}

class LabelInstance extends NodeInstance
	{
	var $size ;    // Largeur
	var $texte ;		// Texte du label

	function __construct( &$cms, &$label, &$parent )
		{
		parent::__construct( $cms, $label, $parent ) ;
		$this->texte = $label->texte ;
		$this->size = $label->size ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsNode( &$appctx, &$cms, $admin )
		{
		$id = $this->node->id ;
		$this->idx = $cms->addNodeInstance( $this ) ;
		$texte = str_replace( "\"", "\\\"", $this->texte ) ;
		if( $this->parent )
			{
			$parentidx = $this->parent->idx ;
			$appctx->Indent() ; echo( "cmsnodes.push( new CmsLabel( \"$this->idx\", \"$id\", cmsnodes[$parentidx], $this->visible, $this->opacity, $this->x, $this->y, $this->z, \"$texte\", $this->size, $admin ) ) ;\n" ) ;
			}
		else
			{
			$appctx->Indent() ; echo( "cmsnodes.push( new CmsLabel( \"$this->idx\", \"$id\", null, $this->visible, $this->opacity, $this->x, $this->y, $this->z, \"$texte\", $this->size, $admin ) ) ;\n" ) ;
			}

		foreach( $this->childs as $child )
			{
			$child->buildJsNode( $appctx, $cms, $admin ) ;
			}
		}
	// Genere la balise d'entete
	function showBegin( &$appctx )
		{
		$appctx->Plus() ;
		$appctx->Indent() ;
		echo( "<span id=\"$this->idx\" class=\"nodelabel\" >\n") ;
		}
  // Genere le contenu
	function showValue( &$appctx )
		{
		$appctx->Indent() ; echo( "$this->texte\n") ;
		}
	// Genere la fin de balise
	function showEnd( &$appctx )
		{
		$appctx->Indent() ; echo( "</span>\n") ;
		$appctx->Moins() ;
		}
	}

?>

