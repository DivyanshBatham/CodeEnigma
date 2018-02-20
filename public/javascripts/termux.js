/*
if(window.location.pathname === "/login"){
var user = {
TeamId : "Dr.DooM",
Password : "termux00"
};
$.ajax({
type:'POST',
url:'/login',
data:user,
dataType:'json',
success: function(res){
                        if(res.status=="Correct Login")
                        {
                            window.location.reload(true);
                        }
                        else if(res.status=="Invalid TeamId")
                        {
                          $("#errorPass").text("Invalid TeamId");
                        }
                        else if(res.status=="Invalid TeamId or Password")
                        {
                          $("#errorPass").css({"float":"right"});
                          $("#errorPass").text("Invalid Password");
                        }
                        NProgress.done();
                      }

                });

}//checking user is not logged in window.location.href = /CodeEnigma/easy/E1/c";

if(window.location.pathname === "/CodeEnigma/easy"){
		window.location.href = "/CodeEnigma/easy/E1/cpp";
<<<<<<< HEAD
=======
		window.location.href = "/logout";
>>>>>>> ab43d4d00231221a0cc5e6ed4ece2b863336a9e2
}


if(window.location.pathname === "/CodeEnigma/easy/E1/cpp")
{
<<<<<<< HEAD
window.location.href = "/logout";

setTimeout(function() {
$('#wrongModal').modal('hide');
=======
// setInterval(function() {
  $('#wrongModal').modal('hide');
>>>>>>> ab43d4d00231221a0cc5e6ed4ece2b863336a9e2
	document.getElementById("runButton").click();

	setTimeout(function() {
    document.getElementById("submitButton").click();
  }, 10000);

  setTimeout(function() {
    window.location.reload(true);
  }, 20000);

<<<<<<< HEAD
},5000);

}

=======
// },30000);

}
>>>>>>> ab43d4d00231221a0cc5e6ed4ece2b863336a9e2
*/
