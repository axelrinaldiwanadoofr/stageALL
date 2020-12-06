<?php
//////////////////////////////////////////////////////////
// aprefarticle.php
//
// Définition d'une propriété de référance à un article
// pour un article
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/factory.php" ) ;
require_once( "inc/data/object.php" ) ;

class ApRefArticle extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "reference,rubrique,name", "ap_refarticle" ) ;
		}
	// Charge les propriétés dont les references articles sont dans la liste $incondition
	public function loadProperties( $appctx, $incondition )
		{
		$sql = "select ap.reference as reference, rubrique, name, article, rlibelle as libelle from ap_refarticle as ap, articles as a " ;
		$sql .= "where ap.article = a.reference and ( ap.reference ) in( $incondition )" ; 
		$this->loadObjectsSql( $appctx, $sql ) ;
		}
	// Ajoute les propriétés chargées aux articles
	public function linkPropertiesToArticles( $articles )
		{
		foreach( $this->objects as $keystring=>$property )
			{
			$articles[$property->reference]->addProperty( $property ) ;
			}
		}		
	}

class inApRefArticle extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		}

	// Remplace les symboles *rubrique.name* par les valeurs de propriétés
	// correspondante dans $texte
	public function updateTexte( $appctx, $texte )
		{
		$texte = str_replace( "*$this->rubrique.$this->name*", "$this->libelle", $texte ) ;
		$texte = str_replace( "$this->rubrique.$this->name", "$this->libelle", $texte ) ;
		return $texte ;
		}
	}
?>