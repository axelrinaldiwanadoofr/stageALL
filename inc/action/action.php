<?php
//////////////////////////////////////////////////////////
// action.php
//
// Définition des gestionnaire d'action
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////


class Action
	{
	var $id ; // Identifiant de l'action
	var $iddb ; // Identifiant de l'action en BD
	var $idx ; // Index de l'action dans le tableau actions en js
	var $libelle ; // Libelle de l'action
	var $cible ; // Noeud cible de l'action
	var $actions ; // Actions filles
	var $property ; // Tableau des proprietes

	function __construct( $idx, $id, $libelle="" )
		{
		$this->idx = $idx ;
		$this->id = $id ;
		$t = explode( "$", $id ) ;
		$this->iddb = $t[0] ;
		$this->libelle = $libelle ;
		$this->actions = array() ;
		$this->property = array() ;
		$this->property["cible"] = "NOEUD" ;
		}
	// Genere ajoute une action fille
	function setCible( &$node )
		{
		$this->cible = $node ;
		foreach( $this->actions as $n=>$action )
			{
			$action->setCible( $node ) ;
			}
		}
	// Genere ajoute une action fille
	function addAction( &$action )
		{
		$this->actions[$action->id] = $action ;
		return $action ;
		}
	// Met a jour une propriete
	// Renvoie true si ok et false si non
	function setProperty( &$appctx, $property, $value )
		{
		$this->$property = $value ;
		return true ;
		}
	// Affiche sous forme de liste le contenu des propriete
	function debugShowProperty( &$appctx )
		{
		$appctx->Indent() ; echo( "<p> Propriete de l'action $this->id</p>") ;
		foreach( $this->property as $property=>$type )
			{
			$value = $this->$property ;
			$appctx->Indent() ; echo( "<p> $property : $type : $value</p>") ;
			}
		}
	// Genere une instance de la classe Figure en JS
	function buildJsAction( &$appctx )
		{
		}
	// Charge l'objet a partir de la base de donnee
	function loadPropertyFromDB( &$appctx, $page, $version )
		{
		$cursor = $appctx->db->buildCursor( "select name, type, value from actionproperty where url=\"$appctx->url\" and page=\"$page@$version\" and id=\"$this->iddb\"" ) ;

		while( $fields = $cursor->fetchRow() )
			{
			$name = $fields[0] ;
			$value = $fields[2] ;
			$this->$name = $value ;
			}
		$cursor->close() ;
		}
	// Supprime l'objet dans la base de donnee
	function deleteFromDB( &$appctx, $modele )
		{
		$this->deletePropertyFromDB( $appctx, $modele ) ;
		$this->deleteActionActionFromDB( $appctx, $modele ) ;
		$this->deleteNodeLinkFromDB( $appctx, $modele ) ;
		$appctx->db->Execute( "delete from action where url=\"$appctx->url\" and modele=\"$modele\" and id=\"$this->iddb\"" ) ;
		}
	// Supprime les liens vers des actions filles en DB
	function deleteActionActionFromDB( &$appctx, $modele )
		{
		// Efface les actionss associes
		$appctx->db->Execute( "delete from actionaction where url=\"$appctx->url\" and modele=\"$modele\" and idaction=\"$this->iddb\"" ) ;
		// Efface les actionss associes ou elle apparait comme fils
		$appctx->db->Execute( "delete from actionaction where url=\"$appctx->url\" and modele=\"$modele\" and idchildaction=\"$this->iddb\"" ) ;
		}
	// Supprime les liens vers des noeuds dans la BD
	function deleteNodeLinkFromDB( &$appctx, $modele )
		{
		// Efface les actionss associes
		$appctx->db->Execute( "delete from nodeaction where url=\"$appctx->url\" and modele=\"$modele\" and idaction=\"$this->iddb\"" ) ;
		}
	// Supprime les proprietes de l'action en DB
	function deletePropertyFromDB( &$appctx, $modele )
		{
		$sql = "delete from actionproperty where " ;
		$sql = $sql . "url='" . $appctx->url . "' and modele='" . $modele . "' and id='" . $this->iddb . "'" ;
		$appctx->db->Execute( $sql ) ;
		}
	// Enregistre les proprietes de l'action
	function savePropertyToDB( &$appctx, $modele )
		{
		foreach( $this->property as $property=>$type )
			{
			$value = $this->$property ;
			if( $type == "NOEUD" && $value ) $value = $value->id ;
			$sql = "insert into actionproperty( url, modele, id, name, type, value ) values(" ;
			$sql = $sql . "'" . $appctx->url . "','" . $modele . "','" . $this->iddb . "'," ;
			$sql = $sql . "'" . $property . "','" . $type . "','" . $value . "')" ;
			$appctx->db->Execute( $sql ) ;
			}
		}
	// Enregistre les proprietes de l'action
	function updatePropertyToDB( &$appctx, $modele )
		{
		foreach( $this->property as $property=>$type )
			{
			$sql = "update actionproperty set value = '" . $this->$property ;
			$sql = $sql . "' where url='" . $appctx->url . "' and modele='" . $modele . "' and id='" . $this->iddb ;
			$sql = $sql . "' and property='" . $property . "'" ;
			$appctx->db->Execute( $sql ) ;
			}
		}
	// Enregistre les liens vers des actions filles
	function saveActionActionToDB( &$appctx, $modele )
		{
		$noordre = 0 ;
		// Enregistre les donnees du noeud
		foreach( $this->actions as $n=>$action )
			{
			$sql = "insert into actionaction( url, modele, idaction, idchildaction, noordre ) values(" ;
			$sql = $sql . "'" . $appctx->url . "','" . $modele . "','" . $this->iddb . "','" ;
			$sql = $sql . $action->iddb . "', $noordre )" ;
			$noordre++ ;
			$appctx->db->Execute( $sql ) ;
			}
		}
	// Enregistre l'objet dans la base de donnee
	function saveToDB( &$appctx, $modele )
		{
		$appctx->db->Execute( "delete from action where url=\"$appctx->url\" and modele=\"$modele\" and id=\"$this->iddb\"" ) ;

		$sql = "insert into action( url, modele, id, type ) values(" ;
		$sql = $sql . "'" . $appctx->url . "','" . $modele . "','" . $this->iddb . "'," ;
		$sql = $sql . "'" . get_class( $this ) . "')" ;
		$appctx->db->Execute( $sql ) ;

		$this->savePropertyToDB( $appctx, $modele ) ;
		$this->saveActionActionToDB( $appctx, $modele ) ;
		}
	// Genere une instance de la classe Figure en JS
	function defineJsClass( &$appctx )
		{
		}
	// Connecte l'action aux differents evenements de declenchements
	function buildJsTrigger( &$appctx, &$node )
		{
		$aa = explode( "|", $this->actif ) ;
		$ii = explode( "$", $this->id ) ;
		//$ii[0] = "3" ;

		foreach( $aa as $cibleevent )
			{
			$ee = explode( "->", $cibleevent ) ;
			if( count( $ee ) < 2 )
				{
				$cible = $node ;
				$event = $cibleevent ;
				}
			else
				{
				//$cible = $appctx->nodes[$ee[0]] ;
				if( count( $ii ) > 1 )
					{
					$idcible = $ee[0] . "$" . $ii[1] ;
					$cible = $appctx->nodes[$idcible] ;
					if( !$cible ) $cible = $appctx->nodes[$ee[0]] ;
					}
				else $cible = $appctx->nodes[$ee[0]] ;
				$event = $ee[1] ;
				}
			if( strstr( $event, "onTimeout" ) ) $this->buildJsOnTimeout( $appctx, $cible ) ;
			if( strstr( $event, "onOpen" ) ) $this->buildJsOnOpen( $appctx, $cible ) ;
			if( strstr( $event, "onClose" ) ) $this->buildJsOnClose( $appctx, $cible ) ;
			if( strstr( $event, "onClick" ) ) $this->buildJsOnClick( $appctx, $cible ) ;
			if( strstr( $event, "onMouseOver" ) ) $this->buildJsOnMouseOver( $appctx, $cible ) ;
			if( strstr( $event, "onMouseOut" ) ) $this->buildJsOnMouseOut( $appctx, $cible ) ;
			if( strstr( $event, "onResize" ) ) $this->buildJsOnResize( $appctx, $cible ) ;
			}

		// Associe le noeud cible aux actions filles sans les placees comme action directe du noeud
		$this->linkToNode( $appctx, $node ) ;
		}
	// Connecte l'action aux differents evenements de declenchements
	function linkToNode( &$appctx, &$node )
		{
		$appctx->Indent() ;	echo( "actions[$this->idx].node = nodes[$node->idx] ;\n" ) ;
		// Associe le noeud cible aux actions filles sans les placees comme action directe du noeud
		foreach( $this->actions as $n=>$action )
			{
			$action->linkToNode( $appctx, $node ) ;
			}
		}
	// Associe l'action au timer du node
	function buildJsOnTimeout( &$appctx, &$node )
		{
		$appctx->Indent() ;	echo( "nodes[$node->idx].ontimeout.push( actions[$this->idx] ) ;\n" ) ;
		}
	// Associe l'action a l'evenement onOpen du node
	function buildJsOnOpen( &$appctx, &$node )
		{
		$appctx->Indent() ;	echo( "nodes[$node->idx].onopen.push( actions[$this->idx] ) ;\n" ) ;
		}
	// Associe l'action a l'evenement onClose du node
	function buildJsOnClose( &$appctx, &$node )
		{
		$appctx->Indent() ;	echo( "nodes[$node->idx].onclose.push( actions[$this->idx] ) ;\n" ) ;
		}
	// Associe l'action a l'evenement onResize du node
	function buildJsOnResize( &$appctx, &$node )
		{
		$appctx->Indent() ;	echo( "nodes[$node->idx].onresize.push( actions[$this->idx] ) ;\n" ) ;
		}
	// Associe l'action a l'evenement onClose du node
	function buildJsOnClick( &$appctx, &$node )
		{
		$appctx->Indent() ;	echo( "nodes[$node->idx].onclick.push( actions[$this->idx] ) ;\n" ) ;
		}
	// Associe l'action a l'evenement onClose du node
	function buildJsOnMouseOver( &$appctx, &$node )
		{
		$appctx->Indent() ;	echo( "nodes[$node->idx].onmouseover.push( actions[$this->idx] ) ;\n" ) ;
		}
	// Associe l'action a l'evenement onClose du node
	function buildJsOnMouseOut( &$appctx, &$node )
		{
		$appctx->Indent() ;	echo( "nodes[$node->idx].onmouseout.push( actions[$this->idx] ) ;\n" ) ;
		}
	// Associe les actions filles en JS
	function buildJsChildActions( &$appctx )
		{
		foreach( $this->actions as $n=>$action )
			{
			$appctx->Indent() ;	echo( "actions[$this->idx].add( actions[$action->idx] ) ;\n" ) ;
			}
		}
	}
?>