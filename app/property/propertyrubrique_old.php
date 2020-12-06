<?php
//////////////////////////////////////////////////////////
// propertyrubrique.php
//
// D�finition des rubriques pour les propri�t� dans Gestion
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/dbobject.php" ) ;

class PropertyRubrique extends DbObject
	{
	function __construct( $appctx, $key=null, $newobject=null )
		{
 		parent::__construct( $appctx, "rubrique", "propertyrubrique", $key, $newobject ) ;
		
		if( $newobject )
			{
			$this->rubrique = "new" ;
			$this->noordre = 999 ;
			}
		}
	}
?>