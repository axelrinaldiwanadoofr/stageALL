/*********************************************************
* Classe FfNicEdit gere un champ avec editeur NicEdit sur
* un element TEXTAREA du DOM
*********************************************************/
var niceedit_idx = 1 ;

function FfNicEdit( name, width, height )
	{
	herite( FfNicEdit, FormField ) ;
	this.initFfNicEdit( name, width, height )
	}

FfNicEdit.prototype =
	{
	initFfNicEdit: function( name, width, height )
		{
		this.initFormField( name ) ;
		this.focusable = false ;
		this.width = width ;
		this.height = height ;
		this.idx = "nice" + niceedit_idx++ ;
		this.createDomObject() ;
		},
	// Cree les elements DOM associés
	createDomObject: function()
		{
		this.element = document.createElement( "textarea" ) ;
		this.setupDomObject() ;
		this.element.className = "textarea" ;
		this.element.setAttribute( "id", this.idx ) ;
		this.element.cols = this.width ;
		this.element.rows = this.height ;
		this.element.style.width = this.width * 10 ;
		this.element.style.height = this.height * 10 ;
		},
	// Met a jour l'element DOM avec la valeur
	// Appelé après affichage
	onAfterShow: function()
		{
		this.editor = new nicEditor( {fullPanel : true, iconsPath : 'inc/js/nicedit/nicEditorIcons.gif'} ) ;
		this.editor.panelInstance( "" + this.idx ) ;
		this.editor.field = this ;
		this.editor.focused = false ;
		this.editor.addEvent('blur', function()
			{
			if( this.focused )	this.field.onBlur() ;
			this.focused = false ;
  		});
		this.editor.addEvent('focus', function()
			{
			this.focused = true ;
			this.field.onFocus() ;
  		});
		},
	// Supprime le champ
	remove: function()
		{
		unReferenceObject( this.idx ) ;
		},
	// Met a jour l'element DOM avec la valeur
	setElementValue: function( value )
		{
		if( this.editor )
			{
		 	var i = this.editor.instanceById( this.idx ) ;
		 	if( i ) i.setContent( value ) ;
		 	}
		},
	getElementValue: function()
		{
		if( this.editor )
			{
		 	var i = this.editor.instanceById( this.idx ) ;
		 	if( i ) return i.getContent() ;
		 	return null ;
		 	}
		},
	// Donne le focus au controle associe
	setFocus: function()
		{
		}
	} ;

