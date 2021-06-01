<?php
//////////////////////////////////////////////////////////
// appcontexte.php
//
// Classe de gestion du contexte d'application
//
// 28/10/2005
// Copyright 2005 Axel RINALDI
//////////////////////////////////////////////////////////

if( !isset( $inc) ) $inc = "inc" ;

require_once( "inc/sys/indenteur.php") ;
require_once( "inc/sys/jsinstructionlist.php") ;


class AppContexte
{
	// merde
	// remerde
	var $indentation ;
	var $sessionid ; // Identifiant de session
	var $userid ; // Identifiant de l'utilisateur connecté
	var $ringkey ; // Clé cryptée pour le jeton de sécurité
	var $cfg ; // Tableau des parametres de configuration
	var $rep_inc ;
	var $rep_app ;
	var $server ;
	var $db ; // Connecteur vers la base de donnée courante
	var $error ;
	var $cid ;
	var $answer ; // Chaine de réponse envoyée vers le brother
	protected $title ; // titre de l'application
	protected $keywords ; // Mots cles
	protected $description ; // Decription
	var	$debug ; // Mode debug activé
	var $includedirectory ; // Ensemble des repertoires des fichiers PHP à inclure
	var $htmlbuffer ; // Buffer de code HTML
	var $htmlbuffering ; // Bufferise les codes HTML plutot que de les envoyer
	var $windowcontrolers ; // Tableau des controleurs de fenetre

	var $window ; // Nom de la fenetre courante
	var $cwc ; // Controler de fenetre courant

	function __construct( $server, $titre )
		{
		//session_start() ;
		$this->indentation = new Indenteur( 0 ) ;
		$this->sessionid = session_id() ;
		$this->rep_inc = "inc" ;
		$this->server = $server ;
		$this->rep_app = "app" ;
		$this->error = "" ;
		$this->titre = $titre ;
		$this->ringkey = "" ;
		$this->argument = "" ;
		$this->filternum = 0 ;
		$this->debug = false ;
		$this->menus = array() ;
		$this->htmlbuffer = "" ;
		$this->htmlbuffering = false ;
		$this->windowcontrolers = array() ;
		$this->includedirectory = array() ;

		$this->addWindow( "appctx" ) ;
		$this->setCurrentWindow( "appctx" ) ;

		$this->cfg = array() ;
		}
	// Charge un fichier de configuration
	function loadCfgFile( $filename="cfg.txt" )
		{
		$cfgfile = fopen( $filename, "r" ) ;
		if( !$cfgfile ) return false ;
		while( !feof( $cfgfile ) )
			{
			$s = fgets( $cfgfile, 255 ) ;
			$t = explode( "=", $s ) ;
			if( count( $t ) == 2 )
				{
				$v = explode( "\"", $t[1] ) ;
				$this->cfg[$t[0]] = $v[1] ;
				}
			}
		fclose( $cfgfile ) ;
		
		if( isset( $this->cfg["includedirectory"] ) )
			{
			$t = explode( ",", $this->cfg["includedirectory"] ) ;
			foreach( $t as $i=>$v )
				{
				$this->addIncludeDirectory( $v ) ;
				}
			}

		return $this->cfg ;
		}

	// Definit la description
	function setDescription( $description )
		{
		$this->description = $description ;
		}
	// Definit le titre
	function setTitle( $title )
		{
		$this->title = $title ;
		}
		// Definit les mots cles
	function setKeyWords( $keywords )
		{
		$this->keywords = $keywords ;
		}
	// Renvoie la langue courante
	function getLangue()
		{
		return $this->cfg["defaultlangue"] ;
		}

	// Met à jour le presse papier
	function setToCopy( $object )
		{
		$this->tocopy = $object ;
		}

	// Renvoie le presse papier
	function getToCopy()
		{
		return $this->tocopy ;
		}

	// Cree un controleur de fenetre
	function addWindow( $window )
		{
		if( !array_key_exists( $window, $this->windowcontrolers ) )
			{
			$this->windowcontrolers[$window] = new WindowControler( $window ) ;
			}
		}
	// Enregistre le nom de la fenetre courante
	function setCurrentWindow( $window=null )
		{
		if( !$window )
			{
			$window = "appctx" ;
			if( array_key_exists( "window", $_GET ) ) $window = $_GET["window"] ;
			if( array_key_exists( "window", $_POST ) ) $window = $_POST["window"] ;
			}
		$w = $this->window ;
		$this->window = $window ;
		if( !array_key_exists( $window, $this->windowcontrolers ) )
			{
			$this->windowcontrolers[$window] = new WindowControler( $window ) ;
			}

		$this->cwc = $this->windowcontrolers[$window] ;
		return $w ;
		}
	// Enregistre fenetre courante et l'efface
	function clearCurrentWindow( $window=null )
		{
		if( !$window )
			{
			$window = "appctx" ;
			if( array_key_exists( "window", $_GET ) ) $window = $_GET["window"] ;
			if( array_key_exists( "window", $_POST ) ) $window = $_POST["window"] ;
			}

		if( array_key_exists( $window, $this->windowcontrolers ) ) $this->windowcontrolers[$window]->remove( $this ) ;

		$w = $this->window ;
		$this->window = $window ;
		$this->windowcontrolers[$window] = new WindowControler( $window ) ;

		$this->cwc = $this->windowcontrolers[$window] ;
		return $w ;
		}

