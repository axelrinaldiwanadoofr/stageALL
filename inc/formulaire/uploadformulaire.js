/*********************************************************
* Formulaire pour l'upload de fichier
*********************************************************/

function FfUpLoad( name, filename, sizemax )
	{
	herite( FfUpLoad, FormField ) ;
	this.initFfUpLoad( name, filename, sizemax )
	}

FfUpLoad.prototype =
	{
	initFfUpLoad: function( name, filename, sizemax )
		{
		this.initFormField( name ) ;
		this.filename = filename ;
		this.sizemax = sizemax ;
		this.focusable = false ;
		this.createDomObject() ;
		},
	// Cree les elements DOM associés
	createDomObject: function()
		{
		this.element = document.createElement( "BUTTON" ) ;
		this.setupDomObject() ;
		this.element.className = "button" ;
		this.element.innerHTML = "..." ;
		},

	onClick: function()
		{
		var html = "<div class=\"uploadform\" id=\"uploadform\">" ;
		html += "<form method=\"post\" action=\"file_onupload.php5\" enctype=\"multipart/form-data\" target=\"nothing\">" ;
  	html += "Sélectionner un fichier: " ;
  	html += "<input type=\"file\" name=\"fichier\" value=\"" + this.filename + "\" /><br />" ;
		html += "<input type=\"hidden\" name=\"MAX_FILE_SIZE\" value=\"" + this.sizemax + "\" />" ;
  	html += "<input type=\"submit\" name=\"submit\" value=\"Envoyer\" />" ;
		html += "</form>" ;
		html += "</div>" ;

		this.form = document.createElement( "DIV" ) ;
		var root = document.getElementById( "root" ) ;
		root.appendChild( this.form ) ;

		this.form.innerHTML = html ;
		}
	};

