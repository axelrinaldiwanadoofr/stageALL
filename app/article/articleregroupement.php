<?php
//////////////////////////////////////////////////////////
// articleregroupement.php
//
// Définition d'un regroupement d'article dans Gestion
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class ArticleRegroupement extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "regroupement", "articleregroupement" ) ;
		}
	}

class inArticleRegroupement extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->regroupement = "new" ;
			$this->type = "0" ;
			$this->modeshow = "0" ;
			}
		}
	}
?>