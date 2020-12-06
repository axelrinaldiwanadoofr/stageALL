<?php
//////////////////////////////////////////////////////////
// jsinstructionlist.php
//
// Classe JsInstructionList
// Gestion de liste d'instruction JS a faire executer par
// le client
//
// 28/10/2005
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////


class JsInstructionList
	{
	var $instructions ; // Contener des instructions

	function __construct()
		{
		$this->instructions = array() ;
		}
	// Vide le buffer d'instruction
	function reset()
		{
		$this->instructions = array() ;
		}
	// Genere un message de reponse sous forme d'alerte JS
	function sendAlert( $message )
		{
		//$m = utf8_decode( $message ) ;
		$m = $message ;
		$this->instructions[] = "alert( \"$m\" );" ;
		}
	// Ajoute une reponse dans le buffer de reponse
	function send( $str )
		{
		$this->instructions[] = $str ;
		}
	// Met en forme et renvoie la chaine de reponse
	function getAnswersString()
		{
		$str = "DataNoError" ;
		foreach( $this->instructions as $i=>$instruction )
			{
			$str = $str . "<row>" . utf8_encode( $instruction ) ;
			}
		return $str ;
		}
	// Envoie l'ensemble du buffer de reponse pour AJAX
	function sendAjaxAnswers()
		{
		$str = $this->getAnswersString() ;
		echo( utf8_decode( $str ) ) ;
		$this->reset() ;
		}
	// Envoie l'ensemble du buffer de reponse pour AJAX
	function sendAjaxInstructions()
		{
		$str = "Saute premiere ligne" ;
		foreach( $this->instructions as $i=>$instruction )
			{
			//$str = $str . "<ins>" . utf8_encode( $instruction ) ;
			$str = $str . "<ins>" . $instruction ;
			}
		//echo( $str ) ;
		echo( utf8_decode( $str ) ) ;
		$this->instructions = array() ;
		}
	// Envoie l'ensemble du buffer de reponse sous la forme d'un script JS
	function sendJsInstructions()
		{
		echo( "<script>\n" ) ;
		foreach( $this->instructions as $i=>$instruction )
			{
			echo( utf8_decode( $instruction ) ) ;
			//echo( $instruction ) ;
			echo( "\n" ) ;
			}
		echo( "</script>\n" ) ;
		$this->instructions = array() ;
		}
	}
?>