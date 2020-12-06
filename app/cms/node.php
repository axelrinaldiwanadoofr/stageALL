<?php
//////////////////////////////////////////////////////////
// node.php
//
// Définition des different noeud et objet du DOM
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

class Node
	{
	var $id ;				// Identifiant du noeud
	var $style ;		// classe de style
	var $visible ;	// Visble
	var $opacity ;  // Opacité
	var $x ;				// Position x
	var $y ;				// Position y
	var $z ;				// Position z
	var $libelle ;
	var $parent ;   // Noeud parent
	var $childs ;   // Noeud fils
	var $actions ;		// Actions associees a ce noeud

	function __construct( &$cms, $dbfields )
		{
		$this->id = $dbfields["id"] ;
		$this->parent = $dbfields["parent"] ;
		$this->libelle = $dbfields["libelle"] ;
		$this->visible = $dbfields["visible"] ;
		$this->opacity = $dbfields["opacity"] ;
		$this->x = $dbfields["x"] ;
		$this->y = $dbfields["y"] ;
		$this->z = $dbfields["z"] ;
		$this->childs = array() ;
		$this->actions = array() ;
		}
	// Ajoute un noeud fils
	function addChild( &$node )
		{
		$this->childs[] = $node ;
		}
	// Met a jour le lien parent fils
	function setParentChildLink( &$cms )
		{
		if( $this->parent != "-1" )
			{
			$this->parent = $cms->getNodeById( $this->parent ) ;
			if( $this->parent ) $this->parent->addChild( $this ) ;
			}
		else $this->parent = null ;
		}
	// Ajoute une action
	function addAction( &$action )
		{
		$this->actions[] = $action ;
		return $action ;
		}
	// Genere une instance de node
	function buildAllNodeInstance( &$cms, $parent )
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
	function buildNodeInstance( &$cms, $parent )
		{
		return new NodeInstance( $cms, $this, $parent ) ;
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

class NodeInstance
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

	function __construct( &$cms, &$node, &$niparent )
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
	function addChild( &$ni )
		{
		$this->childs[] = $ni ;
		}
	// Ajoute une action
	function addAction( &$action )
		{
		$this->actions[] = $action ;
		return $action ;
		}
	// Genere l'ensemble de l'objet DOM
	function show( &$appctx )
		{
		$this->showBegin( $appctx );
		$this->showChild( $appctx );
		$this->showValue( $appctx );
		$this->showEnd( $appctx );
		}
	// Genere la partie qui doit etre placee dans l'entete
	function showHead( &$appctx )
		{
		}
	// Genere la balise d'entete
	function showBegin( &$appctx )
		{
		$appctx->Plus() ;
		}
  // Genere le contenu
	function showChild( &$appctx )
		{
		foreach( $this->childs as $ni )
			{
			$ni->show( $appctx ) ;
			}
		}
	// Genere le contenu de l'objet
	function showValue( &$appctx )
		{
		}
	// Genere la fin de balise
	function showEnd( &$appctx )
		{
		$appctx->Moins() ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsNode( &$appctx, &$cms, $admin )
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
	function linkToDomElement( &$appctx )
		{
		$appctx->Indent() ; echo( "cmsnodes[$this->idx].linkToDomElement() ;\n" ) ;
		}
	// Met a jour l'element DOM associe
	function updateDomElement( &$appctx )
		{
		$appctx->Indent() ; echo( "cmsnodes[$this->idx].updateDomElement() ;\n" ) ;
		}
  // Genere les trigger pour toutes les actions associees au noeud
	function buildActionsJsTrigger( &$appctx )
		{
		$this->node->buildActionsJsTrigger( $appctx, $this ) ;
		}
	}

?>

