<?php
//////////////////////////////////////////////////////////
// articlerecherche.php
//
// Définition d'une recherche d'article dans Gestion
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class ArticleRecherche extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "recherche", "articlerecherche" ) ;
		}
	}

class inArticleRecherche extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->recherche = "new" ;
			}
		}
	}
?>