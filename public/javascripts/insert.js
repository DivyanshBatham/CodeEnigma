
$('#insertButton').click(function(){
	// NProgress.done();
	// NProgress.start();

		var Question = {
      difficulty : document.getElementById('difficultySelector').value,
      id : document.getElementById('id').value,
      title : document.getElementById('title').value,
      description : editor.getValue(),
			shortDescription : editor3.getValue(),
			// sampleInput : editor2.getValue()
			sampleInput : $('#sampleInput').val(),
			sampleOutput : $('#sampleOutput').val(),
			ignoreLines : $('#ignoreLines').val(),
			inputLines : $('#inputLines').val(),
			outputLines : $('#outputLines').val()
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
