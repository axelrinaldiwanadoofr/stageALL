<?php
//////////////////////////////////////////////////////////
// indenteur.php
//
// Classe pour l'identation automatique des produits HTML
//
// 28/10/2005
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
// Gestion des niveaux d'indentation du code HTML
//////////////////////////////////////////////////////////

class Indenteur
	{
	var $niveau ;
	var $indentation ;

	function Indenteur( $niveau_indentation = 0 )
		{
		$this->niveau = $niveau_indentation ;
		$this->indentation = "  " ;
		}

	function Plus()
		{
		$this->niveau++ ;
		}

	function Moins()
		{
		$this->niveau-- ;
		if( $this->niveau < 0 ) $this->niveau = 0 ;
		}

	function Affiche()
		{
		for( $i=0 ; $i<$this->niveau ; $i++ ) print( $this->indentation ) ;
		}
	}
?>