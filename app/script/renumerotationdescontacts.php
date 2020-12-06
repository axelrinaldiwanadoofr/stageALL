<?php
//////////////////////////////////////////////////////////
// renumerotationdescontact.php
//
// Renumerote tous les contacts
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

echo( "Renumerotation des contacts: <br>" ) ;

$cursor = $appctx->db->buildCursor( "select sid, contact, nom, prenom from structurecontacts" ) ;

$num = 1 ;

while( $row = $cursor->fetchAssoc() )
	{
	echo( $row["sid"] . " " . $row["contact"] . " " . $row["nom"] . " " . $row["prenom"] . "<br>" ) ;
	$appctx->db->execute( "update structurecontacts set contact=$num where sid=" . $row["sid"] . " and contact=" . $row["contact"] . " and nom='" . $row["nom"] . "' and prenom='" . $row["prenom"] . "'" ) ;
	$num++ ;
	}
?>