	// Renvoie le nom de la fenetre courante
	function getCurrentWindow()
		{
		return $this->window ;
		}
	// Efface tous
	function clearAll()
		{
		$this->menus = array() ;
		$this->htmlbuffer = "" ;
		$this->htmlbuffering = false ;
		$this->windowcontrolers = array() ;

		$this->addWindow( "appctx" ) ;
		$this->setCurrentWindow( "appctx" ) ;
		}
	// Genere un message de reponse sous forme d'alerte JS
	function sendAlert( $message, $window=null )
		{
		if( $window ) $this->windowcontrolers[$window]->jsinstructionlist->sendAlert( $message ) ;
		else $this->cwc->jsinstructionlist->sendAlert( $message ) ;
		}
	// Genere un message pour le debuguer
	function sendDebug( $message, $window=null )
		{
		if( $this->debug )
			{
			if( $window ) $this->windowcontrolers[$window]->jsinstructionlist->sendDebug( $message ) ;
			else $this->cwc->jsinstructionlist->sendDebug( $message ) ;
			}
		}
	// Ajoute une reponse dans le buffer de reponse
	function sendJs( $js, $window=null )
		{
		if( $window ) $this->windowcontrolers[$window]->jsinstructionlist->send( $js ) ;
		else $this->cwc->jsinstructionlist->send( $js ) ;
		}
	// Ajoute une reponse dans le buffer de reponse
	function sendAnswer( $answer, $window=null )
		{
		if( $window ) $this->windowcontrolers[$window]->jsinstructionlist->send( $answer ) ;
		else $this->cwc->jsinstructionlist->send( $answer ) ;
		}
	// Efface le buffer de reponse courant
	function clearAnswers( $window=null )
		{
		if( $window ) $this->windowcontrolers[$window]->jsinstructionlist->reset() ;
		else $this->cwc->jsinstructionlist->reset() ;
		}
	// Renvoie le contenu du buffer d'instruction vers Ajax
	function getAnswersString()
		{
		return $this->cwc->jsinstructionlist->getAnswersString() ;
		}
	// Envoie le contenu du buffer d'instruction vers Ajax
	function sendAnswersForAjax()
		{
		$this->cwc->jsinstructionlist->sendAjaxAnswers() ;
		}
	// Envoie le contenu du buffer d'instruction vers Ajax
	function sendInstructionsForAjax()
		{
		$this->cwc->jsinstructionlist->sendAjaxInstructions() ;
		}
	// Envoie le contenu du buffer d'instruction vers JS
	function sendInstructionsForJs()
		{
		$this->cwc->jsinstructionlist->sendJsInstructions() ;
		}
	function sendHtml( $html )
		{
		if( $this->htmlbuffering )
			{
			//$this->htmlbuffer .= utf8_decode( $html ) ;
			$this->htmlbuffer .= $html ;
			}
		else
			{
			$this->indentation->Affiche() ;
			echo( utf8_decode( $html ) ) ;
			echo( "\n" ) ;
			}
		}
	function beginHtmlBuffering()
		{
		$this->htmlbuffer = "" ;
		$this->htmlbuffering = true ;
		}

	function endHtmlBuffering()
		{
		$this->htmlbuffering = false ;
		return $this->htmlbuffer ;
                //return utf8_decode( $this->htmlbuffer ) ;
		}

	function pushIndent()
		{
		$this->indentation->Plus() ;
		}
	function popIndent()
		{
		$this->indentation->Moins() ;
		}

	function setUserId( $id )
		{
		$this->userid = $id ;
		}

	function createJeton()
		{
		if( $this->ringkey == "" ) $this->ringkey = rand( 0, 2345665 ) ;
		$jeton = $_SERVER["REMOTE_ADDR"] . $this->ringkey . $this->userid ;
		return md5( $jeton ) ;
		}

	function testJeton( $jeton )
		{
		$ref = $_SERVER["REMOTE_ADDR"] . $this->ringkey . $this->userid ;
		$ref = md5( $ref ) ;
		if( $ref == $jeton ) return true ;
		return false ;
		}

