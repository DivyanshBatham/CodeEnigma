$(document).ready(function(){
	$(".pHead").click(function(){
				$(this).next().slideToggle("medium");
    });

});

// $('#help').click(function(){
// 	if(document.getElementById('help').checked)
// 	{
// 		$('[data-toggle="tooltip"]').tooltip();
// 	}
// 	else {
// 		$('.tool').tooltip('hide')
// 	}
// });

$('#customInputs').click(function(){
	// alert("customInputs clicked");
	if(document.getElementById('customInputs').checked)
	{
		// SetVisible editor2 and editor3
		// alert("display inputs");
		$('#editor').css("height","71%");
		ace.edit("editor").resize();
		$('#right-col-sub-header').show();
		$('#editor2').show();
		ace.edit("editor2").resize();
		$(".radioLabel").css("color","#ffbe4a");
		// alert("checked");
	}
	else {
		// SetInVisible editor2 and editor3
		$('#right-col-sub-header').hide();
		$('#editor2').hide();
		$('#editor').css("height","94%");
		ace.edit("editor").resize();
		ace.edit("editor2").resize();
		$(".radioLabel").css("color","#AAAAAA");
		// alert("unchecked")
	}
});


$('#saveButton').click(function(){
	NProgress.done();
	NProgress.start();

		var url = JSON.stringify(window.location.href).split('/');
		// alert(JSON.stringify(window.location.href));
		// alert(url);
		var language = url.pop().slice(0,-1);
		var id = url.pop();
		var difficulty = url.pop();

		var User = {
      difficulty : difficulty,
			id : id,
			language : language,
			code : editor.getValue()
		};

		$.ajax({
				type:'POST',
				url:'/save',
				data:User,
				dataType:'json',
				success: function(res){
					$('#snackbar').fadeIn();
					setTimeout(function(){ $('#snackbar').fadeOut(); }, 1000);
					NProgress.done();
					// alert("Code Successfully Saved");
				}
			});

});

$('#resetButton').click(function(){
	NProgress.done();
	NProgress.start();
	var url = JSON.stringify(window.location.href).split('/');
	var language = url.pop().slice(0,-1);

	if(language=='cpp')
		editor.setValue(`#include<iostream>
using namespace std;

int main()
{
	// cout << "Hello from C++";
	return 0;
}`, 1);

	else if(language=='java')
	editor.setValue(`class Code
{
    public static void main( String args[] )
    {
        // System.out.println("Hello from Java");
    }
}`, 1);

else if(language=='c')
editor.setValue(`#include<stdio.h>

int main()
{
    // printf("Hello from C");
    return 0;
}`, 1);

else if(language=='python2')
editor.setValue(`print "Hello from Python2"`, 1);

else if(language=='python3')
editor.setValue(`print("Hello from Python3)"`, 1);


	NProgress.done();

});

