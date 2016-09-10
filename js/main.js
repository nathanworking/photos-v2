/*-----------------------------------

    ----- Smart Navigation ------

--------------------------------------*/
jQuery(document).ready(function($){
	// browser window scroll (in pixels) after which the "menu" link is shown
	var offset = 300;

	var navigationContainer = $('#cd-nav'),
		mainNavigation = navigationContainer.find('#cd-main-nav ul');

	//hide or show the "menu" link
	checkMenu();
	$(window).scroll(function(){
		checkMenu();
	});

	//open or close the menu clicking on the bottom "menu" link
	$('.cd-nav-trigger').on('click', function(){
		$(this).toggleClass('menu-is-open');
		//we need to remove the transitionEnd event handler (we add it when scolling up with the menu open)
		mainNavigation.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').toggleClass('is-visible');

	});

	function checkMenu() {
		if( $(window).scrollTop() > offset && !navigationContainer.hasClass('is-fixed')) {
			navigationContainer.addClass('is-fixed').find('.cd-nav-trigger').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
				mainNavigation.addClass('has-transitions');
			});
		} else if ($(window).scrollTop() <= offset) {
			//check if the menu is open when scrolling up
			if( mainNavigation.hasClass('is-visible')  && !$('html').hasClass('no-csstransitions') ) {
				//close the menu with animation
				mainNavigation.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					//wait for the menu to be closed and do the rest
					mainNavigation.removeClass('is-visible is-hidden has-transitions');
					navigationContainer.removeClass('is-fixed');
					$('.cd-nav-trigger').removeClass('menu-is-open');
				});
			//check if the menu is open when scrolling up - fallback if transitions are not supported
			} else if( mainNavigation.hasClass('is-visible')  && $('html').hasClass('no-csstransitions') ) {
					mainNavigation.removeClass('is-visible has-transitions');
					navigationContainer.removeClass('is-fixed');
					$('.cd-nav-trigger').removeClass('menu-is-open');
			//scrolling up with menu closed
			} else {
				navigationContainer.removeClass('is-fixed');
				mainNavigation.removeClass('has-transitions');
			}
		}
	}
});

gallery = $('#Container').lightGallery({
  selector: '.photo-link',
  download: false,
  counter: false,
  zoom: false,
  thumbnail: false,
  mode: 'lg-fade'
});






$(function(){

 var layout = 'list', // Store the current layout as a variable
     $container = $('#Container'), // Cache the MixItUp container
     $changeLayout = $('#ChangeLayout'); // Cache the changeLayout button

 // Instantiate MixItUp with some custom options:

 $container.mixItUp({
   animation: {
     duration: 400,
     effects: 'fade stagger(34ms)',
     easing: 'ease',
     animateResizeContainer: false, // Needed to make flex-mansory layout work
   }
 });

 // MixItUp does not provide a default "change layout" button, so we need to make our own and bind it with a click handler:

 $changeLayout.on('click', function(){

   // If the current layout is a list, change to grid:

   if(layout == 'list'){
     layout = 'grid';

     $changeLayout.text('List'); // Update the button text

     $container.mixItUp('changeLayout', {
       containerClass: layout // change the container class to "grid"
     });

   // Else if the current layout is a grid, change to list:

   } else {
     layout = 'list';

     $changeLayout.text('Grid'); // Update the button text

     $container.mixItUp('changeLayout', {
       containerClass: layout // Change the container class to 'list'
     });
   }
 });

});


/// Lazy loading
window.lazySizesConfig = window.lazySizesConfig || {};
//page is optimized for fast onload event
lazySizesConfig.loadMode = 1;
