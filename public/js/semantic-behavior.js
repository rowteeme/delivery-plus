jQuery(function($) {

    $('#sidebar-trigger').click(function() {
        toggleNav();
    });

    $('#suggestions-sidebar').click(function() {
        toggleNav();
    });

});

function toggleNav() {
    if ( $('#site-wrapper').hasClass('show-nav') ) {
        $('#site-wrapper').removeClass('show-nav');
        console.log('Hiding sidebar');
    } else {
        $('#site-wrapper').addClass('show-nav');
        console.log('Showing sidebar');
    }
}
