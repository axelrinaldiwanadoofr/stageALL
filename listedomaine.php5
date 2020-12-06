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

$domaine = null ;
if( array_key_exists( "domaine", $_POST ) )	$domaine = $_POST["domaine"] ;
else if( array_key_exists( "domaine", $_GET ) )	$domaine = $_GET["domaine"] ;

//if( array_key_exists( "appctx", $_SESSION ) )	$appctx = $_SESSION["appctx"] ;

if( $appctx )
	{
	$appctx->beginHtmlHead( "appvin.css" ) ;
	$appctx->endHtmlHead() ;

	$appctx->beginHtmlBody() ;

	$m_colonne1 = DbSql( $appctx->db, "select texte from ap_texte where rubrique='Edition' and name='Colonne1' and reference='Domaine'" ) ;
	$m_colonne1 = $appctx->db->sql2value( "string", $m_colonne1["texte"] ) ;

	$m_colonne2 = DbSql( $appctx->db, "select texte from ap_texte where rubrique='Edition' and name='Colonne2' and reference='Domaine'" ) ;
	$m_colonne2 = $appctx->db->sql2value( "string", $m_colonne2["texte"] ) ;
	
	$appctx->sendHtml( "<h1>Domaines de la Cave de l'Anneau</h1>" ) ;

	
	if( $domaine ) $r_domaine = $appctx->db->buildCursor( "select * from articles where reference='$domaine'" ) ;
	else $r_domaine = $appctx->db->buildCursor( "select * from articles where referencemodele='Domaine' order by rlibelle" ) ;

	while( $article = $r_domaine->fetchAssoc() )
		{
		if( $domaine )
			{
			$appctx->sendHtml( "<h2>" . $article["rlibelle"] . "</h2>" ) ;		
			$appctx->sendHtml( "<h3>" ) ;		
			$appctx->sendHtml( "<table><tr>" ) ;
			$appctx->sendHtml( "<td><img src=\"" . $article["image"] . "\"></td>" ) ;
			$texte = updateTexte( $appctx, $m_colonne1, $article["reference"] ) ;
			$appctx->sendHtml( "<td>$texte</td>" ) ;
			$texte = updateTexte( $appctx, $m_colonne2, $article["reference"] ) ;
			$appctx->sendHtml( "<td>$texte" ) ;
			$appctx->sendHtml( "<table>" ) ;
			
			$sql = "select * from articles where reference in (select reference from ap_refarticle " ;
			$sql .= "where rubrique='Vin' and name='Domaine' and article='$domaine') order by rlibelle" ; 
			$r_vin = $appctx->db->buildCursor( $sql ) ;
			while( $vin = $r_vin->fetchAssoc() )
				{
				$appctx->sendHtml( "<tr><td>" ) ;
				$appctx->sendHtml( "<a href=\"listevin.php5?vin=" . $vin["reference"] . "&config=$config\">" . $vin["rlibelle"] . "</a>" ) ;
				$appctx->sendHtml( "</td></tr>" ) ;
				}
			$appctx->sendHtml( "</table></td></tr></table>" ) ;
			}
		else
			{
			$appctx->sendHtml( "<h2><a href=\"listedomaine.php5?domaine=" . $article["reference"] . "&config=$config\">" . $article["rlibelle"] . "</a></h2>" ) ;		
			}
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