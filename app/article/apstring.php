<?php
//////////////////////////////////////////////////////////
// apstring.php
//
// D�finition d'une propri�t� string pour un article
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/factory.php" ) ;
require_once( "inc/data/object.php" ) ;

class ApString extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "reference,rubrique,name", "ap_string" ) ;
		}
	// Charge les propri�t�s dont les references articles sont dans la liste $incondition
	public function loadProperties( $appctx, $incondition )
		{
		$sql = "select ap.reference as reference, ap.rubrique as rubrique, ap.name as name, value, width from ap_string as ap, property as p  " ;
		$sql .= "where ap.rubrique=p.rubrique and ap.name=p.name and ( ap.reference ) in( $incondition )" ; 
		$this->loadObjectsSql( $appctx, $sql ) ;
		}
	// Ajoute les propri�t�s charg�es aux articles
	public function linkPropertiesToArticles( $articles )
		{
		foreach( $this->objects as $keystring=>$property )
			{
			$articles[$property->reference]->addProperty( $property ) ;
			}
		}
	}
	
class inApString extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		}
	// Remplace les symboles *rubrique.name* par les valeurs de propri�t�s
	// correspondante dans $texte
	public function updateTexte( $appctx, $texte )
		{
		$texte = str_replace( "*$this->rubrique.$this->name*", "$this->value", $texte ) ;
		$texte = str_replace( "$this->rubrique.$this->name", "$this->value", $texte ) ;
		return $texte ;
		}
	}
?>