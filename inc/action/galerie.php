<?php
//////////////////////////////////////////////////////////
// fondue.php
//
// Définition d'une fondue enchainee des noeuds fils du noeud cible
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "$inc/action/action.php" ) ;

class Galerie extends Action
	{
	var $x ;		      // position x des fils
	var $y ;		      // position x des fils
	var $width ;			// largeur des fils
	var $height ;			// hauteur des fils
	var $marge ; 			// marge entre fils
	var $countvisible ; // nombre de fils visible
	var $timepause ;  // temps de pause
	var $xview ;	    // position x photo agrandie
	var $yview ;	    // position x photo agrandie
	var $widthview ;	// largeur photo agrandie
	var $heightview ;	// hauteur photo agrandie
	var $actif ;			// Gestionnaire d'evenement

	function __construct( $idx, $id=-1, $libelle="", $x=0, $y=0, $w=0, $h=0,	$marge=0, $countvisible=0, $timepause=0, $xview=0, $yview=0, $wview=0, $hview=0 )
		{
		parent::__construct( $idx, $id, $libelle ) ;
		$this->x = $x ;
		$this->y = $y ;
		$this->width = $w ;
		$this->height = $h ;
		$this->marge = $marge ;
		$this->countvisible = $countvisible ;
		$this->timepause = $timepause ;
		$this->xview = $xview ;
		$this->yview = $yview ;
		$this->widthview = $wview ;
		$this->heightview = $hview ;
		$this->actif = "onResize@onTimeout@onOpen@onClose" ;

		$this->property["x"] = "FLOAT" ;
		$this->property["y"] = "FLOAT" ;
		$this->property["width"] = "FLOAT" ;
		$this->property["height"] = "FLOAT" ;
		$this->property["marge"] = "FLOAT" ;
		$this->property["countvisible"] = "INT" ;
		$this->property["timepause"] = "INT" ;
		$this->property["xview"] = "FLOAT" ;
		$this->property["yview"] = "FLOAT" ;
		$this->property["widthview"] = "FLOAT" ;
		$this->property["heightview"] = "FLOAT" ;
		$this->property["actif"] = "TEXT" ;
		}
	// Genere une instance de la classe Figure en JS
	function defineJsClass( &$appctx )
		{
		$appctx->ShowJsScript( "action/galerie.js" ) ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsAction( &$appctx )
		{
		$appctx->Indent() ;
		echo( "actions.push( " ) ;
		echo( 	"new Galerie( \"$this->id\", " ) ;
		echo( 				"$this->x, $this->y, " ) ;
		echo( 				"$this->width, $this->height, $this->marge, " ) ;
		echo( 				"$this->countvisible, $this->timepause, " ) ;
		echo( 				"$this->xview, $this->yview, " ) ;
		echo( 				"$this->widthview, $this->heightview, " ) ;
		echo( 				"\"$this->actif\"" ) ;
		echo( 	" )" ) ;
		echo( " ) ; \n" ) ;
		}
	}

?>