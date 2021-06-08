<?php
//////////////////////////////////////////////////////////
// cmslabel.php
//
// D�finition du typw d'objets LABEL du DOM
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/persistant.php" ) ;

class CmsLabel extends Persistant
{
	public $node ; // Noeud auquel est rattach� le label
	public $id ; // Identifiant du noeud
	public $style ; // classe de style
	public $width ; // Largeur du label
	public $ctexte ; // Texte courant ;
	public $textes ; // Textes associ�s au label

	private static $scontroler = null ;

	function __construct( $appctx, $row, $node )
	{
 		parent::__construct( $appctx, $row, self::createObjectControler( $appctx ) ) ;

		$this->textes = array() ;

		$this->node = $node ;
		$node->setExtend( $this, "CmsLabel" ) ;

		if( !$row )
		{
			$this->initialevalues["id"] = $node->getId() ;
			$this->initialevalues["style"] = "cmslabel" ;
			$this->initialevalues["width"] = 100 ;
			$this->copyInitialeValuesToValues() ;

			$langue = $appctx->getLangue() ;
			$this->ctexte = new CmsLabelTexte( $appctx, null, $this, $langue ) ;
			$this->textes[$langue] = $this->ctexte ;
		}
		else
		{
			// Chargement des textes multilangue
			$cursor = $appctx->db->buildCursor( "select * from cms_labeltexte where id=$this->id" ) ;

			while( $row = $cursor->fetchAssoc() )
			{
				$lt = new CmsLabelTexte( $appctx, $row ) ;
				$this->textes[$lt->lang] = $lt ;
			}
			$cursor->close() ;

			$langue = $appctx->getLangue() ;
			$this->ctexte = $this->textes[$langue] ;
		}
		$this->controler->addObject( $this ) ;
	}

	public static function createObjectControler( $appctx )
	{
 		if( !self::$scontroler )
		 	self::$scontroler = ObjectControler::createObjectControlerWithSqlTable( $appctx, "CmsLabel", "cms_label", "id" ) ;
		return self::$scontroler ;
	}

	public function createModele( $appctx, $controler )
	{
		$keystring = $this->initialevalues["id"] ;
		$modele = new MvcModele( $controler, $keystring, $this ) ;
		$modele->addChild( "node", $appctx->getModele( "CmsNode", $this->node ) ) ;
		$modele->addChild( "ctexte", $appctx->getModele( "CmsLabelTexte", $this->ctexte ) ) ;
		$modele->addAnnexe( "module", "node" ) ;
		$modele->addAnnexe( "version", "node" ) ;
		$modele->addAnnexe( "idparent", "node" ) ;
		$modele->addAnnexe( "type", "node" ) ;
		$modele->addAnnexe( "visible", "node" ) ;
		$modele->addAnnexe( "opacity", "node" ) ;
		$modele->addAnnexe( "x", "node" ) ;
		$modele->addAnnexe( "y", "node" ) ;
		$modele->addAnnexe( "z", "node" ) ;
		$modele->addAnnexe( "texte", "ctexte" ) ;
		return $modele ;
	}

	// Renvoie l'identifiant du label
	public function getId()
	{
		return $this->id ;
	}

	// Ajoute un texte dans la langue
	public function addTexte( $lang, $texte )
	{
		$this->textes[$lang] = $texte ;
	}

	// Renvoie le texte dans la langue
	public function getTexte( $lang )
	{
		$texte = $this->textes[$lang] ;
		if( $texte ) return $texte->getTexte() ;
		return "" ;
	}

	// Genere une instance de Label
	function buildNodeInstance( $cms, $parent )
	{
		return new CmsLabelInstance( $cms, $this, $parent ) ;
	}
}

class CmsLabelInstance extends CmsNodeInstance
{
	var $size ;    // Largeur
	var $texte ;		// Texte du label

	function __construct( $cms, $label, $parent )
	{
		parent::__construct( $cms, $label, $parent ) ;
		$this->texte = $label->texte ;
		$this->size = $label->size ;
	}

	// Genere une instance de la classe Figure en JS
	function buildJsNode( $appctx, $cms, $admin )
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
	function showBegin( $appctx )
	{
		$appctx->Plus() ;
		$appctx->Indent() ;
		echo( "<span id=\"$this->idx\" class=\"nodelabel\" >\n") ;
	}

	// Genere le contenu
	function showValue( $appctx )
	{
		$appctx->Indent() ; echo( "$this->texte\n") ;
	}

	// Genere la fin de balise
	function showEnd( $appctx )
	{
		$appctx->Indent() ; echo( "</span>\n") ;
		$appctx->Moins() ;
	}
}

?>