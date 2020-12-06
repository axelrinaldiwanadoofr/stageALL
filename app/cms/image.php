<?php
//////////////////////////////////////////////////////////
// image.php
//
// Définition du typw d'objets IMG du DOM
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/cms/node.php" ) ;

class Image extends Node
	{
	var $image ;	// Fichier contenant l'image
	var $width ;  // Largeur
	var $height ;	// Haueur

	function __construct( &$cms, $dbfields )
		{
		parent::__construct( $cms, $dbfields) ;
		$this->image = $dbfields["image"]  ;
		$this->width = $dbfields["width"] ;
		$this->height = $dbfields["height"] ;
		}

	// Genere une instance de Label
	function buildNodeInstance( &$cms, $parent )
		{
		return new ImageInstance( $cms, $this, $parent ) ;
		}
	}

class ImageInstance extends NodeInstance
	{
	var $image ;	// Fichier contenant l'image
	var $width ;  // Largeur
	var $height ;	// Hauteur

	function __construct( &$cms, &$image, &$parent )
		{
		parent::__construct( $cms, $image, $parent ) ;
		$this->image = $image->image ;
		$this->width = $image->width ;
		$this->height = $image->height ;
		$this->style = "nodeimg" ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsNode( &$appctx, &$cms, $admin )
		{
		$id = $this->node->id ;
		$this->idx = $cms->addNodeInstance( $this ) ;
		if( $this->parent )
			{
			$parentidx = $this->parent->idx ;
			$appctx->Indent() ; echo( "cmsnodes.push( new CmsImage( \"$this->idx\", \"$id\", cmsnodes[$parentidx], $this->visible, $this->opacity, $this->x, $this->y, $this->z, \"$this->image\", $this->width, $this->height, $admin ) ) ;\n" ) ;
			}
		else
			{
			$appctx->Indent() ; echo( "cmsnodes.push( new CmsImage( \"$this->idx\", \"$id\", null, $this->visible, $this->opacity, $this->x, $this->y, $this->z, \"$this->image\", $this->width, $this->height, $admin ) ) ;\n" ) ;
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
		echo( "<img id=\"$this->idx\" " ) ;
		echo( "class=\"$this->style\" src=\"$this->image\" " ) ;
		echo( "width=\"$this->width\" height=\"$this->height\" >\n") ;
		}
	}

?>

