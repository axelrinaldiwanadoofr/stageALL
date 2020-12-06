<?php
//////////////////////////////////////////////////////////
// objectcontrolermanager.php
//
// Classe ObjectControlerManager
// Gere les controlers d'objet par nom de classe d'objet.
//
// 20/03/2010
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

require_once( "inc/data/objectcontroler.php" ) ;

class ObjectControlerManager
	{
	protected $objectcontrolers ; // Tableau des controlers d'objet

	public function __construct()
		{
		$this->objectcontrolers = array() ;
		}

	public function add( $classname, ObjectControler $controler )
		{
		if( !array_key_exists( $classname, $this->objectcontrolers ) )
			{
			$this->objectcontrolers[$classname] = $controler ;
			}
		}

	public function getObjectControler( $appctx, $objectclassname )
		{
		if( array_key_exists( $objectclassname, $this->objectcontrolers ) )
			{
			return $this->objectcontrolers[$objectclassname] ;
			}
		//$objectcontroler = $objectclassname::createObjectControler( $appctx ) ;
		//$objectcontroler = $objectclassname->createObjectControler( $appctx ) ;
		//$this->objectcontrolers[$objectclassname] = $objectcontroler ;
		//return $objectcontroler ;
		return null ;
 		}

	// Supprime le controleur associé à une classe
	public function removeModeleControler( $classname )
		{
		$this->objectcontrolers[$classname] = null ;
 		}

	// Suprime tous les controleurs
	public function clear()
		{
		$this->objectcontrolers = array() ;
 		}

	// Debugage
	public function debugDump( $indent )
		{
		echo( "<br>" . $indent . "ObjectControlerManager:\n") ;
		echo( "<br>" . $indent . "  objectcontrolers:\n") ;

		foreach( $this->objectcontrolers as $classname=>$controler )
			{
			echo( "<br>" . $indent . "    $classname \n") ;
			$controler->debugDump( $indent . "      ") ;
			}
		}

	}
?>