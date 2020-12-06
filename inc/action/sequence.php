<?php
//////////////////////////////////////////////////////////
// sequence.php
//
// Gestion d'une sequence d'action
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "$inc/action/action.php" ) ;

class Sequence extends Action
	{
	var $flag ;		// Nom d'un flag de declenchement
	var $vflag ;	// Valeur que doit avoir le flag
	var $actif ;

	function __construct( $idx, $id=-1, $libelle="", $flag="", $vflag="", $actif="" )
		{
		parent::__construct( $idx, $id, $libelle ) ;
		$this->flag = $flag ;
		$this->vflag = $vflag ;
		$this->actif = "onTimeout " . $actif ;

		$this->property["flag"] = "TEXT" ;
		$this->property["vflag"] = "TEXT" ;
		$this->property["actif"] = "TEXT" ;
		}
	// Genere une instance de la classe Figure en JS
	function defineJsClass( &$appctx )
		{
		$appctx->ShowJsScript( "action/sequence.js" ) ;
		}
	// Genere une instance de la classe Figure en JS
	function buildJsAction( &$appctx )
		{
		$valid = 1 ;
		if( $this->flag != "" )
			{
			$valid = 0 ;
			$vflag = "" ;
			if( array_key_exists( $this->flag, $_POST ) )	$vflag = $_POST[$this->flag] ;
			if( array_key_exists( $this->flag, $_GET ) )	$vflag = $_GET[$this->flag] ;
			if( $vflag == $this->vflag ) $valid = 1 ;
			}
		$appctx->Indent() ;
		echo( "actions.push( new Sequence( \"$this->id\", " ) ;
		echo( "	\"$this->flag\", \"$this->vflag\", \"$this->actif\", $valid ) ) ;\n" ) ;
		}
	}

?>