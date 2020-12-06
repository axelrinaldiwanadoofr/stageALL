<?php
//////////////////////////////////////////////////////////
// property.php
//
// Définition des propriétés dans Gestion d'article
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/dbobject.php" ) ;

class Property extends DbObject
	{
	function __construct( $appctx, $key=null, $newobject=null )
		{
 		parent::__construct( $appctx, "rubrique,name", "property", $key, $newobject ) ;
		
		if( $newobject )
			{
			$this->name = "new" ;
			$this->type = "String" ;
			$this->listevalue = "0" ;
			$this->width = 5 ;
			$this->noordre = 999 ;
			}
		}
	}
?>