	function addIncludeDirectory( $dirname )
		{
		$this->includedirectory[] = $dirname ;
		}
		
	function loadClassDefinition( $classname )
		{
		$filename = strtolower( $classname ) . ".php" ;
		
		foreach( $this->includedirectory as $n=>$dirname )
			{
			if( $this->searchFile( $filename, $dirname ) ) 
				{
				require_once( $dirname . "/" . $filename ) ;
				return true ;
				}
			}
		return false ;
		}		
		
	function searchFile( $filename, $dirname )
		{
		$dir = opendir($dirname) ; 

		while( $file = readdir($dir) ) 
			{
			if( $file == $filename ) 
				{
				closedir($dir) ;
				return true ;
				}
			}
		closedir($dir) ;
		return false ;
		}

	function loadIncJsScripts()
		{
		// Gestion des modèles MVC
		$this->loadJsScript( "inc/mvc/mvcmodele.js" ) ;
		$this->loadJsScript( "inc/mvc/mvcmodelecontroler.js" ) ;
		$this->loadJsScript( "inc/mvc/mvcview.js" ) ;
		$this->loadJsScript( "inc/mvc/mvcviewcontroler.js" ) ;
		//$this->loadJsScript( "inc/mvc/mvcsqlmodelecontroler.js" ) ;
		$this->loadJsScript( "inc/mvc/mvcmodelecontrolermanager.js" ) ;
		$this->loadJsScript( "inc/mvc/mvcsqlloader.js" ) ;
		$this->loadJsScript( "inc/mvc/mvcsqlupdate.js" ) ;
		$this->loadJsScript( "inc/mvc/mvcsqldelete.js" ) ;
		$this->loadJsScript( "inc/mvc/mvcsqlcopy.js" ) ;
		$this->loadJsScript( "inc/mvc/mvcsqlnew.js" ) ;
		
		$this->loadJsScript( "inc/js/tools.js" ) ;
		$this->loadJsScript( "inc/js/methodecaller.js" ) ;
		$this->loadJsScript( "inc/js/ayawf.js" ) ;
		$this->loadJsScript( "inc/menu/menu.js" ) ;
		$this->loadJsScript( "inc/js/aobject.js" ) ;

		$this->loadJsScript( "inc/js/aajax.js" ) ;

		// Gestion des vues arborescentes
		$this->loadJsScript( "inc/treeview/treeview.js" ) ;
		$this->loadJsScript( "inc/treeview/treenode.js" ) ;
		$this->loadJsScript( "inc/treeview/tnsql.js" ) ;
		$this->loadJsScript( "inc/treeview/tnmodele.js" ) ;
		$this->loadJsScript( "inc/treeview/tnfactory.js" ) ;
		$this->loadJsScript( "inc/treeview/tnmodelefactory.js" ) ;

		// Outils de requette SQL
		$this->loadJsScript( "inc/data/sqlselect.js" ) ;

		// Formulaire et controler de formulaire
		$this->loadJsScript( "inc/formulaire/formulairecontroler.js" ) ;
		$this->loadJsScript( "inc/formulaire/formulaire.js" ) ;
		
		// Champs de formulaire
		$this->loadJsScript( "inc/formulaire/formfield.js" ) ;
		$this->loadJsScript( "inc/formulaire/ffinput.js" ) ;
		$this->loadJsScript( "inc/formulaire/ffinputfloat.js" ) ;
		$this->loadJsScript( "inc/formulaire/ffinputint.js" ) ;
		$this->loadJsScript( "inc/formulaire/ffinputdate.js" ) ;
		$this->loadJsScript( "inc/formulaire/fflabel.js" ) ;
		$this->loadJsScript( "inc/formulaire/fflabelfloat.js" ) ;
		$this->loadJsScript( "inc/formulaire/ffetiquette.js" ) ;
		$this->loadJsScript( "inc/formulaire/ffselect.js" ) ;
		$this->loadJsScript( "inc/formulaire/ffselectedit.js" ) ;
		$this->loadJsScript( "inc/formulaire/fftextarea.js" ) ;
		$this->loadJsScript( "inc/formulaire/ffcombo.js" ) ;
		$this->loadJsScript( "inc/formulaire/ffcheck.js" ) ;
		$this->loadJsScript( "inc/formulaire/ffimage.js" ) ;
		$this->loadJsScript( "inc/formulaire/ffbutton.js" ) ;
		$this->loadJsScript( "inc/formulaire/ffupload.js" ) ;
		$this->loadJsScript( "inc/formulaire/ffnicedit.js" ) ;
		$this->loadJsScript( "inc/js/nicedit/nicEdit.js" ) ;
		//$this->loadJsScript( "inc/formulaire/ffediteur.js" ) ;
		//$this->loadJsScript( "inc/js/editeur.js" ) ;
		
		// Gestionnaire de layout
		$this->loadJsScript( "inc/layout/layout.js" ) ;

		// Atelier 2d
		$this->loadJsScript( "inc/draw2d/bougeur.js" ) ;
		$this->loadJsScript( "inc/draw2d/draw2d.js" ) ;
		}

