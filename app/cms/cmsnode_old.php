<?php
//////////////////////////////////////////////////////////
// cmsnode.php
//
// Définition des different noeud et objet du DOM
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/persistant.php" ) ;

class CmsNode extends Persistant
	{
	public		$module ;		// Module d'appartenance
	public		$version ;	// Version d'appartenance
	public		$id ;				// Identifiant du noeud
	public 		$type ;  		// Type de l'extend
	public 		$visible ;	// Visble
	public 		$opacity ;  // Opacité
	public 		$x ;				// Position x
	public 		$y ;				// Position y
	public 		$z ;				// Position z
	public 		$idparent ;	// Id du noeud parent

	public		$extend ;   // Objet associé
	protected $parent ;   // Noeud parent
	protected $childs ;		// Noeuds enfants
	protected $actions ;	// Actions associees a ce noeud

	private static $scontroler = null ;

	function __construct( $appctx, $row, $module="", $version=null, $parent=null )
		{
 		parent::__construct( $appctx, $row, self::createObjectControler( $appctx ) ) ;

		$this->extend = null ;
		$this->childs = array() ;
		$this->actions = array() ;

 		// Initialise un nouvel objet
 		if( !$row )
 			{
 			$this->parent = $parent ;
			$this->initialevalues["module"] = $module ;
			$this->initialevalues["version"] = $version ;
			$this->initialevalues["id"] = DbMax( $appctx->db, "cms_node", "id" ) + 1 ;

			if( $parent )	$this->initialevalues["idparent"] = $parent->id ;
			else $this->initialevalues["idparent"] = "" ;
			$this->initialevalues["type"] = "CmsNode" ;
			$this->initialevalues["x"] = "0" ;
			$this->initialevalues["y"] = "0" ;
			$this->initialevalues["z"] = "0" ;
			$this->initialevalues["visible"] = 1 ;
			$this->initialevalues["opacity"] = 100 ;
			$this->copyInitialeValuesToValues() ;
			}
		else
			{
			// Met à jour le lien vers le noeud parent à partir de parentid
			if( $this->idparent )
				{
				$this->parent = $this->controler->getObjectFromKeyString( "$this->idparent" ) ;
				$this->parent->addChild( $this ) ;
				}

			// Charge l'extend dont la classe est donnée par le champ type
			if( $this->type != "CmsNode" )
				{
				$extendcontroler = $appctx->getObjectControler( $this->type ) ;
				if( $extendcontroler )
					{
					$extendkey = array( "id" => "$this->id" ) ;
					$this->extend = $extendcontroler->loadObject( $appctx, $extendkey, "$this->id", $this ) ;
					}
				}
			}
		$this->controler->addObject( $this ) ;
		}

	public static function createObjectControler( $appctx )
		{
 		if( !self::$scontroler )
		 	self::$scontroler = ObjectControler::createObjectControlerWithSqlTable( $appctx, "CmsNode", "cms_node", "module,version,id" ) ;
		return self::$scontroler ;
		}

	// Retourne l'identifiant
	function getId()
		{
		return $this->id ;
		}

	// Définit l'extend
	function setExtend( $extend, $type )
		{
		$this->extend = $extend ;
		$this->type = $type ;
		}

	// Ajoute un noeud fils
	function addChild( $node )
		{
		$this->childs[] = $node ;
		}
	// Ajoute une action
	function addAction( $action )
		{
		$this->actions[] = $action ;
		return $action ;
		}
	// Genere une instance de node
	function buildAllNodeInstance( $cms, $parent )
		{
		$ni = $this->buildNodeInstance( $cms, $parent ) ;
		foreach( $this->childs as $nc )
			{
			$nni = $nc->buildAllNodeInstance( $cms, $ni ) ;
			$ni->addChild( $nni ) ;
			}
		return $ni ;
		}
	// Genere une instance de node
	function buildNodeInstance( $cms, $parent )
		{
		return new CmsNodeInstance( $cms, $this, $parent ) ;
		}
  // Genere les trigger pour toutes les actions associees au noeud
	function buildActionsJsTrigger( &$appctx, $nodeinstance )
		{
		foreach( $this->actions as $action )
			{
			$action->buildJsTrigger( $appctx, $nodeinstance ) ;
			}
		}
	}

