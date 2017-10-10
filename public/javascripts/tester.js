$(document).ready(function(){
	$(".pHead").click(function(){
				$(this).next().slideToggle("medium");
    });

});
$('#runButton').click(function(){
	NProgress.done();
	NProgress.start();

	//alert("runButton");

	console.log(config);
	console.log(sampleOutput);
	console.log(sampleInput);

	if($("#customInput").is(':checked'))
	{
		// Custom Inputs.
		var config = {
			source : editor.getValue(),
			input  : editor2.getValue(),
			langNo : document.getElementById('languageSelector').value,
		};
				$.ajax({
					type:'POST',
					url:'/run',
					data:config,
					dataType:'json',
					success: function(res){
						console.log("Hey");
						var R = JSON.parse(res);
						console.log(R);
						console.log(R.result);
						if(R.result.compilemessage=="")
						{
							editor3.setValue(R.result.stdout[0]);
						}
						else
						{
							editor3.setValue(R.result.compilemessage);
						}
						NProgress.done();
					}
				});
	}
	else
	{
		// Test againsts sampleInput
		var config = {
			source : editor.getValue(),
			input  : sampleInput,
			langNo : document.getElementById('languageSelector').value,
		};
				$.ajax({
					type:'POST',
					url:'/run',
					data:config,
					dataType:'json',
					success: function(res){
						console.log("Hey");
						var R = JSON.parse(res);
						console.log(R);
						console.log(R.result);
						if(R.result.compilemessage=="")
						{

							// var matches = R.result.stdout[0].split('\n');
							// var userOutputs = [];
							// for( var i=0; i<matches.length; )
							// {
							//   t = matches.length/outputs.length;
							//   testcase = [];
							//   while(t--)
							//   {
							//     testcase.push(matches[i]);
							//     i++;
							//   }
							//   userOutputs.push(testcase.join('\n'));
							// }

							// ALL THIS VALIDATION SHOULD BE DONE ON SERVER SIDE, WE SHOULD NOT OPEN THE VARIABLES TO CLIENT SIDE JS.
							// Separate Outputs.
								// outputLines/
							// Match Corresponding outputs:
								// Set icon, output, input(optional)
								// $("td.output").each(function(){
								// 	$(this).children().text(userOutputs.shift());
								// });

							// if(R.result.stdout[0]==sampleOutput)
							// 	alert("Correct");

							editor3.setValue(R.result.stdout[0]);
							// Use jQuerry to retrive an array of output and set them
						}
						else
						{
							editor3.setValue(R.result.compilemessage);
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
