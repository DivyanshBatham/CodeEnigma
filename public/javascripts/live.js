var socket = io.connect('http://localhost');

// Listen for Events:
socket.on('update',function(data){
  // alert(data);
  console.log("CHANGE TO "+data);
  $('#rank').html(`#${data}/147`);
});

socket.on('update2',function(data){
  // alert(data);
  console.log("CHANGE TO "+data);
  let rank = data.indexOf(user.id);
  $('#rank').html(`#${rank}/147`);
});

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
						console.log("Hey");
						// var R = JSON.parse(res);
						var R = res;
						console.log(R);
						console.log(R.result);
						if(R.result.compilemessage=="")
						{
              if(R.status=="✔ Correct Answer")
                // alert("MODAL FOR Correct Answer.");
              if(R.status=="✘ Wrong Answer")
                alert("MODAL FOR Wrong Answer.");

                // MODAL FOR Wrong or Correct Answer.
                // If correct :
                // socket.emit('update')
                // Or this could be done on the server side itself, if answer is correct.
                // res.io.emit("socketToMe", "users");
						}
						else
						{
              alert("MODAL FOR Compilation Error.");
              // MODAL FOR Compilation Error.
						}
						NProgress.done();
					}
				});
});
