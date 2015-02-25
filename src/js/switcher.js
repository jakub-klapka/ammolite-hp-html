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

			$( 'a[data-switcher-target]' ).on( 'click', function(){
				self.changeToTarget( $( this ).data( 'switcher-target' ) );
			} );

			this.checkForURL();
		},

		change: function( button ) {
			var target = button.data( 'target' ),
				final_item = this.items.filter( '[data-id=' + target + ']' );
			this.items.velocity( 'fadeOut', { duration: 500 } );
			final_item.velocity( 'fadeIn', { duration: 500 } );

			window.location.hash = target;

		},

		changeToTarget: function ( target ) {
			var final_item = this.items.filter( '[data-id=' + target + ']' );
			this.items.velocity( 'fadeOut', { duration: 500 } );
			final_item.velocity( 'fadeIn', { duration: 500 } );

			window.location.hash = target;
		},

		checkForURL: function() {

			var hash = window.location.hash.substr( 1 );

			var target_button = this.buttons.filter( '[data-target="' + hash + '"]' );

			if( target_button.length > 0 ) {
				//hash have article
				this.changeToTarget( hash );
				$( '#clanky' ).velocity( 'scroll', { duration: 1000 } );
			}

		}

	};

	$( function(){
		$( '.switcher' ).each( function(){
			Object.create( Switcher ).init( $( this ) );
		} );
	} );

} )( jQuery );