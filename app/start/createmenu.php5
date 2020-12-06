<?php

	$mb = new MenuH( $appctx ) ;

	// Menu des structures
	$m_structure = new MenuV( $appctx ) ;
	$m_structure->add( new MiFormulaire( $appctx, "Structure", "V_Structure", $jeton ) ) ;
	$m_structure->add( new MiFormTab( $appctx, "Type d'adresse", "V_TypeAdresse", $jeton ) ) ;
	$m_structure->add( new MiFormTab( $appctx, "Type d'escompte", "V_TypeEscompte", $jeton ) ) ;
	$mb->add( new MiMenuPopup( $appctx, "Structures", $m_structure ) ) ;

	// Menu des articles
	$m_article = new MenuV( $appctx ) ;
	$m_article->add( new MiFormulaire( $appctx, "Article", "V_Article", $jeton ) ) ;
	$m_article->add( new MiFormTab( $appctx, "Categorie", "V_Categorie", $jeton ) ) ;
	$mb->add( new MiMenuPopup( $appctx, "Articles", $m_article ) ) ;

	$appctx->menu = $mb ;
	?>