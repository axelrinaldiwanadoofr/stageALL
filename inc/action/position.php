<?php
//////////////////////////////////////////////////////////
// position.php
//
// Fixe une position en absolue
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "$inc/action/action.php" ) ;

class Position extends Action
	{
	var $x ;	// X
	var $y ;	// Y
	var $z ;  // Z
	var $actif ;

	function __construct( $idx, $id=-1, $libelle="", $x=0, $y=0, $z=0, $actif="onOpen" )
		{
		parent::__construct( $idx, $id, $libelle ) ;
		$this->x = $x ;
		$this->y = $y ;
		$this->z = $z ;
		$this->actif = $actif ;

		$this->property["x"] = "FLOAT" ;
		$this->property["y"] = "FLOAT" ;
		$this->property["z"] = "FLOAT" ;
		$this->property["actif"] = "TEXT" ;
		}
	// Met a jour une propriete
	// Renvoie true si ok et false si non
	function setProperty( &$appctx, $property, $value )
		{
		if( $property == "z" && $value < 0 )
			{
			$appctx->error->NewMsg( "La propriete Z ne peut pas etre negative." ) ;
			return false ;
			}
		$this->$property = $value ;
		return true ;
		}
	// Genere une instance de la classe Figure en JS
	function defineJsClass( &$appctx )
		{
		$appctx->ShowJsScript( "action/position.js" ) ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsAction( &$appctx )
		{
		$appctx->Indent() ;
		echo( "actions.push( " ) ;
		echo( 	"new Position( " ) ;
		echo( 				"\"$this->id\", $this->x, $this->y, $this->z, \"$this->actif\"" ) ;
		echo( 	" )" ) ;
		echo( " ) ; \n" ) ;
		}
	}

?>