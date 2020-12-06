
// Objet pour uploader un fichier

function UpLoader( x, y, scriptphp, imagesrc, object, property )
	{
	this.x = x ;
	this.y = y ;
	this.scriptphp = scriptphp ;
	this.object = object ;
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

UpLoader.prototype =
	{
	remove: function()
		{
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
		this.form = document.getElementById( "uploadform" ) ;
		if( this.form.style.display == "none" )
			{
			this.form.style.display = "block" ;
			this.form.style.left = this.x - this.image.width / 2 ;
			this.form.style.top = this.y - this.image.height / 2 + 20 ;
			var ctrl_nodeid = document.getElementById( "uploadform_nodeid" ) ;
			ctrl_nodeid.value = this.object.id ;
			var ctrl_property = document.getElementById( "uploadform_property" ) ;
			ctrl_property.value = this.property ;
			}
		else
			{
			this.form.style.display = "none" ;
			}
		}
	};

