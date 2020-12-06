<?php
//////////////////////////////////////////////////////////
// articleproperties.php
//
// Ensemble des propriétés d'un article
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/factory.php" ) ;
require_once( "inc/data/object.php" ) ;

class ArticleProperties extends Factory
	{
	protected $rubriques ;
	protected $properties ;
	protected $types ;
	
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "reference", null ) ;

		// Charge la définition de toutes les propriétés
		$this->rubriques = array() ;
		$this->properties = array() ;
		$this->types = array() ;
		
		$cr = $appctx->db->buildCursor( "select p.rubrique as rubrique,name,type from propertyrubrique as r, property as p where p.rubrique=r.rubrique order by r.noordre, p.noordre" ) ;
		while( $row = $cr->fetchAssoc() )
			{
			$this->rubriques[] = $row["rubrique"] ;
			$this->properties[] = $row["name"] ;
			$this->types[] = $row["type"] ;
			}
		}
	// Cree un propertyset
	function createPropertySet( $appctx, $article )
		{
		$row = array() ;
		$row["reference"] = $article->reference ;

		$i = 0 ;
		$currentrubrique = "" ;
		foreach( $this->rubriques as $n=>$rubrique )
			{
			$property = $article->getProperty( $rubrique, $this->properties[$n] ) ;
			if( $property )
				{
				if( $currentrubrique != $rubrique )
					{
					$currentrubrique = $rubrique ;
					$row["p" . $i++] = "PropertyRubrique$" . $rubrique ;
					}
				$row["p" . $i++] = "Ap" . $this->types[$n] . "$" . $article->reference . "," . $rubrique . "," . $this->properties[$n] ;
				}			
			}
		return $this->createObjectFromRow( $appctx, $row ) ;
		}
	}
class inArticleProperties extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		}
	}
?>