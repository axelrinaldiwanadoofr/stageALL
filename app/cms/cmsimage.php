<?php
//////////////////////////////////////////////////////////
// cmsimage.php
//
// Définition du typw d'objets IMG du DOM
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/persistant.php" ) ;

class CmsImage extends Persistant
	{
	public $node ; // Noeud auquel est rattaché le label
	public $id ; // Identifiant du noeud
	public $style ; // Style de l'image
	public $width ; // Largeur
	public $height ;	// Haueur
	public $filename ;	// Fichier contenant l'image

	private static $scontroler = null ;

	function __construct( $appctx, $row, $node )
		{
 		parent::__construct( $appctx, $row, self::createObjectControler( $appctx ) ) ;

		$this->node = $node ;
		$node->setExtend( $this, "CmsImage" ) ;

		if( !$row )
			{
			$this->initialevalues["style"] = "cmsimage" ;
			$this->initialevalues["filename"] = "" ;
			$this->initialevalues["width"] = 100 ;
			$this->initialevalues["height"] = 100 ;
			$this->copyInitialeValuesToValues() ;
			}
		$this->controler->addObject( $this ) ;
		}

	public static function createObjectControler( $appctx )
		{
 		if( !self::$scontroler )
		 	self::$scontroler = ObjectControler::createObjectControlerWithSqlTable( $appctx, "CmsImage", "cms_image", "id" ) ;
		return self::$scontroler ;
		}

	public function createModele( $appctx, $controler )
		{
		$keystring = $this->initialevalues["id"] ;
		$modele = new MvcModele( $controler, $keystring, $this ) ;
		$modele->addChild( "node", $appctx->getModele( "CmsNode", $this->node ) ) ;
		$modele->addAnnexe( "module", "node" ) ;
		$modele->addAnnexe( "version", "node" ) ;
		$modele->addAnnexe( "idparent", "node" ) ;
		$modele->addAnnexe( "type", "node" ) ;
		$modele->addAnnexe( "visible", "node" ) ;
		$modele->addAnnexe( "opacity", "node" ) ;
		$modele->addAnnexe( "x", "node" ) ;
		$modele->addAnnexe( "y", "node" ) ;
		$modele->addAnnexe( "z", "node" ) ;
		return $modele ;
		}

	// Genere une instance de Label
	function buildNodeInstance( $cms, $parent )
		{
		return new CmsImageInstance( $cms, $this, $parent ) ;
		}
	}

class CmsImageInstance extends CmsNodeInstance
	{
	var $image ;	// Fichier contenant l'image
	var $width ;  // Largeur
	var $height ;	// Hauteur

	function __construct( $cms, $image, $parent )
		{
		parent::__construct( $cms, $image, $parent ) ;
		$this->image = $image->image ;
		$this->width = $image->width ;
		$this->height = $image->height ;
		$this->style = "nodeimg" ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsNode( $appctx, $cms, $admin )
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
	function showBegin( $appctx )
		{
		$appctx->Plus() ;
		$appctx->Indent() ;
		echo( "<img id=\"$this->idx\" " ) ;
		echo( "class=\"$this->style\" src=\"$this->image\" " ) ;
		echo( "width=\"$this->width\" height=\"$this->height\" >\n") ;
		}
	}

?>