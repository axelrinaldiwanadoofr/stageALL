<?php
	require_once( "inc/cms/cmsnode.php") ;
	require_once( "inc/cms/cmslabel.php") ;
	require_once( "inc/cms/cmshead.php") ;
	require_once( "inc/cms/cmsimage.php") ;
	require_once( "inc/cms/cmsmodule.php") ;
	require_once( "inc/cms/datatype.php") ;
	require_once( "inc/action/motionpoint2point.php") ;
	require_once( "inc/action/motionresize.php") ;
	require_once( "inc/action/motionfontsize.php") ;
	require_once( "inc/action/motionopacity.php") ;
	require_once( "inc/action/motionpause.php") ;
	require_once( "inc/action/position.php") ;
	require_once( "inc/action/size.php") ;
	require_once( "inc/action/translate.php") ;
	require_once( "inc/action/locenter.php") ;
	require_once( "inc/action/linkht.php") ;
	require_once( "inc/action/externallinkht.php") ;
	require_once( "inc/action/fondue.php") ;
	require_once( "inc/action/galerie.php") ;
	require_once( "inc/action/sequence.php") ;
	require_once( "inc/action/sametimeaction.php") ;

	class Cms
		{
		var $url ; // Url de la page
		var $modele ; // Modele de page utilise
		var $langue ; // Langue de chargement
		var $defaultlangue ; // Langue par defaut
		var $datatypes ; // Tableau des datatype
		var $nodetypes ;
		var $nodes ; 		// Ensemble des noeuds de la page
		var $actions ; 	// Ensemble des actions de la page
		var $firstnode ; // Premier node
		var $lastnode ; // Dernier node
		var $firstaction ; // Premiere action
		var $lastaction ; // Derniere action
		var $nodeid ; // Identifiant des nodes
		var $nodeidx ; // Index des nodes dans le tableau js nodes
		var $actionid ; // Identifiant des actions
		var $actionidx ; // Index des actions dans le tableau js actions
		var $instanceid ; // Identifiant des instance
		var $admin ; // Mode administration
		var $appctx ; // Contexte de l'application
		var $db ; // Connecteur a la base de donnée

		function __construct( $appctx, $cfg, $modele, $langue, $admin=0 )
			{
			$this->datatypes = array() ;
			$this->nodetypes = array() ;
			$this->nodes = array() ;
			$this->actions = array() ;
			$this->url = $cfg["url"] ;
			$this->modele = $modele ;
			$this->langue = $langue ;
			$this->defaultlangue = "FRA" ;
			$this->admin = $admin ;
			$this->nodeid = 0 ;
			$this->nodeidx = 0 ;
			$this->actionid = 0 ;
			$this->actionidx = 0 ;
			$this->instanceid = 0 ;
			$this->firstaction = null ;
			$this->lastaction = null ;
			$this->firstnode = null ;
			$this->lastnode = null ;
			$this->appctx = $appctx ;
			$this->db = $appctx->db ;
			}

		function addNode( &$node )
			{
			$this->nodes[$node->id] = $node ;
			$this->lastnode = $node ;
			if( !$this->firstnode ) $this->firstnode = $node ;
			return $node ;
			}

		function addNodeInstance( &$ni )
			{
			$this->nodeinstances[$this->nodeidx] = $ni ;
			$i = $this->nodeidx ;
			$this->nodeidx++ ;
			return $i ;
			}

		function getNodeById( $id )
			{
			if( array_key_exists( $id, $this->nodes ) ) return $this->nodes[$id] ;
			return null ;
			}

		function getFirstNode()
			{
			return $this->firstnode ;
			}
		function addAction( &$action )
			{
			$this->actions[$action->id] = $action ;
			$this->lastaction = $action ;
			if( !$this->firstaction ) $this->firstaction = $action ;
			return $action ;
			}
		function getLastAction()
			{
			return $this->lastaction ;
			}
		function getFirstAction()
			{
			return $this->firstaction ;
			}

		function newNodeId()
			{
			return $this->modele . "@" . $this->nodeid++ ;
			}

		function newNodeIdx()
			{
			return $this->nodeidx++ ;
			}

		function newActionId()
			{
			$id = $this->modele . "@" . $this->actionid++ ;
			return $id ;
			}
		function newActionIdx()
			{
			return $this->actionidx++ ;
			}
		function newInstanceId()
			{
			return $this->instanceid++ ;
			}
		// Charge les fichiers JS de definition des classes d'action
		function defineActionsJsClass( &$appctx )
			{
			$cursor = $this->db->buildCursor( "select jsfile from actiontype" ) ;

			while( $fields = $cursor->fetchRow() )
				{
				$appctx->ShowJsScript( "/action/$fields[0]") ;
				}
			$cursor->close() ;
			}

		// Charge tous les types de noeud de la BD
		function loadNodeTypeFromDB()
			{
			$cursor = $this->db->BuildCursor( "select type, libelle, phpfile from nodetype" ) ;

			while( $fields = $cursor->FetchRow() )
				{
				$this->nodetypes[$fields[0]] = $fields[2] ;
				}
			}

		// Charge tous les noeuds d'un modele a partir de la DB
		function loadNodesFromDB( $page, $version )
			{
			$root = null ;
			$tnodes = array() ;
			$cursor = $this->db->buildCursor( "select * from cms_node where url='$this->url' and page='$page@$version'" ) ;

			while( $fields = $cursor->fetchAssoc() )
				{
				$classe = "Cms" . $fields["type"] ;
				$node = new $classe( $this, $fields ) ;
				$this->addNode( $node ) ;
				$tnodes[] = $node ;
				if( !$root ) $root = $this->lastnode ;
				}
			$cursor->close() ;

			foreach( $tnodes as $node )
				{
				$node->setParentChildLink( $this ) ;
				}

			return $root ;
			}
		// Cree le lien parent - fils pour les noeuds
		function setAllNodeParentChildLink()
			{
			foreach( $this->nodes as $node )
				{
				$node->setParentChildLink( $this ) ;
				}
			}
	// Charge les variables de l'objet a partir de la base de donnee
	function loadNodesVariableFromDB( $page, $version )
		{
		$cursor = $this->db->buildCursor( "select name, value from nodevariable where url=\"$appctx->url\" and modele=\"$modele\" and id=\"$this->iddb\"" ) ;

		while( $fields = $cursor->fetchRow() )
			{
			$name = $fields[0] ;
			$value = $fields[1] ;
			$this->variables[$name] = $value ;
			}
		$cursor->close() ;
		}

		// Cree toutes les instances des classes Action et derivees et les range
		// dans le tableau actions.
		function buildJsActions( &$appctx )
			{
			$appctx->Indent() ; echo( "<script>\n" ) ;
			foreach( $this->actions as $action )
				{
				$action->buildJsAction( $appctx ) ;
				}
			$appctx->Indent() ; echo( "</script>\n" ) ;
			}
		// Cree toutes les instances de Node en Java Script et les range
		// dans le tableau nodes.
		function buildJsNodes( &$appctx, &$nodeinstance, $admin )
			{
			$appctx->Indent() ; echo( "<script>\n" ) ;
			$nodeinstance->buildJsNode( $appctx, $this, $admin ) ;
			$appctx->Indent() ; echo( "</script>\n" ) ;
			}
		// Associe les elements du DOM aux node.
		function linkToDomElement( &$appctx )
			{
			$appctx->Indent() ; echo( "<script>\n" ) ;
			foreach( $this->nodeinstances as $ni )
				{
				$ni->linkToDomElement( $appctx ) ;
				}
			$appctx->Indent() ; echo( "</script>\n" ) ;
			}
		// Met à jour les elements DOM associés aux node.
		function updateDomElement( &$appctx )
			{
			$appctx->Indent() ; echo( "<script>\n" ) ;
			foreach( $this->nodeinstances as $ni )
				{
				$ni->updateDomElement( $appctx ) ;
				}
			$appctx->Indent() ; echo( "</script>\n" ) ;
			}
		// Associe les actions aux noeuds.
		// Cree tous les triggers de toutes les actions de chaque noeud.
		function buildActionsJsTrigger( &$appctx )
			{
			$appctx->Indent() ; echo( "<script>\n" ) ;
			foreach( $this->nodeinstances as $ni )
				{
				$ni->buildActionsJsTrigger( $appctx ) ;
				}
			$appctx->Indent() ; echo( "</script>\n" ) ;
			}
		// Associe les actions filles a leur action mere
		function buildActionsJsChildActions( &$appctx )
			{
			$appctx->Indent() ; echo( "<script>\n" ) ;
			foreach( $this->actions as $action )
				{
				$action->buildJsChildActions( $appctx ) ;
				}
			$appctx->Indent() ; echo( "</script>\n" ) ;
			}
		// Charge une page dans la version visible d'une page a partir de la BD
		function loadPageFromDB( $page )
			{
			$cursor = $this->db->buildCursor( "select version from cms_pageversion where url='$this->url' and page='$page' and actif=1" ) ;

			if( $fields = $cursor->fetchRow() )
				{
				$version = $fields[0] ;
				$root = $this->getNodeById( "$page@$version" ) ;
				if( !$root )
					{
					//$this->loadActionsFromDB( $page, $version ) ;
					//$this->loadActionsPropertiesFromDB( $page, $version ) ;
					//$this->loadActionsActionsFromDB( $page, $version ) ;
					$root = $this->loadNodesFromDB( $page, $version ) ;
					//$this->loadNodesPropertiesFromDB( $page, $version ) ;
					$this->loadNodesMtlTextesFromDB( $page, $version, $this->langue ) ;
					}
				}
			$cursor->close() ;
			return $root ;
			}

		// Charges toutes les actions d'une page a partir de la BD
		function loadActionsFromDB( $page, $version )
			{
			$cursor = $this->db->buildCursor( "select type, id, libelle from action where url=\"$this->url\" and page=\"$page@$version\"" ) ;

			while( $fields = $cursor->fetchRow() )
				{
				$classe = $fields[0] ;
				$id = $fields[1] ;
				$libelle = $fields[2] ;
				$action = new $classe( $this->actionidx++, $id, $libelle ) ;
				$this->addAction( $action ) ;
				//$action->loadPropertyFromDB( $this, $page, $version ) ;
				}
			$cursor->close() ;
			}
		// Charge les datatype
		function loadDataTypesFromDB()
			{
			$datatype = null ;
			$cursor = $this->db->buildCursor( "select datatype, field, indice from datatypefields order by datatype" ) ;

			while( $fields = $cursor->fetchRow() )
				{
				if( !$datatype || $datatype->type != $fields[0] )
					{
					$datatype = new DataType( $fields[0], "" ) ;
					$this->datatypes[$fields[0]] = $datatype ;
					}
				$datatype->fields[$fields[1]] = $fields[2] ;
				}
			$cursor->close() ;
			}
		// Charge les propriétés des noeud
		function loadNodesPropertiesFromDB( $page, $version )
			{
			// Charge les propriétés classiques
			$cursor = $this->db->buildCursor( "select id, name, datatype, value0, value1, value2, value3 from nodeproperty where url=\"$this->url\" and page=\"$page@$version\"" ) ;

			while( $fields = $cursor->fetchRow() )
				{
				if( array_key_exists( $fields[0], $this->nodes ) )
					{
					$node = $this->nodes[$fields[0]] ;
					$datatype = $this->datatypes[$fields[2]] ;
					foreach(	$datatype->fields as $field=>$indice )
						{
						if( $field == "value" )	$propertyname = $fields[1] ;
						else	$propertyname = "$fields[1]_$field" ;
						$node->$propertyname = $fields[$indice+3] ;
						}
					}
				}
			$cursor->close() ;
			}
		// Charge les textes multilangue des noeud
		function loadNodesMtlTextesFromDB( $page, $version, $langue )
			{
			// Charge les propriétés classiques
			$cursor = $this->db->buildCursor( "select id, name, texte from mtltexte where url='$this->url' and page='$page@$version' and lang='$langue'" ) ;

			while( $fields = $cursor->fetchRow() )
				{
				if( array_key_exists( $fields[0], $this->nodes ) )
					{
					$node = $this->nodes[$fields[0]] ;
					$propertyname = $fields[1] ;
					$node->$propertyname = $fields[2] ;
					}
				}
			$cursor->close() ;
			}
		// Charge l'objet a partir de la base de donnee
		function loadActionsPropertiesFromDB( $page, $version )
			{
			$cursor = $this->db->buildCursor( "select id, name, type, value from actionproperty where url=\"$this->url\" and page=\"$page@$version\"" ) ;

			while( $fields = $cursor->fetchRow() )
				{
				$id = $fields[0] ;
				$name = $fields[1] ;
				$value = $fields[3] ;
				if( array_key_exists( $id, $this->actions ) )	$this->actions[$id]->$name = $value ;
				else echo( "<br>Propriete $name de l'action $id  sans action") ;
				}
			$cursor->close() ;
			}

		// Charges tous les liens noeud - actions d'un modele a apartir de la BD
		function loadNodesActionsFromDB( $page, $version )
			{
			$cursor = $this->db->buildCursor( "select idnode, idaction from nodeaction where url=\"$this->url\" and page=\"$page@$version\" and mode=\"CIBLE\"" ) ;

			while( $fields = $cursor->fetchRow() )
				{
				$idnode = $fields[0] ;
				$idaction = $fields[1] ;
				if( $this->actions[$idaction] && $this->nodes[$idnode] )
					{
					$this->nodes[$idnode]->addAction( $this->actions[$idaction] ) ;
					$this->actions[$idaction]->setCible( $this->nodes[$idnode] ) ;
					}
				}
			$cursor->close() ;
			}

		// Charges tous les liens action-actions d'un modele a partir de la BD
		function loadActionsActionsFromDB( $page, $version )
			{
			$cursor = $this->db->buildCursor( "select idaction, idchildaction from actionaction where url=\"$this->url\" and page=\"$page@$version\" order by noordre" ) ;

			while( $fields = $cursor->fetchRow() )
				{
				$idaction = $fields[0] ;
				$idchildaction = $fields[1] ;
				$this->actions[$idaction]->addAction( $this->actions[$idchildaction] ) ;
				}
			$cursor->close() ;
			}
		}
?>