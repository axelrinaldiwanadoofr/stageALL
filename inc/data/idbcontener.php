<?php

//////////////////////////////////////////////////////////
// idbcontener.php
//
// Interface pour conteneur de base de donnée
//
// Permet le chargement, l'insertion, la modification et
// la suppression d'enregistrement dans une base de donnée
//
// 28/10/2005
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

interface iDbContener
	{
	// Met a jour la ligne pointee les valeurs du tableau de champ $row
	// a partir des valeurs contenue dans le tableau de champ $key
	function updateDataRow( $key, $row ) ;
	// Supprime l'enregistrement contenant les valeurs donnees
	// le tableau $key
	function deleteDataRow( $key ) ;
	// Charge l'enregistrement contenant les valeurs donnees
	// le tableau $key
	function loadDataRow( $key ) ;
	// Insert un enregistrement avec les valeurs du tableau $row
	function insertDataRow( $row ) ;
	// Renvoie le message d'erreur
	function getError() ;
	}
?>