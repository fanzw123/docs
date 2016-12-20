/*
 * Webdesign-Podcast.de SlideShow
 * v.1.5.0
 *
 * Copyright (c) 2011 Pascal Bajorat (http://www.pascal-bajorat.com)
 * Dual licensed under the MIT (below)
 * and GPL (http://www.gnu.org/licenses/gpl.txt) licenses.
 *
 *
 * http://www.pascal-bajorat.com
 * http://www.webdesign-podcast.de

MIT License

Copyright (c) 2011 Pascal Bajorat

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

jQuery.fn.WebdesignPodcastSlider = function(options) {
	return this.each(function(){
		settings = jQuery.extend({
     		width: 600,
     		height: 250,
     		buttonWidth: 30,
     		buttonHoverAddWidth: 10,
     		buttonHoverAnimationSpeed: 200,
     		buttonLeaveAnimationSpeed: 400,
     		slideshowClass: 'WebdesignPodcastSlideShow',
     		slidesContainerClass: 'slides',
     		singleSlideClass: 'slide',
     		nextButtonClass: 'nextBtn',
     		prevButtonClass: 'prevBtn',
     		stopOnButtonClick: true,
     		slideSpeed: 600,
     		autoPlay: 5000
	 	}, options);
		
		n_this = this;
		actSlide = 0;
		
		/* Add SlideShow Class */
		if(jQuery(this).hasClass(settings.slideshowClass) == false){
			jQuery(this).addClass(settings.slideshowClass);
		}
		
		/* Add Buttons */
		jQuery(this).append('<a href="#" class="'+settings.nextButtonClass+'"></a>');
		jQuery(this).append('<a href="#" class="'+settings.prevButtonClass+'"></a>');
		
		/* Add CSS */
		jQuery(this).css({
			width: settings.width+'px',
			height: settings.height+'px'
		});
		
		jQuery('.'+settings.nextButtonClass+', .'+settings.prevButtonClass+', .'+settings.slidesContainerClass, this).css({
			height: settings.height+'px'
		});
		
		jQuery('.'+settings.singleSlideClass, this).css({
			width: settings.width+'px'
		});
		
		/***********/
		
		jQuery('.'+settings.nextButtonClass+', .'+settings.prevButtonClass, this).hover(function(){
			jQuery(this).stop(true);
			jQuery(this).animate({
				width: '+='+settings.buttonHoverAddWidth,
				opacity: 1
			}, settings.buttonHoverAnimationSpeed);
		}, function(){
			jQuery(this).stop();
			jQuery(this).animate({
				width: settings.buttonWidth,
				opacity: 0.5
			}, settings.buttonLeaveAnimationSpeed);
		});
		
		NoS = jQuery('.'+settings.slidesContainerClass+' > *', this).length;
		sliderWidth = (NoS+2) * settings.width;
		jQuery('.'+settings.slidesContainerClass, this).css({
			width: sliderWidth+'px',
			height: settings.height+'px'
		});
		
		NoS2 = NoS-1;
		
		jQuery('.'+settings.slidesContainerClass+' > *:eq('+NoS2+')').clone().insertBefore('.'+settings.slidesContainerClass+' > *:eq(0)');
		jQuery('.'+settings.slidesContainerClass+' > *:eq(1)').clone().insertAfter('.'+settings.slidesContainerClass+' > *:eq('+NoS+')');
		
		jQuery('.'+settings.slidesContainerClass, this).css('left', '-'+settings.width+'px');
		
		nextSlide = function(){
			if(actSlide >= NoS2){
				newLeft = 0;
				jQuery('.'+settings.slidesContainerClass, n_this).css('left', '-'+newLeft+'px');
				actSlide = -1;
			}
			
			jQuery('.'+settings.slidesContainerClass, n_this).animate({
				left: '-='+settings.width
			}, settings.slideSpeed);
			actSlide = actSlide+1;
			return false;
		}
		
		prevSlide = function(){
			if(actSlide <= 0){
				newLeft = (NoS+1)*settings.width;
				jQuery('.'+settings.slidesContainerClass, n_this).css('left', '-'+newLeft+'px');
				actSlide = NoS2+1;
			}
			
			jQuery('.'+settings.slidesContainerClass, n_this).animate({
				left: '+='+settings.width
			}, settings.slideSpeed);
			actSlide = actSlide-1;
			return false;
		}
		
		jQuery('.'+settings.nextButtonClass, this).bind('click', function(){
			if(settings.stopOnButtonClick == true){
				clearInterval(autoPlayer);
			}
			nextSlide();
			return false;
		});
		
		jQuery('.'+settings.prevButtonClass, this).bind('click', function(){
			if(settings.stopOnButtonClick == true){
				clearInterval(autoPlayer);
			}
			prevSlide();
			return false;
		});
		
		if(!isNaN(settings.autoPlay)){
			var autoPlayer = window.setInterval('nextSlide()', settings.autoPlay);
		}
	});
};