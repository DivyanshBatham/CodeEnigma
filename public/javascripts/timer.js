// Set the date we're counting down to
// var countDownDate = new Date("Nov 3, 2017 15:30:00").getTime();
// console.log(countDownDate);
// Make AJAX Request to get the remaining time and start the timer.

$.ajax({
  type:'POST',
  url:'/getTime',
  dataType:'json',
  success: function(Time){
    // console.log(Time.timeRemaining);
    // console.log("AJAX CALL SENT FOR /getTime")
    if(Time.status=="starting")
      $('#status').html("Competition starts in");
    else if(Time.status=="running")
      $('#status').html("Competition ends in");
    else
      $('#status').html("");

    var time = Time.timeRemaining;

    var days = Math.floor(time / (1000 * 60 * 60 * 24));
    var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((time % (1000 * 60)) / 1000);

    // Output the result in an element with id="timer"
    document.getElementById("timer").innerHTML = hours + "H "
    + minutes + "M " + seconds + "S ";

    var interval = setInterval( increment, 1000);

    function increment(){
        time = time - 1000;
        // console.log(time);

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(time / (1000 * 60 * 60 * 24));
        var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((time % (1000 * 60)) / 1000);

        // Output the result in an element with id="timer"
        document.getElementById("timer").innerHTML = hours + "H "
        + minutes + "M " + seconds + "S ";

        // If the count down is over, write some text
        if (time <= 0) {
          clearInterval(interval);
          document.getElementById("timer").innerHTML = "Competition Ended";
          if(Time.userType!='admin')
          {
            if(Time.status=="starting")
            {
              window.location.href = "/CodeEnigma/easy";
              console.log("REDIRECTED DUE TO timer.js")
            }
            else if(Time.status=="running")
            {
              window.location.href = "/CodeEnigma/results";
              console.log("REDIRECTED DUE TO timer.js")
            }
            else {
              // window.location.href = "/CodeEnigma/results";
            }
            // $('#contestEndedModal').modal('show');
          }
        }
    }

  } //succes
}); // AJAX
