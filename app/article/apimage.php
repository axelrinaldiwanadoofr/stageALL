<?php
//////////////////////////////////////////////////////////
// apimage.php
//
// D�finition d'une propri�t� image pour un article
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/factory.php" ) ;
require_once( "inc/data/object.php" ) ;

class ApImage extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "reference,rubrique,name", "ap_image" ) ;
		}
	// Charge les propri�t�s dont les references articles sont dans la liste $incondition
	public function loadProperties( $appctx, $incondition )
		{
		$sql = "select  * from ap_image " ;
		$sql .= "where ( reference ) in( $incondition )" ; 
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
class inApImage extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;

 		// Initialise un nouvel objet
 		if( !$key )
 			{
			$this->width = 100 ;
			$this->height = 100 ;
			}
		}

	// Remplace les symboles *rubrique.name* par les valeurs de propri�t�s
	// correspondante dans $texte
	public function updateTexte( $appctx, $texte )
		{
		return $texte ;
		}
	}
?>