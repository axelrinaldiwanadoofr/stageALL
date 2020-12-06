<?php
//////////////////////////////////////////////////////////
// objectmanager.php
//
// Gestionnaire d'objet implémentant l'interface iObject
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/sys/iobject.php" ) ;

class ObjectManager
	{
	private $idx ; // Identifiant des objets javascript
	private $objects ; // Contener des objects

	function __construct()
		{
		$this->objects = array() ;
		$this->idx = 0 ;
		}
	// Enregistre le nouvel objet dans le tableau objects et
	// lui cree l'attribut idx renseigne avec son indice dans le
	// tableau.
	public function add( iObject $object )
		{
		$this->objects[$this->idx] = $object ;
		$this->idx++ ;
		return $this->idx - 1 ;
		}
	// Recupere un maker avec son $idx
	public function getObjectByIdx( $idx )
		{
		return $this->objects[$idx] ;
		}
	// Supprime tous les objets
	function removeAllObjects()
		{
		$this->idx = 0 ;
		$this->objects = array() ;
		}
	}

?>