class CmsNodeInstance
	{
	var $node ;			// Noeud modele
	var $idx ;			// Index du noeud JS
	var $style ;		// classe de style
	var $visible ;	// Visble
	var $opacity ;  // Opacité
	var $x ;				// Position x
	var $y ;				// Position y
	var $z ;				// Position z
	var $libelle ;
	var $parent ;   // Noeud parent
	var $childs ;   // Noeud fils

	function __construct( $cms, $node, &$niparent )
		{
		$this->node = $node ;
		$this->parent = $niparent ;
		$this->style = "node" ;
		$this->libelle = $node->libelle ;
		$this->visible = $node->visible ;
		$this->opacity = $node->opacity ;

		if( $niparent )
			{
			$this->x = $niparent->x + $node->x ;
			$this->y = $niparent->y + $node->y ;
			$this->z = $niparent->z + $node->z ;
			}
		else
			{
			$this->x = $node->x ;
			$this->y = $node->y ;
			$this->z = $node->z ;
			}
		$this->childs = array() ;
		}
	// Ajoute un noeud fils
	function addChild( $ni )
		{
		$this->childs[] = $ni ;
		}
	// Ajoute une action
	function addAction( $action )
		{
		$this->actions[] = $action ;
		return $action ;
		}
	// Genere l'ensemble de l'objet DOM
	function show( $appctx )
		{
		$this->showBegin( $appctx );
		$this->showChild( $appctx );
		$this->showValue( $appctx );
		$this->showEnd( $appctx );
		}
	// Genere la partie qui doit etre placee dans l'entete
	function showHead( $appctx )
		{
		}
	// Genere la balise d'entete
	function showBegin( $appctx )
		{
		$appctx->Plus() ;
		}
  // Genere le contenu
	function showChild( $appctx )
		{
		foreach( $this->childs as $ni )
			{
			$ni->show( $appctx ) ;
			}
		}
	// Genere le contenu de l'objet
	function showValue( $appctx )
		{
		}
	// Genere la fin de balise
	function showEnd( $appctx )
		{
		$appctx->Moins() ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsNode( $appctx, $cms, $admin )
		{
		$id = $this->node->id ;
		$this->idx = $cms->addNodeInstance( $this ) ;
		if( $this->parent )
			{
			$parentidx = $this->parent->idx ;
			$appctx->Indent() ; echo( "cmsnodes.push( new CmsNode( \"$this->idx\", \"$id\", cmsnodes[$parentidx], $this->visible, $this->opacity, $this->x, $this->y, $this->z, $admin ) ) ;\n" ) ;
			}
		else
			{
			$appctx->Indent() ; echo( "cmsnodes.push( new CmsNode( \"$this->idx\", \"$id\", null, $this->visible, $this->opacity, $this->x, $this->y, $this->z, $admin ) ) ;\n" ) ;
			}

		foreach( $this->childs as $child )
			{
			$child->buildJsNode( $appctx, $cms, $admin ) ;
			}
		}
	// Associe un element DOM au node
	function linkToDomElement( $appctx )
		{
		$appctx->Indent() ; echo( "cmsnodes[$this->idx].linkToDomElement() ;\n" ) ;
		}
	// Met a jour l'element DOM associe
	function updateDomElement( &$appctx )
		{
		$appctx->Indent() ; echo( "cmsnodes[$this->idx].updateDomElement() ;\n" ) ;
		}
  // Genere les trigger pour toutes les actions associees au noeud
	function buildActionsJsTrigger( $appctx )
		{
		$this->node->buildActionsJsTrigger( $appctx, $this ) ;
		}
	}

?>