<?php
//////////////////////////////////////////////////////////
// cmsnode.php
//
// D�finition d'un noeud de CMS
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/factory.php" ) ;
require_once( "inc/data/object.php" ) ;

class CmsNode extends Factory
	{
	protected $factories ; // Tableau des fabriques pour les parties specifiques des noeux
	protected $rootnodes ; // Tableau des noeux racines charges
	protected $rootviews ; // Tableau des vues racines generees a partir des noeux charges
	protected $cmodule ; // Module en cours de chargement
	
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "id", "cms_node" ) ;		
		$this->cmodule = "." ;
		$this->rootnodes = array() ;
		}
		
	public function onAfterLoadObjects( $appctx )
		{
		if( $this->incondition )
			{
			$this->factories = array() ;
			$this->factories["CmsLabelNode"] = new CmsLabelNode( $appctx, $this ) ;
			$this->factories["CmsImageNode"] = new CmsImageNode( $appctx, $this ) ;
			$this->factories["CmsRootNode"] = new CmsRootNode( $appctx, $this ) ;
			$this->factories["CmsCallNode"] = new CmsCallNode( $appctx, $this ) ;
			$this->factories["CmsLinkNode"] = new CmsLinkNode( $appctx, $this ) ;
			$this->factories["CmsSqlLoopNode"] = new CmsSqlLoopNode( $appctx, $this ) ;
			$this->factories["CmsArticleNode"] = new CmsArticleNode( $appctx, $this ) ;
		
			foreach( $this->factories as $n=>$factory )
				{
				$factory->loadNodes( $appctx, $this->incondition ) ;
				$factory->linkToCmsNode( $this->objects ) ;
				}
			}
			
		// Cree les liens entre noeux parents et noeux enfants
		foreach( $this->objects as $id=>$node )
			{
			if( !$node->linkToParentNode( $this->objects ) ) $this->rootnodes[$this->cmodule] = $node ;
			}
		}
	// Charge les noeux d'un module complet.
	// Si la version est nulle alors prend la premiere version publiee
	public function loadModule( $appctx, $module, $version=null )
		{
		if( !array_key_exists( $module, $this->rootnodes ) )
			{
			$this->cmodule = $module ;
			if( !$version )
				{
				// Cherche la premier version publiee de ce module
				$dbc = $appctx->db->buildCursor( "select version from cms_moduleversion where module='$module' and actif=1" ) ;
				if( $row = $dbc->fetchAssoc() ) $version = $row["version"] ;
				}
			$this->loadObjectsFromWhere( $appctx, "cms_node", "module='$module' and version=$version" ) ;
			$this->onAfterLoadObjects( $appctx ) ;
			
			$faction = new CmsAction( $appctx ) ;
			$faction->loadModule( $appctx, $module, $version ) ;
			$faction->linkToNodes( $this->objects ) ;
			}
		return $this->rootnodes[$module] ;
		}
	// Cherche le noeud racine d'un module complet.
	public function getRootNodeForModule( $module )
		{
		if( array_key_exists( $module, $this->rootnodes ) ) return $this->rootnodes[$module] ;
		return null ;
		}
	// Cree l'ensemble des vues a partir des noeux charges
	public function createAllViews( $appctx, $parentview=null, $arguments )
		{
		foreach( $this->rootnodes as $node )
			{
			$this->rootviews[] = $node->createAllViews( $appctx, $parentview, $arguments ) ;
			}
		}
	// Cree l'ensemble des vues JS associees a partir des vues generees
	public function createAllJsViews( $appctx )
		{
		foreach( $this->rootviews as $view )
			{
			$view->createAllJsViews( $appctx ) ;
			}
		}
	// Cree l'ensemble des objets DOM associees a partir des vues generees
	public function createAllDom( $appctx, $parentview=null )
		{
		foreach( $this->rootviews as $view )
			{
			$view->createDom( $appctx ) ;
			}
		}
	}
	
	
