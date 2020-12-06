<?php
//////////////////////////////////////////////////////////
// label.php
//
// Definition d'un lien hyper texte
// Définition du typw d'objets <A> du DOM
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/cms/node.php" ) ;

class LinkHT extends Node
	{
	var $link ;			// Reference du lien

	function __construct( &$cms, $dbfields )
		{
		parent::__construct( $cms, $dbfields ) ;
		$this->link = $dbfields["link"] ;
		}
	// Associe un element DOM au node
	function associeElement( &$appctx )
		{
		$appctx->Indent() ; echo( "nodes[$this->idx].associeElement( \"$this->idx\" ) ;\n" ) ;
		}
	// Genere la balise d'entete
	function showBegin( &$appctx )
		{
		$appctx->Plus() ;
		$appctx->Indent() ;
		echo( "<label id=\"$this->idx\" class=\"$this->style\" ") ;
		echo( "onMouseOver=\"nodes[$this->idx].onMouseOver() ;\" ") ;
		echo( "onMouseOut=\"nodes[$this->idx].onMouseOut() ;\" ") ;
		echo( "onClick=\"nodes[$this->idx].onClick() ;\" ") ;
		echo( "onDblClick=\"nodes[$this->idx].onDblClick() ;\">\n") ;
		if( !$this->visible )
			{
			$appctx->Indent() ;
			echo( "<script>document.getElementById( \"$this->idx\" ).style.display=\"none\";</script>\n" ) ;
			}
		if( $this->opacity != 100 )
			{
			$appctx->Indent() ;
			echo( "<script>setOpacity( \"$this->idx\", $this->opacity );</script>\n" ) ;
			}
		}
  // Genere le contenu
	function showValue( &$appctx )
		{
		$appctx->Indent() ; echo( "$this->link\n") ;
		}
	// Genere la fin de balise
	function showEnd( &$appctx )
		{
		$appctx->Indent() ; echo( "</label>\n") ;
		$appctx->Moins() ;
		}
	}

?>

