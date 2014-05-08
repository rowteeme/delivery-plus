jQuery(document)
  .ready(function() {

    jQuery('.filter.menu .item')
      .tab()
    ;

    jQuery('.ui.rating')
      .rating({
        clearable: true
      })
    ;

    jQuery('.ui.sidebar')
      .sidebar('attach events', '.launch.button')
    ;

    jQuery('.ui.dropdown')
      .dropdown()
    ;

  })
;