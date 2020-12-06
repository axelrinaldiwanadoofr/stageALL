// Initialisation d'un editeur de texte tinyMCE

function FfTinyMCEInit( ed )
{
		// Met à jour la valeur de l'editeur apres initialisation
		var id = ed.id ;
		ed.setContent( aobjects[id].value ) ;
}

// Creates a new plugin class and a custom listbox
tinymce.create('tinymce.plugins.EditionPlugin',
	{
  createControl: function(n, cm)
		{
    switch (n)
			{
      case 'fieldslistbox':
        var mlb = cm.createListBox('fieldslistbox',
					{
        	title : 'Liste des champs',
        	onselect : function(v)
						{
          	//tinyMCE.activeEditor.windowManager.alert('Value selected:' + v);

          	var parser = new tinyMCE.activeEditor.html.DomParser({validate: true}, schema);
						var rootNode = parser.parse('<h1>content</h1>');
          	}
        	});
        // Add some values to the list bo
				mlb.add('Some item 1', 'val1');
        mlb.add('some item 2', 'val2');
        mlb.add('some item 3', 'val3');

        // Return the new listbox instance
        return mlb;
      case 'savedoc':
        var mb = cm.createButton('savedoc',
					{
        	title : "Enregistre",
        	onclick : function(v)
						{
						var id = tinyMCE.activeEditor.id ;
						aobjects[id].doValueChanged() ;
          	}
        	});
        return mb;
      }
    return null;
    }
	});

// Register plugin with a short name
tinymce.PluginManager.add('edition', tinymce.plugins.EditionPlugin );


tinyMCE.init({
        // General options
        mode : "textareas",
        theme : "advanced",
        plugins : "spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,-edition",

        // Theme options
        theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect,|,fieldslistbox,savedoc",
        theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
        theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
        theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,spellchecker,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,blockquote,pagebreak,|,insertfile,insertimage",
        theme_advanced_toolbar_location : "top",
        theme_advanced_toolbar_align : "left",
        theme_advanced_statusbar_location : "bottom",
        theme_advanced_resizing : true,
        init_instance_callback: "FfTinyMCEInit",

        // Skin options
        skin : "o2k7",
        skin_variant : "silver",

				// Gestion de l'action enregistrer
        setup : function(ed)
					{
					// Gestionnaire du save
      		ed.onSaveContent.add(function(ed, o) {
          		alert('save ');
      				});
					ed.onActivate.add( function( ed, o )
						{
						alert( "activate" ) ;
						} ) ;

					ed.onDeactivate.add( function( ed, o )
						{
						alert( "deactivate" ) ;
						} ) ;

	  	    // Register example button
  	  	  ed.addButton('example',
						{
         		title : 'example.desc',
         		//image : '../jscripts/tiny_mce/plugins/example/img/example.gif',
         		onclick : function()
						 	{
            	ed.windowManager.alert('Hello world!! Selection: ' + ed.selection.getContent({format : 'text'}));
         			}
      			});
   				},

        // Example content CSS (should be your site CSS)
        content_css : "css/example.css",

        // Drop lists for link/image/media/template dialogs
        template_external_list_url : "js/template_list.js",
        external_link_list_url : "js/link_list.js",
        external_image_list_url : "js/image_list.js",
        media_external_list_url : "js/media_list.js",

        // Replace values for the template plugin
        template_replace_values : {
                username : "Some User",
                staffid : "991234"
        }
});
