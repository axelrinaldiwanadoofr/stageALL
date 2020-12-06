<?php
//////////////////////////////////////////////////////////
// iobject.php
//
// Interface de base pour les objets gérés par un controleur
// d'objet de type ObjectControler
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////


interface iObject
	{
	// Cree un tableau associatif de tous les champs
	public function getDataRow() ;
	// Cree un tableau associatif avec les champs identifiant l'objet
	public function getKey() ;
	// Cree une chaine de caractere identifiant l'objet
	public function getKeyString() ;
	}
?>