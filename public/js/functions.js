// Function to sort by key
function sortBy(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
// sort function end
$(document).ready(function(){
  $.ajax({
    url : 'http://localhost:3000/menu/90',
    method : 'GET',
    success : function(res){
      var count = (Object.keys(res.menu).length);
      for(var i = 0; i <= count; i++) {
        console.log(res.menu);
      }
    }

  });
});


