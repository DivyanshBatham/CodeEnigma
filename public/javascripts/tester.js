$(document).ready(function(){

	//alert("document ready");
});
$('#runButton').click(function(){
	NProgress.done();
	NProgress.start();

	//alert("runButton");

		var config = {
			source : editor.getValue(),
			input  : editor2.getValue(),
			langNo : document.getElementById('languageSelector').value,
		};
	console.log(config);

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
						editor3.setValue(R.result.stdout[0]);
					else
						editor3.setValue(R.result.compilemessage);
						NProgress.done();
				}
			});

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
		// document.getElementById('left-col-body-description').style.display = '';
		// document.getElementById('left-col-body-test-results').style.display = 'none';
	}
	else
	{
		document.getElementById('tabD').classList.remove('active');
		document.getElementById('tabR').classList.remove('active');
		document.getElementById('tabR').classList.add('active');
		// document.getElementById('left-col-body-description').style.display = 'none';
		// document.getElementById('left-col-body-test-results').style.display = '';
	}
}
