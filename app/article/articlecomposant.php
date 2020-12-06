<?php
//////////////////////////////////////////////////////////
// articlecomposant.php
//
// D�finition d'un composant un article
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class ArticleComposant extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "reference,composant", "articlecomposant" ) ;
		}
	}

class inArticleComposant extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			}
		}
	}
?>