class inCmsNode extends BaseObject
	{
	protected $spnode ; // Partie specifique du noeud
	protected $parent ; // Noeud pere
	protected $childs ; // Noeux fils
	protected $actions ; // Actions
	
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		$this->spnode = null ;
		$this->parent = null ;
		$this->childs = array() ;
		$this->actions = array() ;
		
		if( !$key )
			{
			$this->id = DbParametreInc( $appctx->db, "CMSNODE", "id" ) ;
			$this->visible = 1 ;
			$this->opacity = 100 ;
			$this->x = "0" ;
			$this->y = "0" ;
			$this->z = "0" ;
			}
		
		}
	// Associe la partie specifique du noeud CmsLabelNode, CmsImageNode, ...
	public function setSpNode( $spnode )
		{
		$this->spnode = $spnode ;
		}
	// REnvoie la partie specifique du noeud CmsLabelNode, CmsImageNode, ...
	public function getSpNode()
		{
		return $this->spnode ;
		}
	// Ajoute une action a un noeud
	public function addAction( $action )
		{
		$this->actions[] = $action ;
		}
	// Ajoute le noeud a son pere si celui-ci est charge et renvoie true
	// Renvoie false si le noeud est racine (pas de parent)
	public function linkToParentNode( $objects )
		{
		if( $this->idparent && !$this->parent )
			{
			if( array_key_exists( $this->idparent, $objects ) )	
				{
				$this->parent = $objects[$this->idparent] ;
				$this->parent->childs[] = $this ;
				}
			return true ;
			}
		return false ;
		}
	// Cree une copie d'un noeud et de toutes son arborescence de noeud et d'action
	public function createCopy( $appctx, $row=null )
		{
		if( $this->spnode )
			{
			// Cree une copie du noeud specifique et du noeud de base
			$spfactory = $this->spnode->factory ;
			$new_spnode = $spfactory->copyObject( $appctx, $this->spnode, $row ) ;
			$new_node = $new_spnode->node ;

			// Copie les fils
			$row["idparent"] = $new_node->id ;
			foreach( $this->childs as $n=>$child )
				{
				$new_child = $child->createCopy( $appctx, $row ) ;
				$new_child->parent = $new_node ;
				$new_node->childs[] = $new_child ;
				}
			return $new_node ;
			}
		}
	// Enregistre un noeud et son arborescence
	public function save()
		{
		$ok = true ;
		if( !parent::save() ) $ok = false ;
		
		// Enregistre les noeud fils
		foreach( $this->childs as $n=>$child )
			{
			$child->spnode->save() ;
			}
		return $ok ;
		}		
	// Cherche un noeud dans une arborescence de noeud a partir de son id
	public function getNodeById( $id )
		{
		if( $this->id == $id ) return $this ;

		foreach( $this->childs as $n=>$child )
			{
			$node = $child->getNodeById( $id ) ;
			if( $node ) return $node ;
			}
		return null ;
		}		
		
	// Renvoie les valeurs de la partie specifique du noeud et du node associ� comme s'il s'agissait d'un meme objet specifique
	public function sendAnswerValues( $appctx )
		{
		if( $this->spnode ) 
			{
			$this->spnode->sendAnswerValues( $appctx ) ;
			}
		else 
			{
			$answer = $this->createStringHeadToSend() ;
			$this->copyAttributesToValues() ;		
			$answer .= $this->createStringValuesToSend() ;
			$appctx->sendAnswer( $answer ) ;
			}
			
		// Renvoie des valeurs pour les actions
		foreach( $this->actions as $action )
			{
			$action->sendAnswerValues( $appctx ) ;
			}					
		}		
		
	// Genere toutes les vues sur les noeux
	function createAllViews( $appctx, $parentview, $arguments )
		{
		if( !$this->spnode ) echo( "Erreur: noeud $this->id pas d'extension" ) ;
		$view = $this->spnode->createView( $appctx, $parentview, $arguments ) ;
		
		// Cree les vues sur les actions associe au noeud
		foreach( $this->actions as $action )
			{
			$action->createAllViews( $appctx, $view, $arguments ) ;
			}		
		
		// Cree les vues sur les noeux fils
		foreach( $this->childs as $childnode )
			{
			$childnode->createAllViews( $appctx, $view, $arguments ) ;
			}		
		return $view ;
		}		
	}

// Vue sur le noeud	
class vwCmsNode
	{
	protected $idx ; // Identifiant de la vue
	protected $parent ; // Vue parent
	protected $childs ; // Vues filles
	protected $innode ; // Instance du noeud
	protected $vwactions ; // Vues sur les actions filles
	protected static $tidx = 10000 ; // Compteur pour identifiants de vue
	
	function __construct( $appctx, $innode, $parent )
		{
		$this->parent = $parent ;
		if( $parent ) $parent->addChild( $this ) ;
		$this->innode = $innode ;
		$this->childs = array() ;
		$this->vwactions = array() ;
		$this->idx = self::$tidx++ ;
		
		// Copie les champs du noeud de reference
		foreach( $innode as $field=>$value )
			{
			$this->$field = $value ;
			}
		}
	// Ajoute une vue fille
	function addChild( $child )
		{
		$this->childs[] = $child ;
		}
	// Ajoute une vue action
	function addVwAction( $vwaction )
		{
		$this->vwactions[] = $vwaction ;
		}
	// Calcule une valeur a partir des arguements
	function computeValue( $value )
		{
		if( $this->parent ) return $this->parent->computeValue( $value ) ;
		else return $value ;
		}
	// Renvoie la chaine argumentaire
	function getArguments()
		{
		if( $this->parent ) return $this->parent->getArguments() ;
		return null ;
		}		
	// Genere et empile une vue associee en JS
	function pushJsView( $appctx )
		{
		$js = $appctx->sendJs( "var t = cms.pushNodeView( new CmsNode(), \"CmsNode\", \"$this->id\", \"$this->idx\" ) ;" ) ;
		}
	// Depile une vue associee en JS
	function popJsView( $appctx )
		{
		$js = $appctx->sendJs( "cms.popNodeView() ;" ) ;
		}
	// Genere toutes les vues associee en JS de l'arborescence
	function createAllJsViews( $appctx )
		{
		$this->pushJsView( $appctx ) ;
		// Genere les vues de l'action
		foreach( $this->vwactions as $vwaction )
			{
			$vwaction->createAllJsViews( $appctx ) ;
			}
		// Genere les vues JS des vues des noeux fils
		foreach( $this->childs as $child )
			{
			$child->createAllJsViews( $appctx ) ;
			}
		$this->popJsView( $appctx ) ;
		}		
	// Genere la balise d'entete
	function createDomHead( $appctx )
		{
		$appctx->PushIndent() ;
		}
	// Genere le contenu
	function createDomValue( $appctx )
		{
		}
	// Genere la fin de balise
	function createDomEnd( $appctx )
		{
		$appctx->PopIndent() ;
		}	
	// Genere l'ensemble de l'objet DOM
	function createDom( $appctx )
		{
		$this->createDomHead( $appctx );
		$this->createDomValue( $appctx );
		$this->createDomEnd( $appctx );
		$this->createDomForChild( $appctx );
		}
  // Genere les objets DOM des vues filles
	function createDomForChild( $appctx )
		{
		foreach( $this->childs as $child )
			{
			$child->createDom( $appctx ) ;
			}
		}
	}

?>