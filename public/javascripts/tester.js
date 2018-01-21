$(document).ready(function(){
	$(".pHead").click(function(){
				$(this).next().slideToggle("medium");
    });

});

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


	NProgress.done();

});


$('#runButton').click(function(){
	NProgress.done();
	NProgress.start();

	//alert("runButton");

	// console.log(config);
	// console.log(sampleOutput);
	// console.log(sampleInput);

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
							$(".pHead").html(R.status);
							$("#input").html(editor2.getValue());
							$("#output").html(R.result.stdout[0]);
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
						NProgress.done();
					}
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
						// console.log("Hey");
						// var R = JSON.parse(res);
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
	 case "20":
	 	lang="javascript";
		break;
	case "5":
	 	lang="python";
		break;
 }

	//alert(req.url);
	//alert( $('#languageSelector') );
	window.location.href = lang;
}

function run()
{
		//alert("Button Clicked");
		var config = {
			source : editor.getValue(),
			input  : editor2.getValue(),
			language : 2
		};


		$.ajax({
				type:'POST',
				url:'/run',
				data:config,
				dataType:'json',
				success: function(){
					console.log("Hey");
				}
			});

			// data=JSON.parse(data);
			// var str = (data.result.compilemessage).toString();
			// str=decodeURIComponent(escape(str));



			// $("#runResponse").html("");
			// if(str==""){
			// 	$("#runResponse").html("Compile Message: Compilation Successful <br><br>");
			// 	$("#runResponse").append("Output: <br>");

			// 	(data.result.stdout).forEach(function(item,index){
			// 	$("#runResponse").append(data.result.stdout[index]+"<br>");

			// });
			// }
			// else{
			// 	$("#runResponse").html("Compile Message: "+ str+"<br><br>");
			// }


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

// function pToggle(x) {
// 		console.log(x);
//
// 		// console.log(x.next());
//
//
// 					$(".pBody").slideToggle("slow");
//
//
// }
