<?php
//////////////////////////////////////////////////////////
// cmsaction.php
//
// Définition d'une action sur un noeud de CMS
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/factory.php" ) ;
require_once( "inc/data/object.php" ) ;

class CmsAction extends Factory
	{
	protected $factories ;
	
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "id", "cms_action" ) ;		
		}
		
	public function onAfterLoadObjects( $appctx )
		{
		if( $this->incondition )
			{
			$this->factories = array() ;
			$this->factories["CmsFondueAction"] = new CmsFondueAction( $appctx ) ;
			$this->factories["CmsGalerieAction"] = new CmsGalerieAction( $appctx ) ;
			$this->factories["CmsMotionMoveResizeAction"] = new CmsMotionMoveResizeAction( $appctx ) ;
			$this->factories["CmsSequenceAction"] = new CmsSequenceAction( $appctx ) ;
		
			foreach( $this->factories as $n=>$factory )
				{
				$factory->loadActions( $appctx, $this->incondition ) ;
				$factory->linkToCmsAction( $this->objects ) ;
				}			
			}
		// Cree les liens entre action parents et action enfants
		foreach( $this->objects as $id=>$action )
			{
			$action->linkToParentAction( $this->objects ) ;
			}			
		}		
	// Charge les action d'un module complet.
	// Si la version est nulle alors prend la premiere version publiee
	public function loadModule( $appctx, $module, $version=null )
		{
		$this->loadObjectsFromWhere( $appctx, "cms_action", "module='$module' and version=$version", "noordre" ) ;
		$this->onAfterLoadObjects( $appctx ) ;
		}
	// Lie les actions racines a leur noeud
	public function linkToNodes( $nodes )
		{
		// Cree les liens entre action racine et leur noeux
		foreach( $this->objects as $id=>$action )
			{
			$action->linkToNode( $nodes ) ;
			}
		}		
	}
class inCmsAction extends Object
	{
	protected $spaction ; // Partie specifique de l'action
	protected $parent ; // Action parent
	protected $childs ; // Actions enfant
	protected $node ; // Noeud au quel l'action est rattachee
	
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		$this->spaction = null ;
		$this->parent = null ;
		$this->node = null ;
		$this->childs = array() ;
		
		if( !$key )
			{
			$this->id = DbParametreInc( $appctx->db, "CMSACTION", "id" ) ;
			$this->noordre = 999 ;
			$this->actif = 1 ;
			}
		
		}
	// Associe la partie specifique du noeud CmsLabelNode, CmsImageNode, ...
	public function setSpAction( $spaction )
		{
		$this->spaction = $spaction ;
		}
		
	// Ajoute l'action a son pere si celui-ci est charge et renvoie true
	// Renvoie false si l'action est racine (pas de parent)
	public function linkToParentAction( $objects )
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
	// Ajoute l'action au noeud associe
	public function linkToNode( $nodes )
		{
		if( $this->idnode && !$this->node )
			{
			if( array_key_exists( $this->idnode, $nodes ) )	
				{
				$this->node = $nodes[$this->idnode] ;
				$this->node->addAction( $this ) ;
				}
			return true ;
			}
		return false ;
		}
	// Renvoie les valeurs de la partie specifique de l'action et celle associé comme s'il s'agissait d'un meme objet specifique
	public function sendAnswerValues( $appctx )
		{
		if( $this->spaction )
			{
			$this->spaction->copyAttributesToValues() ;		
			$answer = $this->spaction->createStringHeadToSend() ;
			$answer .= $this->spaction->createStringValuesToSend() ;
			}
		else $answer = $this->createStringHeadToSend() ;

		$this->copyAttributesToValues() ;		
		$answer .= $this->createStringValuesToSend() ;
		$appctx->sendAnswer( $answer ) ;
		}		
		
	// Genere toutes les vues sur les action
	function createAllViews( $appctx, $parentview, $arguments )
		{
		if( !$this->spaction ) echo( "Erreur: action $this->id pas d'extension" ) ;
		$view = $this->spaction->createView( $appctx, $parentview, $arguments ) ;
		
		foreach( $this->childs as $childaction )
			{
			$childaction->createAllViews( $appctx, $view, $arguments ) ;
			}		
		return $view ;
		}				
	}
	
// Vue sur l'action	
class vwCmsAction
	{
	protected $idx ; // Identifiant de la vue
	protected $parent ; // Vue parent
	protected $childs ; // Vues filles
	protected $inaction ; // Instance de l'action
	
	function __construct( $appctx, $inaction, $parent )
		{
		$this->parent = $parent ;
		if( $parent ) $parent->addChild( $this ) ;
		$this->inaction = $inaction ;
		$this->childs = array() ;
		
		// Copie les champs du noeud de reference
		foreach( $inaction as $field=>$value )
			{
			$this->$field = $value ;
			}
		}
	// Ajoute une vue fille
	function addChild( $child )
		{
		$this->childs[] = $child ;
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
		$js = $appctx->sendJs( "var t = cms.pushActionView( new CmsAction(), \"CmsAction\", \"$this->id\" ) ;" ) ;
		}
	// Depile une vue associee en JS
	function popJsView( $appctx )
		{
		$js = $appctx->sendJs( "cms.popActionView() ;" ) ;
		}
	// Genere toutes les vues associee en JS de l'arborescence
	function createAllJsViews( $appctx )
		{
		$this->pushJsView( $appctx ) ;
		foreach( $this->childs as $child )
			{
			$child->createAllJsViews( $appctx ) ;
			}
		$this->popJsView( $appctx ) ;
		}		
	// Genere l'ensemble de l'objet DOM
	function createDom( $appctx )
		{
		}		
	}
	
?>