<?php
//////////////////////////////////////////////////////////
// articlestructure.php
//
// Définition d'un lien entre un article et un fournisseur
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class ArticleStructure extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "reference,sid", "articlestructure" ) ;
		}
	}

class inArticleStructure extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$r_reference = DbSql( $appctx->db, "select reference from articles" ) ;
			$r_sid = DbSql( $appctx->db, "select sid from structures" ) ;
			//$this->reference = $r_reference["reference"] ;
			$this->sid = $r_sid["sid"] ;
			$this->txremise = "0" ;
			$this->pardefaut = 1 ;
			}
		}
	}
?>