<?php

	// Menu principal

	$mb = new MenuH( $appctx ) ;

	// Menu des structures
	$m_structure = new MenuV( $appctx ) ;
	$m_structure->add( new MiFormulaire( $appctx, "Structure", "V_Structure", $jeton ) ) ;
	$m_structure->add( new MiFormulaire( $appctx, "Liste des contacts", "LiMcStructureContact", $jeton ) ) ;
	$m_structure->add( new MiFormTab( $appctx, "Type d'adresse", "V_TypeAdresse", $jeton ) ) ;
	$m_structure->add( new MiFormTab( $appctx, "Type d'escompte", "V_TypeEscompte", $jeton ) ) ;
	$m_structure->add( new MiFormTab( $appctx, "Type de port", "V_TypePort", $jeton ) ) ;
	$m_structure->add( new MiFormTab( $appctx, "Conditions de payement", "V_ConditionPayement", $jeton ) ) ;
	$m_structure->add( new MiExplorer( $appctx, "Structure", "TnStructures", "", $jeton ) ) ;
	$mb->add( new MiMenuPopup( $appctx, "Structures", $m_structure ) ) ;

	// Menu des articles
	$m_article = new MenuV( $appctx ) ;
	$m_article->add( new MiFormulaire( $appctx, "Article", "V_Article", $jeton ) ) ;
	$m_article->add( new MiFormTab( $appctx, "Categories", "V_CategorieArticles", $jeton ) ) ;
	$m_article->add( new MiFormTab( $appctx, "Familles", "V_FamilleArticles", $jeton ) ) ;
	$mb->add( new MiMenuPopup( $appctx, "Articles", $m_article ) ) ;

	// Menu des affaires
	$m_affaire = new MenuV( $appctx ) ;
	$m_affaire->add( new MiFormulaire( $appctx, "Affaire", "V_Affaire", $jeton ) ) ;
	$mb->add( new MiMenuPopup( $appctx, "Affaires", $m_affaire ) ) ;

	// Menu des commandes
	$m_commande = new MenuV( $appctx ) ;
	$m_commande->add( new MiFormulaire( $appctx, "Commande", "V_Commande", $jeton ) ) ;
	$m_commande->add( new MiFormTab( $appctx, "Conditions de payement", "V_ConditionPayement", $jeton ) ) ;
	$m_commande->add( new MiFormTab( $appctx, "Type d'escompte", "V_TypeEscompte", $jeton ) ) ;
	$m_commande->add( new MiFormTab( $appctx, "Type de port", "V_TypePort", $jeton ) ) ;
	$mb->add( new MiMenuPopup( $appctx, "Commandes", $m_commande ) ) ;

	// Menu des employés
	$m_employe = new MenuV( $appctx ) ;
	$m_employe->add( new MiFormTab( $appctx, "Taux horaire", "V_TauxHoraire", $jeton ) ) ;
	$m_employe->add( new MiFormulaire( $appctx, "Employés", "V_Employe", $jeton ) ) ;
	$mb->add( new MiMenuPopup( $appctx, "Employés", $m_employe ) ) ;

	// Menu des divers
	$m_divers = new MenuV( $appctx ) ;
	$m_divers->add( new MiFormTab( $appctx, "Unites", "V_Unites", $jeton ) ) ;
	$m_divers->add( new MiFormTab( $appctx, "Pays", "V_Pays", $jeton ) ) ;
	$m_divers->add( new MiFormulaire( $appctx, "Editions", "V_Editions", $jeton ) ) ;
	$m_divers->add( new MiFormTab( $appctx, "Paramètres", "V_Parametre", $jeton ) ) ;
	$mb->add( new MiMenuPopup( $appctx, "Divers", $m_divers ) ) ;

	$appctx->menus["principal"] = $mb ;
	?>