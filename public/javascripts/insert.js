$('#backButton').click(function(){
	window.location.href = "/CodeEnigma/easy";
});

$('#questionSelector').change(function(){
	alert("Question Selected");
	alert(questions[0].id);
})

$('#insertButton').click(function(){
	// NProgress.done();
	// NProgress.start();

		var Question = {
      difficulty : document.getElementById('difficultySelector').value,
      id : document.getElementById('id').value,
      title : document.getElementById('title').value,
      description : editor.getValue(),
			shortDescription : editor2.getValue(),
			// sampleInput : editor2.getValue()
			sampleInput : $('#sampleInput').val(),
			sampleOutput : $('#sampleOutput').val(),
			hiddenInput : $('#hiddenInput').val(),
			hiddenOutput : $('#hiddenOutput').val(),
			// ignoreLines : $('#ignoreLines').val(),
			// inputLines : $('#inputLines').val(),
			// outputLines : $('#outputLines').val()
		};

    console.log("Insert.js(JS)" , Question);

		$.ajax({
				type:'POST',
				url:'/insert',
				data:Question,
				dataType:'json',
				success: function(){
					alert("Data Successfully Inserted");
					// NProgress.done();
				}
			});

});


$('#updateButton').click(function(){
	// NProgress.done();
	// NProgress.start();

	var url = window.location.pathname.split('/');
	var oldId = url.pop();
	var oldDifficulty = url.pop();
	// alert(id);
	// alert(difficulty);

		var Question = {
			oldId : oldId,
			oldDifficulty : oldDifficulty,
      difficulty : document.getElementById('difficultySelector').value,
      id : document.getElementById('id').value,
      title : document.getElementById('title').value,
      description : editor.getValue(),
			shortDescription : editor2.getValue(),
			sampleInput : $('#sampleInput').val(),
			sampleOutput : $('#sampleOutput').val(),
			hiddenInput : $('#hiddenInput').val(),
			hiddenOutput : $('#hiddenOutput').val(),
		};

    // console.log("Insert.js(JS)" , Question);

		$.ajax({
				type:'POST',
				url:'/update',
				data:Question,
				dataType:'json',
				success: function(){
					alert("Data Updated Successfully");
					// NProgress.done();
				}
			});

});


function showData()
{
  document.getElementById('span').innerHTML = editor.getValue();
}

function changeTab(clickedButton) {
	// alert(clickedButton);
	// console.log(clickedButton);
	if(clickedButton=="Description")
	{
		document.getElementById('tabS').classList.remove('active');
		document.getElementById('tabH').classList.remove('active');
		document.getElementById('tabD').classList.remove('active');
		document.getElementById('tabD').classList.add('active');
		$("#left-col-body-description").show();
		$("#left-col-body-sample").hide();
		$("#left-col-body-hidden").hide();

		// document.getElementById('left-col-body-description').style.display = '';
		// document.getElementById('left-col-body-sample').style.display = 'none';
	}
	else if(clickedButton=="Sample")
	{
		document.getElementById('tabD').classList.remove('active');
		document.getElementById('tabH').classList.remove('active');
		document.getElementById('tabS').classList.remove('active');
		document.getElementById('tabS').classList.add('active');
		$("#left-col-body-description").hide();
		$("#left-col-body-hidden").hide();
		$("#left-col-body-sample").show();

		// document.getElementById('left-col-body-description').style.display = 'none';
		// document.getElementById('left-col-body-sample').style.display = '';
	}
	else if(clickedButton=="Hidden")
	{
		document.getElementById('tabD').classList.remove('active');
		document.getElementById('tabS').classList.remove('active');
		document.getElementById('tabH').classList.remove('active');
		document.getElementById('tabH').classList.add('active');
		$("#left-col-body-description").hide();
		$("#left-col-body-sample").hide();
		$("#left-col-body-hidden").show();

		// document.getElementById('left-col-body-description').style.display = 'none';
		// document.getElementById('left-col-body-sample').style.display = '';
	}
}


$('#submitButton').click(function(){
	console.log("Submit Button Pressed");
	var Contest = {
		type : "Contest",
		startDate : document.getElementById('startDate').value,
		endDate : document.getElementById('endDate').value,
	};
console.log(Contest);
	$.ajax({
			type:'POST',
			url:'/config',
			data:Contest,
			dataType:'json',
			success: function(numAffected){
				alert("Data Successfully Updated \n" + JSON.stringify(numAffected) );
				// NProgress.done();
			}
		});

});


$('#submitButton2').click(function(){
	console.log("Submit Button 2 Pressed");
	var Contest = {
		type : "Contestant",
		startId : document.getElementById('startId').value,
		endId : document.getElementById('endId').value,
	};
console.log(Contest);
	$.ajax({
			type:'POST',
			url:'/config',
			data:Contest,
			dataType:'json',
			success: function(){
				alert("Data Successfully Updated \n");
				// NProgress.done();
			}
		});

});


// $('.editButton').click(function(){
// 	var Question =
// 	{
// 		difficulty : $(this)[0].value.split('/')[0],
// 		id : $(this)[0].value.split('/')[1]
// 	}
//
// 	$.ajax({
// 			type:'POST',
// 			url:'/update',
// 			data:Question,
// 			dataType:'json',
// 			success: function(){
// 				alert("Data Successfully sent for update");
// 				// NProgress.done();
// 			}
// 		});
//
// })
