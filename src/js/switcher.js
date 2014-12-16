/* global jQuery */
( function( $ ){

	var Switcher = {

		init: function( el ) {
			this.base_el = el;
			this.buttons = el.find( '.switcher__selector button' );
			this.items = el.find( '.switcher__content__item' );

			this.bindEvents();
		},

		bindEvents: function() {
			var self = this;
			this.buttons.on( 'click', function(){
				self.change( $( this ) );
			} );
		},

		change: function( button ) {
			var target = button.data( 'target' ),
				final_item = this.items.filter( '[data-id=' + target + ']' );
			this.items.velocity( 'fadeOut', { duration: 500 } );
			final_item.velocity( 'fadeIn', { duration: 500 } );

		}

	};

	$( function(){
		$( '.switcher' ).each( function(){
			Object.create( Switcher ).init( $( this ) );
		} );
	} );

} )( jQuery );