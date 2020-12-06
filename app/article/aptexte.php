<?php
//////////////////////////////////////////////////////////
// aptexte.php
//
// Définition d'une propriété texte pour un article
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class ApTexte extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "reference,rubrique,name", "ap_texte" ) ;
		}
	// Charge les propriétés dont les references articles sont dans la liste $incondition
	public function loadProperties( $appctx, $incondition )
		{
		$sql = "select  * from ap_texte " ;
		$sql .= "where ( reference ) in( $incondition )" ; 
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
	
class inApTexte extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		}

	// Remplace les symboles *rubrique.name* par les valeurs de propriétés
	// correspondante dans $texte
	public function updateTexte( $appctx, $texte )
		{
		$texte = str_replace( "*$this->rubrique.$this->name*", "$this->texte", $texte ) ;
		$texte = str_replace( "*$this->rubrique.$this->name*", "$this->texte", $texte ) ;
		return $texte ;
		}
	}

?>