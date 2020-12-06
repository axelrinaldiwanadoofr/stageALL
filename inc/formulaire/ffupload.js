/*********************************************************
* Formulaire pour l'upload de fichier
*********************************************************/
var cuploadbox = null ;

function FfUpLoad( name, filename, width, sizemax )
	{
	herite( FfUpLoad, FormField ) ;
	this.initFfUpLoad( name, filename, width, sizemax )
	}

FfUpLoad.prototype =
	{
	initFfUpLoad: function( name, filename, width, sizemax )
		{
		this.initFormField( name ) ;
		this.initfilename = filename ;
		this.sizemax = sizemax ;
		this.width = width ;
		this.focusable = false ;
		this.uploadformvisible = false ;
		this.createDomObject() ;
		},
	// Cree les elements DOM associés
	createDomObject: function()
		{
		this.element = document.createElement( "BUTTON" ) ;
		this.setupDomObject() ;
		this.element.className = "button" ;
		this.element.object = this ;
		this.element.innerHTML = ayawf.tools.prepare_to_show( "Télécharger" ) ;
		},
	remove: function()
		{
		},
	setElementValue: function( value )
		{
		if( value != "null" )
			{
			this.initfilename = value ;
			this.filename = value ;
			}
		},
	getElementValue: function()
		{
		return this.filename
		},
	setWidth: function( value )
		{
	 	this.width = value ;
		},
	onClick: function()
		{
		this.newfilename = this.incrFilename( this.initfilename ) ;

		var html = "<div class=\"uploadform\" id=\"uploadform\">" ;
		html += "<form method=\"post\" action=\"file_onupload.php5\" enctype=\"multipart/form-data\" target=\"uploadtarget\">" ;
		html += ayawf.tools.prepare_to_show( "Sélectionner un fichier: " ) ;
		html += "<input type=\"file\" name=\"fichier\"/>" ;
		html += "<input type=\"hidden\" name=\"MAX_FILE_SIZE\" value=\"" + this.sizemax + "\" />" ;
		html += "<input type=\"hidden\" name=\"filename\" value=\"" + this.newfilename + "\" />" ;
		html += "<input type=\"hidden\" name=\"width\" value=\"" + this.width + "\" />" ;
		html += "<input type=\"hidden\" name=\"idx\" value=\"" + this.idx + "\" />" ;
		html += "<input type=\"hidden\" name=\"config\" value=\"" + config + "\" />" ;
		html += "<input type=\"submit\" name=\"submit\" value=\"Envoyer\" />" ;
		html += "<button onclick=\"cuploadbox.onCancelUpLoad() ;\">Annuler</button><br />" ;
		html += "<button onclick=\"cuploadbox.onRemoveUpLoad() ;\">Pas d'image</button><br />" ;
		html += "</form>" ;
		html += "<iframe id=\"uploadtarget\" name=\"uploadtarget\" src=\"#\" style=\"width:0;height:0;bordder:0px solid #fff;\"></iframe>" ;
		html += "</div>" ;

		this.uploadformvisible = true ;

		if( !this.uploadform )
			{
			this.uploadform = document.createElement( "DIV" ) ;
			var root = document.getElementById( "root" ) ;
			root.appendChild( this.uploadform ) ;
			}
		this.uploadform.innerHTML = html ;
		var form = document.getElementById( "uploadform" ) ;
		form.style.left = document.body.scrollLeft + 200 ;
		form.style.top = document.body.scrollTop + 200 ;		
		cuploadbox = this ;
		},
	onCancelUpLoad: function()
		{
		this.uploadformvisible = false ;
		if( this.uploadform ) this.uploadform.innerHTML = "" ;
		},
	onRemoveUpLoad: function()
		{
		this.uploadformvisible = false ;
		if( this.uploadform ) this.uploadform.innerHTML = "" ;
		this.filename = "" ;
		this.onValueChanged() ;
		},
	onUpLoadSucces: function( selectedfilename, height )
		{
		alert( ayawf.tools.prepare_to_show( "Téléchargement réussi, copie du fichier " + selectedfilename + " en " + this.newfilename ) ) ;
		if( this.uploadform ) this.uploadform.innerHTML = "" ;
		this.uploadformvisible = false ;
		this.filename = this.newfilename ;
		this.height = height ;
		this.onValueChanged() ;
		},
	onUpLoadFail: function( selectedfilename )
		{
		alert( ayawf.tools.prepare_to_show( "Echec du téléchargement du fichier " + selectedfilename ) ) ;
		this.filename = this.initfilename ;
		this.uploadformvisible = false ;
		if( this.uploadform ) this.uploadform.innerHTML = "" ;
		},
	// Incremente par la date/heure courante le dernier mot apres le dernier _
	incrFilename: function( initfilename )
		{
		// post fixe
		var post = ".jpg" ;
		var t = initfilename.split( "." ) ;
		if( t.length > 1 ) post = t[t.length-1] ;
		// Recupere la racine et le mot apres le dernier _
		var p = t[0].split( "_" ) ;
		var racine = p[0] ;
		if( p.length > 1 )
			{
			for( var i=1 ; i<p.length-1 ; i++ ) racine += "_" + p[i] ;	
			}
		// Recupere la date du jour
		var date = new Date() ;
		var n = date.getTime() ;
		// Construit la chaine
		var filename = racine + "_" + n + "." + post ;
		return filename ;
		}
	};

