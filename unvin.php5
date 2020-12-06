<?php
require_once( "baseinclude.php5") ;

//session_start() ;
if( array_key_exists( "config", $_GET ) )	$config = $_GET["config"] ;
if( array_key_exists( "config", $_POST ) ) $config = $_POST["config"] ;

$appctx = new AppContexte( "home", "Ayawf" ) ;
$_POST["appctx"] = $appctx ;
$cfg = $appctx->loadCfgFile( "app/start/cfg_$config.txt" ) ;
$appctx->db = new MySqlConnect( $cfg["dbname"], $cfg["dbsrv"], $cfg["dbusr"], $cfg["dbpasswd"] ) ;
$appctx->db->connect() ;

if( array_key_exists( "jeton", $_POST ) )	$jeton = $_POST["jeton"] ;
else if( array_key_exists( "jeton", $_GET ) )	$jeton = $_GET["jeton"] ;

$window = "appctx" ;
if( array_key_exists( "window", $_POST ) )	$window = $_POST["window"] ;
else if( array_key_exists( "window", $_GET ) )	$window = $_GET["window"] ;

$refvin = null ;
if( array_key_exists( "vin", $_POST ) )	$refvin = $_POST["vin"] ;
else if( array_key_exists( "vin", $_GET ) )	$refvin = $_GET["vin"] ;

//if( array_key_exists( "appctx", $_SESSION ) )	$appctx = $_SESSION["appctx"] ;

if( $appctx )
	{
	$appctx->beginHtmlHead( "appvin.css" ) ;
	$appctx->endHtmlHead() ;

	$appctx->beginHtmlBody() ;
	
	$m_domaine_colonne1 = DbSql( $appctx->db, "select texte from ap_texte where rubrique='Edition' and name='Colonne1' and reference='Domaine'" ) ;
	$m_domaine_colonne1 = $appctx->db->sql2value( "string", $m_domaine_colonne1["texte"] ) ;

	$m_domaine_colonne2 = DbSql( $appctx->db, "select texte from ap_texte where rubrique='Edition' and name='Colonne2' and reference='Domaine'" ) ;
	$m_domaine_colonne2 = $appctx->db->sql2value( "string", $m_domaine_colonne2["texte"] ) ;
	

	$m_vin_colonne1 = DbSql( $appctx->db, "select texte from ap_texte where rubrique='Edition' and name='Colonne1' and reference='Vin'" ) ;
	$m_vin_colonne1 = $appctx->db->sql2value( "string", $m_vin_colonne1["texte"] ) ;

	$m_vin_colonne2 = DbSql( $appctx->db, "select texte from ap_texte where rubrique='Edition' and name='Colonne2' and reference='Vin'" ) ;
	$m_vin_colonne2 = $appctx->db->sql2value( "string", $m_vin_colonne2["texte"] ) ;
	
	$appctx->sendHtml( "<h1>Vins de la Cave de l'Anneau</h1>" ) ;

	if( $refvin )
		{
		$r_vin = $appctx->db->buildCursor( "select * from articles where reference='$refvin'" ) ;
		$vin = $r_vin->fetchAssoc() ;
		
		$r_refdomaine = $appctx->db->buildCursor( "select * from ap_refarticle where reference='$refvin' and rubrique='Vin' and name='Domaine'" ) ;
		$refdomaine = $r_refdomaine->fetchAssoc() ;
		
		$r_domaine = $appctx->db->buildCursor( "select * from articles where reference='" . $refdomaine["article"] . "'" ) ;
		$domaine = $r_domaine->fetchAssoc() ;

		$appctx->sendHtml( "<h2>" . $vin["rlibelle"] . "</h2>" ) ;		
		$appctx->sendHtml( "<h3>" ) ;		
		$appctx->sendHtml( "<table>" ) ;
		$appctx->sendHtml( "<tr>" ) ;
		$appctx->sendHtml( "<td><img src=\"" . $domaine["image"] . "\"></td>" ) ;
		$texte = updateTexte( $appctx, $m_domaine_colonne1, $domaine["reference"] ) ;
		$appctx->sendHtml( "<td>$texte</td>" ) ;
		$texte = updateTexte( $appctx, $m_vin_colonne1, $vin["reference"] ) ;
		$appctx->sendHtml( "<td>$texte" ) ;
		$appctx->sendHtml( "</tr>" ) ;
		$appctx->sendHtml( "/<table>" ) ;
		$appctx->sendHtml( "<table>" ) ;
		$appctx->sendHtml( "<tr>" ) ;
		$texte = updateTexte( $appctx, $m_domaine_colonne2, $domaine["reference"] ) ;
		$appctx->sendHtml( "<td>$texte" ) ;
		$appctx->sendHtml( "</tr>" ) ;
		$appctx->sendHtml( "<tr>" ) ;
		$texte = updateTexte( $appctx, $m_vin_colonne2, $vin["reference"] ) ;
		$appctx->sendHtml( "<td>$texte" ) ;
		$appctx->sendHtml( "</tr>" ) ;
		$appctx->sendHtml( "/<table>" ) ;
		}
	
	$appctx->endHtmlBody() ;
	}
else echo( "Pas de session, veuillez vous reconnecter." ) ;

function updateTexte( $appctx, $texte, $reference )
	{
	// ap_string
	$r_property = $appctx->db->buildCursor( "select * from ap_string where reference='$reference'" ) ;
	
	while( $property = $r_property->fetchAssoc() )
		{
		$texte = str_replace( "*" . $property["rubrique"] . "." . $property["name"] . "*", $property["value"], $texte ) ;
		}

	// ap_texte
	$r_property = $appctx->db->buildCursor( "select * from ap_texte where reference='$reference'" ) ;
	
	while( $property = $r_property->fetchAssoc() )
		{
		$texte = str_replace( "*" . $property["rubrique"] . "." . $property["name"] . "*", $property["texte"], $texte ) ;
		}
		
	// ap_refarticle
	$r_property = $appctx->db->buildCursor( "select rubrique, name, rlibelle from ap_refarticle as p, articles as a where p.reference='$reference' and a.reference=p.article" ) ;
	
	while( $property = $r_property->fetchAssoc() )
		{
		$texte = str_replace( "*" . $property["rubrique"] . "." . $property["name"] . "*", $property["rlibelle"], $texte ) ;
		}
	
	return $texte ;
	}

?>