<?php
//////////////////////////////////////////////////////////
// error.php
//
// Gestion d'erreur
//
// 05/03/2008
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////


class Error
	{
		var $texte ;

		function __construct()
			{
			}

		// Inserer un message
		function NewError( $message, $show=true )
			{
			$this->texte = "Error: ".$message ;
			if( $show ) $this->Show() ;
			}
		// Inserer un message
		function NewMsg( $message )
			{
			$this->texte = "Error: ".$message ;
			}

		// Inserer un message
		function NewWarning( $message, $show )
			{
			$this->texte = "Warning: ".$message ;
			if( $show ) $this->Show() ;
			}

		// Affiche un message
		function Show()
			{
			echo( "$this->texte~" ) ;
			}
		// Affiche un message sous forme d'alerte
		function Alert()
			{
			echo( "<script>alert( \"$this->texte\" );</script>\n" ) ;
			}
		function GetMsg()
			{
			return $this->texte ;
			}
	}


?>