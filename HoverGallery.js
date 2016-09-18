var HoverGallery = {

	init: function () {
		HoverGallery.bind();
	},

	bind: function () {
		$( '.gallery img' ).hover( HoverGallery.onMouseEnter, HoverGallery.onMouseLeave );
	},

	onMouseEnter: function () {
		// First show the loading icon
		var loadingUrl = mw.config.get( 'wgExtensionAssetsPath' ) + '/Hovergallery/images/loading.gif',
			loadingImg = $( '<img>' ).addClass( 'hoverimage' ).attr( 'src', loadingUrl );
		$( 'body' ).append( loadingImg );

		// Get the data from the gallery
		var gallery = $( this ).closest( '.gallery' ),
			fileUrls = gallery.data( 'hovergallery-fileurls' ),
			maxHoverWidth = gallery.data( 'hovergallery-maxhoverwidth' ),
			maxHoverHeight = gallery.data( 'hovergallery-maxhoverheight' );

		// Determine which of the thumbs is it
		var thumbs = $( 'img', gallery ),
			thumbIndex = $.inArray( this, thumbs ),
			url = fileUrls[ thumbIndex ],
			url = $( '<span>' ).html( url ).text(); // Decode the HTML entities in the URL

		// Replace the loading icon with the image
		var image = new Image();
		image.src = url;
		image.onload = function () {
			loadingImg.css({
				'max-width': maxHoverWidth + 'px',
				'max-height': maxHoverHeight + 'px'
			}).attr( 'src', url );
		};
	},

	onMouseLeave: function () {
		$( 'body .hoverimage' ).remove();
	}
};

$( HoverGallery.init );