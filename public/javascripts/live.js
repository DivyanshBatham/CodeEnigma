// var socket = io.connect('http://10.0.0.230');
// var socket = io.connect('http://10.0.1.127');
var socket = io.connect('http://localhost');


getRank();

// Listen for Events:
socket.on('update',function(data){
  // alert(data);
  console.log("CHANGE TO "+data);
  $('#rank').html(`#${data}/147`);
});

socket.on('update2',function(data){
  getRank();
  // Change this to getRank and Score
});

function getRank() {
  $.ajax({
    type:'POST',
    url:'/getRank',
    dataType:'json',
    success: function(res){
      // console.log(res);
      $('#rank').html(res.rank);
      $('#points').html(res.score);
      // $("#loaderContainer").hide();
      // $(".container-fluid").show();
      // return res;
    }
  });
  // return Math.floor(Math.random()*147)+1;
}

// No need to emit socket from here, do it from server itself and only add here the listener for it.
$('#submitButton').click(function(){
	NProgress.done();
	NProgress.start();

	//alert("runButton");

	var url = JSON.stringify(window.location).split('/');
	url.pop();
	var id = url.pop();
	var difficulty = url.pop();

		// MAKE AN AJAX REQUEST WHICH TESTS AGAINTS HIDDEN INPUTS.
		// Test againsts hiddenInput
		var config = {
			source : editor.getValue(),
			langNo : document.getElementById('languageSelector').value,
			requestType : "submit",
			id : id,
			difficulty : difficulty
		};
				$.ajax({
					type:'POST',
					url:'/run',
					data:config,
					dataType:'json',
					success: function(res){
						// console.log("Hey");
						// var R = JSON.parse(res);
						var R = res;
            if( R.status=="Duplicate Submission")
            {
              $('#duplicateModal').modal('show');
            }
            else
            {
              if(R.result.compilemessage=="")
              {
                if(R.status=="✔ Correct Answer")
                {
                   $('#correctModal').modal('show');
                   $("#activeButton").html("✓");
                   // alert("MODAL FOR Correct Answer.");
                }
                if(R.status=="✘ Wrong Answer")
                $('#wrongModal').modal('show');
                // alert("MODAL FOR Wrong Answer.");
              }
              else
              {
                $("#compileModal .code").html(R.result.compilemessage);
                $('#compileModal').modal('show');
                // alert("MODAL FOR Compilation Error.");
                // MODAL FOR Compilation Error.
              }
            }
						NProgress.done();
					}
				});
});
