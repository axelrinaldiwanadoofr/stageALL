<?php

	$mb = new MenuH( $appctx ) ;

	// Menu des structures
	$m_structure = new MenuV( $appctx ) ;
	$m_structure->add( new MiFormulaire( $appctx, "Profils", "V_CfProfil", $jeton ) ) ;
	$mb->add( new MiMenuPopup( $appctx, "Profils", $m_structure ) ) ;

	// Menu des articles
	$m_article = new MenuV( $appctx ) ;
	$m_article->add( new MiFormTab( $appctx, "Qualités", "V_CfQualite", $jeton ) ) ;
	$m_article->add( new MiFormTab( $appctx, "Categories", "V_CfCategorie", $jeton ) ) ;
	$m_article->add( new MiFormTab( $appctx, "Types de profil", "V_CfProfilType", $jeton ) ) ;
	$mb->add( new MiMenuPopup( $appctx, "Divers", $m_article ) ) ;

	$appctx->menu = $mb ;
	?>