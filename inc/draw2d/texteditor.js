
// Objet editeur de texte
var current_editor = null ;

function TextEditor( x, y, scriptphp, imagesrc, object, property, texte )
	{
	this.x = x ;
	this.y = y ;
	this.scriptphp = scriptphp ;
	this.object = object ;
	this.texte = texte ;
	this.property = property ;
	this.id = addBougeur( this ) ;
	this.image = document.createElement( "IMG" ) ;
	this.image.setAttribute( "idbougeur", this.id ) ;
	this.image.onmousedown=onBougeurMouseDown ;
	this.image.src = imagesrc ;
	this.image.width = 11 ;
	this.image.height = 11 ;
	this.image.style.position = "absolute" ;
	this.image.style.left = this.x - this.image.width / 2 ;
	this.image.style.top = this.y - this.image.height / 2 ;
	this.image.style.zIndex = 100 ;
	var wf = document.getElementById( "webfactory" ) ;
	wf.appendChild( this.image ) ;
	}

TextEditor.prototype =
	{
	remove: function()
		{
		if( this.form ) this.form.style.display = "none" ;
		var wf = document.getElementById( "webfactory" ) ;
		wf.removeChild( this.image ) ;
		delete this.image ;
		},
	moveTo: function( x, y )
		{
		this.x = x ;
		this.y = y ;
		this.image.style.left = this.x - this.image.width / 2 ;
		this.image.style.top = this.y - this.image.height / 2 ;
		},
	onMouseDown: function( evt )
		{
		this.form = document.getElementById( "texteditform" ) ;
		if( this.form.style.display == "none" )
			{
			this.form.style.display = "block" ;
			this.form.style.left = this.object.element.offsetLeft ;
			if( this.object.element.offsetTop > 60 )
				this.form.style.top = this.object.element.offsetTop - 60 ;
			else
				this.form.style.top = this.object.element.offsetTop + this.object.element.offsetHeight + 20 ;
			this.object.element.contentEditable = true ;
			current_editor = this ;
			}
		else
			{
			this.form.style.display = "none" ;
			}
		},
	// Recupere la selection courante
	getSelectedText: function()
		{
		var selText = "" ;
		if (window.getSelection) selText = window.getSelection() ;
		else if (document.getSelection) selText = document.getSelection() ;
		else
			{
			var s = document.selection ;
			var r = document.selection.createRange() ;
			selText = r.text ;
			}
		return selText ;
		},
	// Met en gras la selection
	setBold: function()
		{
		var selText = this.getSelectedText() ;
		if( selText )
			{
			this.object.element.focus() ;
			this.object.element.innerHTML = this.object.element.innerHTML.replace( selText, "<B>" + selText + "</B>" ) ;
			this.object.element.focus() ;
			}
		},
	// Change la couleur de la police
	setFontColor: function( color )
		{
		var selText = this.getSelectedText() ;
		if( selText )
			{
			this.object.element.focus() ;
			this.object.element.innerHTML = this.object.element.innerHTML.replace( selText, "<FONT COLOR=" + color +">" + selText + "</FONT>" ) ;
			this.object.element.focus() ;
			}
		},
	// Change la couleur de la police
	setFontSize: function( size )
		{
		var selText = this.getSelectedText() ;
		if( selText )
			{
			this.object.element.focus() ;
			this.object.element.innerHTML = this.object.element.innerHTML.replace( selText, "<FONT SIZE=" + size +">" + selText + "</FONT>" ) ;
			this.object.element.focus() ;
			//alert( this.object.element.innerHTML ) ;
			}
		},
	// Efface tout le texte
	clear: function()
		{
		this.object.element.innerHTML = "" ;
		},
	// Efface tous les style appliques sur le texte
	clearStyle: function()
		{
		var s = this.object.element.innerHTML ;
		s = s.replace( "<B>", "" ) ;
		s = s.replace( "</B>", "" ) ;
		this.object.element.innerHTML = s ;
		this.object.element.focus() ;
		},
	// Enregistre le texte dans la base de donnee
	saveText: function()
		{
		saveNodeProperty( this.object.id, this.property, this.object.element.innerHTML ) ;
		}
	};

// Envoie une requette d'enregistrement de valeur de propriete
// pour un noeud
function onSaveText()
{
	if( current_editor ) current_editor.saveText() ;
}

function onSetBold()
{
	if( current_editor ) current_editor.setBold() ;
}

function onClear()
{
	if( current_editor ) current_editor.clear() ;
}

function onClearStyle()
{
	if( current_editor ) current_editor.clearStyle() ;
}

function onSetColor( button )
{
	if( current_editor ) current_editor.setFontColor( button.currentStyle.color ) ;
}

function onSetFontSize( size )
{
	if( current_editor ) current_editor.setFontSize( size ) ;
}
