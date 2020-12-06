<?php
//////////////////////////////////////////////////////////
// cmslabeltexte.php
//
// Définition d'un texte dans une langue donnée
// pour un noeud de type CmsLabelNode du CMS
// Texte multi-langue
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/factory.php" ) ;
require_once( "inc/data/object.php" ) ;

class CmsLabelTexte extends Factory
	{
	function __construct( $appctx )
		{
 		parent::__construct( $appctx, "id,lang", "cms_labeltexte" ) ;
		}

	// Charge les CmsLabelTexte dont les id sont dans la liste $incondition
	public function loadTextes( $appctx, $incondition )
		{
		$sql = "select * from cms_labeltexte where ( id ) in( $incondition )" ; 
		$this->loadObjectsSql( $appctx, $sql ) ;
		}
		
	// Ajoute les LabelTexte au LabelNode corresponds
	public function addLabelTextes2Nodes( $nodes )
		{
		foreach( $this->objects as $key=>$labeltexte )
			{
			//echo( "Labeltexte: $labeltexte->id " ) ;
			if( array_key_exists( $labeltexte->id, $nodes ) )
				{
				$nodes[$labeltexte->id]->addLabelTexte( $labeltexte->lang, $labeltexte ) ;
				}
			}
		}	
	}
class inCmsLabelTexte extends Object
	{
	function __construct( $appctx, $factory, $key=null, $row=null )
		{
 		parent::__construct( $appctx, $factory, $key, $row ) ;
				
		if( !$key && !array_key_exists( "lang", $row ) ) 
			{
			$l = DbSql( $appctx->db, "select code from langue where code not in( select lang from cms_labeltexte where id=" . $row["id"] . " )" ) ;
			$this->lang = $l["code"] ;
			}
		}
	}
?>