$(function(){
	
	// fade effect when changing sections
	$('a[data-fade]').click(function(e){
		$('<div id="loading-mask" class="hidden"></div>').prependTo('body').fadeIn(function(){
			return true;
		});
	})
	
	// selectmenu
	if ($('.select-wrapper').size () > 0) {
		$('.select-wrapper:not(.wide) select').selectmenu({
			transferClasses: true,
			menuWidth: 154
		});
		$('.select-wrapper.wide select').selectmenu({
			transferClasses: true,
			menuWidth: 214
		});
	}
	
	// nav effect
	$('.site-nav li:not(.active)').hover(function(){
		$(this).children('span').stop(true, true).fadeIn();
		$(this).children('a').stop(true, true).animate({ color: '#fff' });
	}, function(){
		$(this).children('span').stop(true, true).fadeOut();
		$(this).children('a').stop(true, true).animate({ color: '#1ba7da' });
	});
	
	
	// home
	if ($('#home-slider').size() > 0) {
		$('#home-slider').plusSlider({
			autoPlay: true,
			displayTime: 4000,
			createPagination: false,
			keyboardNavigation: false,
			sliderType: 'fader',
			pauseOnHover: false
		});
		
		$('<span></span>').appendTo('.plusSlider .arrow');
		
	}
	
	$('.jcarousel-prev, .plusSlider .arrow.prev').hover(function(){
		if($(this).attr('disabled') != 'disabled') {
			$(this).children().stop(true, true).animate({'left' : -10});
		}
	}, function(){
		$(this).children().stop(true, true).animate({'left' : 0});
	});
	$('.jcarousel-next, .plusSlider .arrow.next').hover(function(){
		if($(this).attr('disabled') != 'disabled') {
			$(this).children().stop(true, true).animate({'left' : 10});
		}
	}, function(){
		$(this).children().stop(true, true).animate({'left' : 0});
	});
	
	// products
	if ($('.products-category:not(.single)').size() > 0) {
		$('.products-category').jcarousel({
			buttonNextHTML: '<a><span>Next</span></a>',
			buttonPrevHTML: '<a><span>Previous</span></a>',
			scroll: 4
		});
		
		optionIndex = $('select.products-categories option:selected').index();
		$('.jcarousel-container:eq(' + optionIndex + ')').addClass('active');
		$('.jcarousel-container:not(.active)').hide();
		
		$('select.products-categories').change(function(){
			optionIndex = $(this).children(':selected').index();
			$('.jcarousel-container.active').fadeOut(function(){
				$(this).removeClass('active');
				$('.jcarousel-container:eq(' + optionIndex + ')').fadeIn(function(){
					$(this).addClass('active');
				});
			});
		});
		
	}
	
	$('.products-item').mouseenter(function(){
		$item = $(this);
		$item.find('.product-image-hover').stop(true, true).fadeIn();
	}).mouseleave(function(){
		$item = $(this);
		$item.find('.product-image-hover').stop(true, true).fadeOut();
	});
	$('.products-item').find('.product-info-icon, .product-image-hover').click(function(){
		$container = $(this).closest('.products-item');
		$icon = $container.find('.product-info-icon');
		if(!$icon.hasClass('active')) {
			$icon.stop(true, true).animate({ 'bottom' : 62 }).addClass('active').animate({ 'bottom' : 24 });
			if ($container.parent().hasClass('single')) {
				contentHeight = 72;
			} else {
				contentHeight = 106;
			}
			$container.find('.product-info-wrapper').children('.product-info').stop(true, true).animate({ 'height' : contentHeight });
		} else {
			if ($(this).hasClass('product-info-icon')) {
				$icon.stop(true, true).animate({ 'bottom' : 62 }).removeClass('active').animate({ 'bottom' : 30 });
				$container.find('.product-info-wrapper').children('.product-info').stop(true, true).animate({ 'height' : 8 });
			}
		}
	});
	
	$('.select-product').click(function(e){
		
		$product = $(this).closest('.products-item');
		
		//console.log($product);
		
		$.cookie('selected_category', $('.selectmenu.products-categories').val(), '/');
		$.cookie('selected_product', $product.data('product-id'), '/');
		
		//console.log($.cookie('selected_category'));
		//console.log($.cookie('selected_product'));
		//return false;
		
		
	});
	
	// services
	if ($('.services-list').size() > 0) {
		$('.services-list').accordion({
			autoHeight: false,
			create: function (event, ui) {
				$('.services-list li:first h2 span').addClass('active');
			},
			changestart: function (event, ui) {
				ui.oldHeader.children('span').animate({ 'left' : 561 }, function () {
					$(this).removeClass('active').animate({ 'left' : 600 });
				});
				ui.newHeader.children('span').stop(true, true).animate({ 'left' : 561 }, function () {
					$(this).addClass('active').animate({ 'left' : 600 });
					//$(this).stop(true, true).animate({ 'left' : 600 });
				});
				return true;
			},
			change: function (event, ui) {
				
				return true;
			}
		});
	}
	
	// contact
	
	if ($('#map').size() > 0) {
		mapInit();
	}
	
	
	$('.contact-form .select-wrapper.product, .contact-form .products-category, .contact-form .products-item').hide();
	
	toggleProductCategory(true);
	$('select.products-category-selector').change(function(){
		toggleProductCategory(false);
	});
	$('select.products-item-selector').change(function(){
		toggleProductItem();
	});
	
	$('#loading-mask').fadeOut('slow', function(){
		$(this).remove();
	});
	
});

function toggleProductCategory (onload) {
	// tomo el indice de la categoria seleccionada
	categorySelectedIndex = $('select.products-category-selector :selected').index();
	
	$('.select-wrapper.product.active').hide().removeClass('active');
	$('.select-wrapper.product:eq(' + categorySelectedIndex + ')').show().addClass('active');
	
	$('.products-category.active').fadeOut().removeClass('active').children('li.active').fadeOut().removeClass('active');
	$('.products-category:eq(' + (categorySelectedIndex - 1) + ')').fadeIn(function(){
		$(this).addClass('active');
		toggleProductItem();
	});
	
	return true;
	
}

function toggleProductItem (onload) {
	
	categorySelectedIndex = $('.products-category-selector :selected').index();
	productSelectedIndex = $('.select-wrapper.product.active select :selected').index();
	
	if (productSelectedIndex > 0) {
		$('.products-category.active .products-item.active').fadeOut().removeClass('active');
		$('.products-category.active .products-item:eq(' + (productSelectedIndex - 1) + ')').fadeIn().addClass('active');
	}
	
}

function mapInit () {
	var latlng = new google.maps.LatLng(-34.462737, -58.524939);
	var myOptions = {
		zoom: 16,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map"), myOptions);
	
	var image = 'img/map_marker.png';
	
	var beachMarker = new google.maps.Marker({
		position: latlng,
		map: map,
		icon: image
	});

	
}