var testerRequest = null;
$('#runButton').click(function(){
	NProgress.done();
	NProgress.start();

	// testerRequest = null;
	// Abort the previous AJAX Request, before senfing a new request.
	if(testerRequest != null)
	{
		console.log("\n\n\n\nPREVIOUS REQEUEST ABORTED\n\n\n\n");
		testerRequest.abort();
		clearTimeout(TimeOUT);
		testerRequest = null;
	}

	// Set a timeout for 30 Seconds:
	var TimeOUT = setTimeout(function(){
		// alert("Timeout");
		NProgress.done();
		$('#timeoutModal').modal('show');
		testerRequest.abort();
	}, 30000);

	var url = JSON.stringify(window.location).split('/');
	url.pop();
	var id = url.pop();
	var difficulty = url.pop();

	// if($("#customInput").is(':checked'))
	if(document.getElementById('customInputs').checked)
	{
		// Custom Inputs.
		var config = {
			source : editor.getValue(),
			input  : editor2.getValue(),
			langNo : document.getElementById('languageSelector').value,
			requestType : "custom"
		};
				testerRequest = $.ajax({
					type:'POST',
					url:'/run',
					data:config,
					dataType:'json',
					// timeout: 30000,	// New
					success: function(res){
						clearTimeout(TimeOUT);
						// alert("Timeout Cleared");
						if(res.error=="unexpected")
						{
							$('#unexpectedModal').modal('show');
						}
						else
						{
								var R = res;
								console.log(R);
								console.log(R.result);
								if(R.result.compilemessage=="")
								{
									// var temp = R.result.stdout[0].replace(/\\/g,'\\');
									$(".pHead").html(R.status);
									$("#input").html(editor2.getValue());
									$("#output").html(R.result.stdout[0]);
									// $("#output").html(temp);
									// $("#output").html(R.result.stdout[0].replace(/\//g,\/\/));
									$("#expectedRow").hide();
									changeTab("TestResults");
									// editor3.setValue(R.result.stdout[0]);
								}
								else
								{
									$(".pHead").html(R.status);
									$("#input").html(editor2.getValue());
									$("#output").html(R.result.compilemessage);
									$("#expectedRow").hide();
									changeTab("TestResults");
									// editor3.setValue(R.result.compilemessage);
								}
								testerRequest = null;
						}
						NProgress.done();
					}
					// error: function(x, textStatus, m) {
          //   if (textStatus=="timeout") {
          //       NProgress.done();
					// 			testerRequest = null;
					// 			$('#timeoutModal').modal('show');
          //   }
        	// }
				});
	}
	else
	{
		// MAKE AN AJAX REQUEST WHICH TESTS AGAINTS SAMPLEINPUTS.
		// Test againsts sampleInput
		var config = {
			source : editor.getValue(),
			langNo : document.getElementById('languageSelector').value,
			requestType : "run",
			id : id,
			difficulty : difficulty
		};
				$.ajax({
					type:'POST',
					url:'/run',
					data:config,
					dataType:'json',
					success: function(res){
						clearTimeout(TimeOUT);
						if(res.error=="unexpected")
						{
							$('#unexpectedModal').modal('show');
						}
						else
						{
								var R = res;
								// console.log(R);
								// console.log(R.result);
								if(R.result.compilemessage=="")
								{
										// $("#output").html( respose varaible . result );
										$(".pHead").html(R.status);
										$("#input").html(R.sampleInput[0]);
										$("#output").html(R.result.stdout[0]);
										$("#expected").html(R.sampleOutput);
										$("#expectedRow").show();
										changeTab("TestResults");
								}
								else
								{
										$(".pHead").html(R.status);
										$("#input").html(R.sampleInput[0]);
										$("#output").html(R.result.compilemessage);
										$("#expected").html(R.sampleOutput);
										$("#expectedRow").show();
										changeTab("TestResults");

									//editor3.setValue(R.result.compilemessage);
								}
							}
							NProgress.done();
					}
				});
	}


});

function changeLanguage(currentOp){
	//var e = document.getElementById("languageSelector");
	//var strUser = e.options[e.selectedIndex].text;
	// alert(strUser);
 var langNo=document.getElementById('languageSelector').value;

 var lang; // for Ace
 switch(langNo){
	 case "1":
	 	lang="c";
		break;
	 case "2":
	 	lang="cpp";
		break;
	 case "3":
	 	lang="java";
		break;
	 case "5":
	 	lang="python2";
		break;
	 case "30":
 	 	lang="python3";
 		break;
 }

	//alert(req.url);
	//alert( $('#languageSelector') );
	window.location.href = lang;
}


function changeTab(clickedButton) {
	// alert(clickedButton);
	// console.log(clickedButton);
	if(clickedButton=="Description")
	{
		document.getElementById('tabR').classList.remove('active');
		document.getElementById('tabD').classList.remove('active');
		document.getElementById('tabD').classList.add('active');
		$("#left-col-body-description").show();
		$("#left-col-body-test-results").hide();

		// document.getElementById('left-col-body-description').style.display = '';
		// document.getElementById('left-col-body-test-results').style.display = 'none';
	}
	else
	{
		document.getElementById('tabD').classList.remove('active');
		document.getElementById('tabR').classList.remove('active');
		document.getElementById('tabR').classList.add('active');
		$("#left-col-body-description").hide();
		$("#left-col-body-test-results").show();

		// document.getElementById('left-col-body-description').style.display = 'none';
		// document.getElementById('left-col-body-test-results').style.display = '';
	}
}
