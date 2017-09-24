
$('#insertButton').click(function(){
	// NProgress.done();
	// NProgress.start();

		var Question = {
      difficulty : document.getElementById('difficultySelector').value,
      id : document.getElementById('id').value,
      title : document.getElementById('title').value,
      description : editor.getValue(),
			shortDescription : editor3.getValue(),
			sampleInput : editor2.getValue()
		};

    console.log(Question);

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
