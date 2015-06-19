var _ = require('underscore');

module.exports = {
	templates: {
		'new-scene' : require('./templates/new-scene.hbs'),
		'scene-tab' : require('./templates/scene-tab.hbs')
	},

	itemEventHandler: function(e) {
		var templateName = $(e.currentTarget).data('template');
		$('body').append(this.templates[templateName]);

		var closeModalHandler = _.bind(this.closeModalHandler, this);
		var newSceneHandler    = _.bind(this.newSceneHandler, this);

		var $modal = $('.toolbar-modal');

		this.toggleModalOverlay();

		bindCloseModalHandler($modal, closeModalHandler);
		bindSaveChangeModalHandler($modal, newSceneHandler, closeModalHandler);

		function bindSaveChangeModalHandler($modal, newSceneHandler, closeModalHandler) {
			$modal.find('.save').on('click', function() {
				var width  = $modal.find('input.new-scene-width').val();
				var height = $modal.find('input.new-scene-height').val();

				if(width && height) {
					newSceneHandler(width, height);
					closeModalHandler();
				}
			});
		};

		function bindCloseModalHandler($modal, closeModalHandler) {
			$modal.find('.close-modal').on('click', function() {
				closeModalHandler();
			});
		};
	},

	newSceneHandler: function(w, h) {
		var template = this.templates['scene-tab'];
		$('.scene-tabs').append(template({ width : w, height: h	}));
	},

	closeModalHandler: function() {
		$('.toolbar-modal').remove();
		this.toggleModalOverlay();
	},

	toggleModalOverlay: function() {
		$('.modal-overlay').toggleClass('in');
	},

	initialize: function($el) {
		this.$el = $el;
		this.$el.find('li:not(.main-item)').on('click', _.bind(this.itemEventHandler, this));
	}
}