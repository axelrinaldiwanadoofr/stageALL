<?php
//////////////////////////////////////////////////////////
// articleexport.php
//
// Définition d'un champ pour l'export d'article
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/object.php" ) ;
require_once( "inc/data/factory.php" ) ;

class ArticleExport extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "recherche,dbfield", "articleexport" ) ;
		}
	}

class inArticleExport extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
		
		if( !$key )
			{
			if( $row["dbfield"] != "" ) 
				{
				$r_field = DbSql( $appctx->db, "select * from articleexport where recherche is null and dbfield='" . $row["dbfield"] . "'" ) ;
				$this->etiquette = $r_field["etiquette"] ;
				$this->entete = $this->etiquette ;
				}
			$this->noordre = 999 ;
			}
		}
	// Appelée après mise à jour
	public function onValueChanged( $appctx )
		{
		if( $this->dbfield != "" )
			{
			$r_field = DbSql( $appctx->db, "select * from articleexport where recherche is null and dbfield='$this->dbfield'" ) ;
			$this->etiquette = $r_field["etiquette"] ;
			if( $this->entete == "" ) $this->entete = $this->etiquette ;
			}
		}		
	}
?>