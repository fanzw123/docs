Webdesign-Podcast-SlideShow
===========================

The Webdesign-Podcast.de SlideShow Plugin is an easy to use MultiMedia Slider with some greate and dynamic effects. This jQuery Plugin has a lot of settings and is fully customizable.

Webdesign-Podcast.de SlideShow v.1.5.0


Include this in your HTML head or Footer
========================================

```html
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/webdesign-podcast-slider.js"></script>
```

CSS must be included in your HTML head

```html
<link rel="stylesheet" type="text/css" href="css/webdesign-podcast-slider.css" />
```

This is the correct HTML-Structure for the Slideshow
====================================================

```html
<div id="slideshow">
	<div class="slides">
		<div class="slide"><a href="#"><img src="images/gewinnspiel-slider.jpg" alt="" width="598" height="250" /></a></div>
		<div class="slide"><a href="#"><img src="images/img.jpg" alt="" width="598" height="250" /></a></div>
		<div class="slide"><a href="#"><img src="images/img2.jpg" alt="" width="598" height="250" /></a></div>
		<div class="slide"><a href="#"><img src="images/img3.jpg" alt="" width="598" height="250" /></a></div>
		<div class="slide"><a href="#"><img src="images/img4.jpg" alt="" width="598" height="250" /></a></div>
		<div class="slide"><a href="#"><img src="images/img5.jpg" alt="" width="598" height="250" /></a></div>
		<div class="slide"><a href="#"><img src="images/img6.jpg" alt="" width="598" height="250" /></a></div>
		<div class="slide"><a href="#"><img src="images/img7.jpg" alt="" width="598" height="250" /></a></div>
	</div>
</div>
```

Start the Slideshow with this function
======================================

```html
<script type="text/javascript">
	jQuery(document).ready(function(){
		jQuery('#slideshow').WebdesignPodcastSlider();
	});
</script>
```

Options for WebdesignPodcastSlider
==================================

```html
<script type="text/javascript">
	jQuery(document).ready(function(){
		jQuery('#slideshow').WebdesignPodcastSlider({
			width: 600, // Width
     		height: 250, // Height
     		buttonWidth: 30, // Width of the next and prev buttons
     		buttonHoverAddWidth: 10, // This value will added when you hover over the buttons
     		buttonHoverAnimationSpeed: 200, // Button hover animation speed
     		buttonLeaveAnimationSpeed: 400, // Button hover out animation speed
     		slideshowClass: 'WebdesignPodcastSlideShow', // CSS Class of the Slideshow
     		slidesContainerClass: 'slides', // Class of the inner Slider Container
     		singleSlideClass: 'slide', // Class of each Slider element
     		nextButtonClass: 'nextBtn', // Class of the next button
     		prevButtonClass: 'prevBtn', // Class of the prev button
     		stopOnButtonClick: true, // Stop autoplay on button click
     		slideSpeed: 600, // Slider animation speed
     		autoPlay: 5000 // Autoplay interval / false will disable autoplay
		});
	});
</script>
```

Copyright (c) 2013 Pascal Bajorat
Licensed under Gnu GPL version 3 licenses.



## [Main Demo](http://www.webdesign-podcast.de/wp-content/uploads/2011/06/webdesign-podcast-slider/)

* [Documentation](https://github.com/pascalbajorat/Webdesign-Podcast-SlideShow/wiki/Documentation)
* [Homepage](http://www.webdesign-podcast.de/2011/06/27/modernes-webdesign-podcast-jquery-slideshow-plugin/)
* [Download](https://github.com/pascalbajorat/Webdesign-Podcast-SlideShow/zipball/master)
* [Author](https://www.pascal-bajorat.com/)