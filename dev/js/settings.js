$(function() {

	/* jQuery navKit plugin init and settings
	*
	* navAnchor: "js-anchor"	anchor class name link for smooth scrolling
	* navLink: "js-link"		link class name for hightlight on current section
	* navOpen: "js-navopen"	    icon class name for toggling navbar
	* navClose: "js-navclose"	icon class name for toggling navbar
	* openNav: 'is-visible',    class name for visible menu
	* activeLink: "is-active"	class name of active and highlighted link
	* state: "closed"			default state of navbar
	 */
	$('.js-nav').navKit({
		state: 'closed'
	});

	/* jQuery anchorScroll plugin init and settings
	*
	* navAnchor: "js-anchor"	anchor class name link for smooth scrolling
	* navLink: "js-link"		link class name for hightlight on current section
	* activeLink: "is-active"	class name of active and highlighted link
	 */
	$('.js-switchers').anchorScroll({
		state: 'closed'
	});

	/* jQuery tabToggle plugin init and settings
	*
	* toggleLink: "js-togglelink"      class name of tab menu item
	* toggleTarget: "js-toggletarget"  target page
	* activeTab: "is-visible"    helper class to show target page
	* activeLink: "is-active"    helper class to highlight tab link

	 */
	$('.js-toggle').toggleContent();
});
