/*********************************************************
* Gestion de référence d'objet
*********************************************************/

// L'ensemble des objets sont référencés dans le tableau
// aobject et possède un identifiant id qui est le n°
// de la case dans qui le référence.
// La gestion des n° est confiée au serveur php.

var aobjects = new Array ; // Tableau regroupant tous les objets
var aobjectcidx = 0 ; // Compteur de numero
window.aobjects = aobjects ;
var aobjectsremoved = new Array ; // Tableau regroupant les indices des cases vides
//
// Insere un objet dans le tableau à la case
// dont le numero est donné par l'id de l'objet

function addObject( idx, object )
{
	if( object )
		{
		object.idx = idx ;
		aobjects[idx] = object ;
		}
	return object ;
}

function referenceObject( object, idx )
{
	if( idx )
		{
		aobjects[idx] = object ;
		return idx ;
		}
	if( aobjectsremoved.length )
		{
		var idx = aobjectsremoved.pop() ;
		aobjects[idx] = object ;
		return idx ;
		}
	var idx = aobjectcidx++ ;
	aobjects[idx] = object ;
	return idx ;
}

function getObjectByIdx( idx )
{
	return aobjects[idx] ;
}

function unReferenceObject( idx )
{
	if( aobjects[idx] )
		{
		if( idx < aobjectcidx )	aobjectsremoved.push( idx ) ;
		aobjects[idx] = null ;
		}
}

// Execute la methode methode pour tous les objets references
// dans le tableau des objets
function executeMethodeForAllObject( methode )
{
	var i ;
	for( i=0 ; i<aobjects.length ; i++ )
		{
		methode.call( aobjects[i] ) ;
		}
}