	function beginHtmlHead( $css=null )
		{
		$this->sendHtml( "<HTML>" ) ;
		$this->sendHtml( "<HEAD>" ) ;
		$this->sendHtml( "<meta http-equiv=\"Content-Type\" content=\"text/html;charset=Western European\" />" ) ;
		$this->sendHtml( "<TITLE>$this->title</TITLE>" ) ;
		$this->sendHtml( "<meta charset=\"UTF-8\" />") ;
		$this->sendHtml( "<meta name=\"keywords\" content=\"$this->keywords\" />" ) ;
		$this->sendHtml( "<meta name=\"description\" content=\"$this->description\" />" ) ;
		if( $css ) $this->sendHtml( "<link rel=\"stylesheet\" type=\"text/css\" href=\"$css\"/>" ) ;
		else $this->sendHtml( "<link rel=\"stylesheet\" type=\"text/css\" href=\"$this->rep_inc/sys/tools.css\"/>" ) ;
		$this->sendHtml( "<script>sessionid=\"$this->sessionid\";</script>" ) ;
		}

	function endHtmlHead()
		{
		$this->sendHtml( "</HEAD>" ) ;
		}

	function beginHtmlBody()
		{
		$this->sendHtml( "<body>" ) ;
		$this->pushIndent() ;
		$this->sendHtml( "<div id=\"webfactory\"></div>" ) ;
		$this->sendHtml( "<div id=\"root\">" ) ;

		if( $this->debug )
			{
			$this->sendHtml( "<div class=\"debug\">" ) ;
			$this->sendHtml( "<textarea id=\"ldebug\" cols=40 rows=20>" ) ;
			$this->sendHtml( "</textarea>" ) ;
			$this->sendHtml( "</div>" ) ;
			$this->sendHtml( "<script>debug=true;</script>" ) ;
			}
		}

	function endHtmlBody()
		{
		$this->sendHtml( "</div>" ) ;
		$this->popIndent() ;
		$this->sendHtml( "</body></html>" ) ;
		}

	function endHtml()
		{
		$this->popIndent() ;
		$this->sendHtml( "</html>" ) ;
		}

	function loadJsScript( $filename )
		{
		$this->sendHtml( "<script type=\"text/javascript\" src=\"$filename\"></script>" ) ;
		}

	function runJsInstruction( $instruction )
		{
		$this->sendHtml( "<script>$instruction</script>" ) ;
		}

	function beginHtmlFrame( $id, $cols="", $rows="" )
		{
		if( $rows != "" )	$this->sendHtml( "<frameset id=\"$id\" rows=\"$rows\">" ) ;
		else	$this->sendHtml( "<frameset id=\"$id\" cols=\"$cols\">" ) ;
		}

	function endHtmlFrame()
		{
		$this->sendHtml( "</frameset>" ) ;
		}

	function showFrame( $script, $name, $jeton="" )
		{
		if( $jeton != "" )
			{
			if( strstr( $script, "?" ) ) $script .= "&jeton=$jeton" ;
			else $script .= "?jeton=$jeton" ;
			}
		$this->sendHtml( "<frame src=$script&window=$name name=\"$name\" id=\"$name\" />" ) ;
		}

	function openWindow( $window, $scriptphp, $menubar="no" )
		{
		$jeton = $this->createJeton() ;
		$this->sendJs( "window.open( \"$scriptphp\", \"$window\",\"menubar=$menubar\");" ) ;
		}

	function openHtml( $html, $page, $window )
		{
		$jeton = $this->createJeton() ;
		$this->sendJs( "window.open( \"cmsview.php5?page=$page&jeton=$jeton&window=$window\", \"$window\",\"menubar=$menubar\");" ) ;
		}
	}

// Controle les elements present dans une fenetre
class WindowControler
	{
	var $window ; // Nom de la fenetre courante
	var $jsinstructionlist ; // List de instruction JS

	function __construct( $window )
		{
		$this->window = $window ;
		$this->jsinstructionlist = new JsInstructionList() ;
		}
	}
	
function __autoload( $classname )
	{
	$appctx = $_POST["appctx"] ;
	$appctx->loadClassDefinition( $classname ) ;
	}
	
?>