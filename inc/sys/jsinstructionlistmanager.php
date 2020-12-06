<?php
//////////////////////////////////////////////////////////
// jsinstructionlistmanager.php
//
// Classe JsInstructionListManager
// Gestionnaire  de plusieurs listes d'instructions JS
// a faire executer par le client selon la fenetre
// Utilise la variable $_GET["window"] ou $_POST["window"]
// pour déterminer quelle liste utiliser
//
// 28/10/2005
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/sys/jsinstructionlist.php" ) ;

class JsInstructionListManager
	{
	private $instructionlist ; // Tableau des listes d'instructions

	function __construct()
		{
		$this->instructionlist = array() ;
		}
	// Vide la liste d'instruction associée à la fenêtre $window
	function resetWindow( $window )
		{
		$this->instructionlist[$window]->reset() ;
		}
	// Ajoute la gestion des instructions sur une fenetre si elle n'existe pas
	function addWindow( $window )
		{
		$this->instructionlist[$window] = new JsInstructionList() ;
		}
	// Genere un message de reponse sous forme d'alerte JS
	function sendAlert( $message, $window )
		{
		$this->instructionlist[$window]->sendAlert( $message ) ;
		}
	// Genere un message pour le debuguer
	function sendDebug( $message, $window )
		{
		$this->instructionlist[$window]->send( "printDebug( \"$message\" ) ;" ) ;
		}
	// Ajoute une reponse dans le buffer de reponse
	function send( $str, $window )
		{
		$this->instructionlist[$window]->send( $str ) ;
		}
	// Envoie l'ensemble du buffer de reponse pour AJAX
	function sendAjaxAnswers( $window )
		{
		$this->instructionlist[$window]->sendAjaxAnswers() ;
		}
	// Envoie l'ensemble du buffer de reponse pour AJAX
	function sendAjaxInstructions( $window )
		{
		$this->instructionlist[$window]->sendAjaxInstructions() ;
		}
	// Envoie l'ensemble du buffer de reponse sous la forme d'un script JS
	function sendJsInstructions( $window )
		{
		$this->instructionlist[$window]->sendJsInstructions() ;
		}
	}
?>