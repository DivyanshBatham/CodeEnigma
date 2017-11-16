// $(document).ready(function(){
//     $(".sticky-header").floatThead({top:50px});
// });

const thead = $('#resultTable');
const topOfThead = thead.offset();


$("#right-col").on( 'scroll', function(){
  console.log(topOfThead);
  console.log($('#right-col').scrollTop());

  if($('#right-col').scrollTop() >= topOfThead.top )
  {
    // $('.thead-dark').clone().appendTo($("#header-fixed"));
    // $('#resultTable').addClass('fixed');

  }
  else
  {
    // $('#resultTable').removeClass('fixed');

  }

});

// var tableOffset = $("#resultTable").offset().top;
// var $header = $("resultTable > thead").clone();
// var $fixedHeader = $("#header-fixed").append($header);
//
// $(window).bind("scroll", function() {
//     var offset = $(this).scrollTop();
//
//     if (offset >= tableOffset && $fixedHeader.is(":hidden")) {
//         $fixedHeader.show();
//     }
//     else if (offset < tableOffset) {
//         $fixedHeader.hide();
//     }
// });
