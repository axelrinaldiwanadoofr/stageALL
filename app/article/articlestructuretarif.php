<?php
//////////////////////////////////////////////////////////
// articlestructuretarif.php
//
// Définition d'une politique tarifaire
// sur un lien entre un article et un fournisseur
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class ArticleStructureTarif extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "reference,sid,datedebut,datefin,qtemin,qtemax", "articlestructuretarif" ) ;
		}
	}

class inArticleStructureTarif extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->datedebut = "2011-01-01" ;
			$this->datefin = "2011-12-31" ;
			$this->qtemin = "0" ;
			$this->qtemax = 1000 ;
			$this->txremise = "0" ;
			$this->pardefaut = 1 ;
			}
		}
	}
?>