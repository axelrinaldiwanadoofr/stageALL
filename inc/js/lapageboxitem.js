

/*********************************************************
* Classe LaPageBoxItem gere une page associée à un onglet
* d'une boite à onglet
*********************************************************/

function LaPageBoxItem( elementid )
	{
	this.selected = false ;
	this.items = new Array() ;
	// Connecte l'objet DOM associe
	if( elementid ) this.connectDomObject( elementid ) ;
	}

LaPageBoxItem.prototype =
	{
	// Connecte l'objet DOM associe
	connectDomObject: function( elementid )
		{
		this.element = document.getElementById( elementid ) ;
		if( this.element )
			{
			this.element.setAttribute( "idx", aobjects.length ) ;
			}
		},
	// Ajoute un item
	addItem: function( item )
		{
		this.items.push( item ) ;
		},
	// Rend la page visible ou non
	setVisible: function( ok )
		{
		if( ok ) this.element.style.display = "block" ;
		else  this.element.style.display = "none" ;

		var i ;
		for( i=0 ; i<this.items.lenght ; i++ ) this.items[i].setVisible( ok ) ;
		},
	// Gere le click
	onClick: function()
		{
		var request = "lapageboxitem_onclick.php5?sessionid=" + sessionid +"&idx=" + this.idx ;
		var ar = new Ajax() ;
		ar.sendRequestForExecute( request ) ;
		}
	} ;

function LaPageBoxItemOnClick( idx )
{
	aobjects[idx].onClick() ;
}
