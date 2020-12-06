<?php
//////////////////////////////////////////////////////////
// articleoperation.php
//
// Définition d'une operation de gamme sur un article
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class ArticleOperation extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "reference,noordre", "articleoperation" ) ;
		}
	}

class inArticleOperation extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			$this->noordre = 999 ;
			$this->pht = "0" ;
			$this->modecalculpht = "0" ;
			}
		}
	// Appelée après mise à jour
	public function onValueChanged( $appctx )
		{
		if( $this->soustraitant != "" ) 
			{
			$r_soustraitant = DbGetRowWhereNumeric( $appctx->db, "structures", "sid", $this->soustraitant ) ;
			$this->rssoustraitant = $r_soustraitant["rs"] ;
			}
		else $this->rssoustraitant = "" ;
		}		
	}
?>