<?php
	// Menu principal

	$mb = new MenuH( $appctx ) ;

	$m_ayawf = new MenuV( $appctx ) ;
	//$m_fichier->add( new MiFormulaire( $appctx, "Texte multilangue", "V_MtlTexte", $jeton ) ) ;
	//$m_fichier->add( new MiFormulaire( $appctx, "Noeud", "V_Node", $jeton ) ) ;
	//$m_fichier->add( new MiFormulaire( $appctx, "Noeud", "V_Node", $jeton, "cmscontent" ) ) ;
	//$m_fichier->add( new MiFormulaire( $appctx, "CMS Explorer", "V_Cms", $jeton ) ) ;
	//$m_fichier->add( new MiFormulaire( $appctx, "CMS Explorer1", "Tv_Cms", $jeton ) ) ;
	//$m_fichier->add( new MiFormulaire( $appctx, "Action", "V_Action", $jeton ) ) ;
	//$m_fichier->add( new MiFormTab( $appctx, "Variables", "V_Variables", $jeton ) ) ;
	//$m_fichier->add( new MiFormulaire( $appctx, "Pages/Modules", "V_CmsPage", $jeton ) ) ;
	//$m_fichier->add( new MiFormTab( $appctx, "Type de noeud", "V_NodeType", $jeton ) ) ;
	//$m_fichier->add( new MiFormTab( $appctx, "Type d'action", "V_ActionType", $jeton ) ) ;
	//$m_fichier->add( new MiFormTab( $appctx, "Liste des noeud", "V_ListeNode", $jeton ) ) ;
	//$m_fichier->add( new MiScript( $appctx, "Explorateur CMS old", "cmsadmin.php5", "", $jeton ) ) ;
	$m_ayawf->add( new MiExplorer( $appctx, "CMS", "TnCms", "", $jeton ) ) ;
	$m_ayawf->add( new MiExplorer( $appctx, "Gestion des articles", "TnGestionArticle", "", $jeton ) ) ;
	$m_ayawf->add( new MiScript( $appctx, "Test", "appgestionarticle.php", "appctx", $jeton ) ) ;
	//$m_ayawf->add( new MiScript( $appctx, "Liste des domaines", "lca_listedomaine.php", "", $jeton ) ) ;
	$mb->add( new MiMenuPopup( $appctx, "Ayawf", $m_ayawf ) ) ;

	$appctx->addMenu( "principal", $mb ) ;

	// Menu du treeview

	$mb = new MenuH( $appctx ) ;

	$m_ayawf = new MenuV( $appctx ) ;
	$m_ayawf->add( new MiExplorer( $appctx, "CMS", "TnCms", "", $jeton ) ) ;
	$m_ayawf->add( new MiExplorer( $appctx, "Gestion des articles", "TnGestionArticle", "", $jeton ) ) ;
	$m_ayawf->add( new MiScript( $appctx, "Dump js object", "dumpjsobject.php", "debug", $jeton ) ) ;
	$m_ayawf->add( new MiScript( $appctx, "Dump object", "dumpobject.php", "debug", $jeton ) ) ;
	$m_ayawf->add( new MiScript( $appctx, "Dump modele", "dumpmodele.php", "debug", $jeton ) ) ;

	$mb->add( new MiMenuPopup( $appctx, "Ayawf", $m_ayawf ) ) ;

	$appctx->addMenu( "treeview", $mb ) ;
	?>