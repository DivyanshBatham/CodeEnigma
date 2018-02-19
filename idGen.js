// console.log("use enigmadb;",'\n');

// console.log("db.users.remove({type:'contestant'});",'\n');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// CE4_001
// CE4[001]
// CE4<001>
// 001@CodeEnigma

var ids = ["CE059", "CE030", "CE090", "CE020", "CE057", "CE033", "CE015", "CE085", "CE018", "CE089", "CE047", "CE113", "CE005", "CE064", "CE022", "CE087", "CE130", "CE109", "CE084", "CE102", "CE086", "CE125", "CE119", "CE048", "CE083", "CE075", "CE002", "CE001", "CE122", "CE060", "CE124", "CE117", "CE053", "CE008", "CE103", "CE126", "CE007", "CE133", "CE071", "CE052", "CE123", "CE054", "CE110", "CE106", "CE038", "CE044", "CE031", "CE042", "CE132", "CE023", "CE063", "CE115", "CE037", "CE006", "CE080", "CE046", "CE049", "CE043", "CE127", "CE114", "CE068", "CE065", "CE128", "CE076", "CE118", "CE012", "CE116", "CE074", "CE016", "CE062", "CE073", "CE028", "CE104", "CE011", "CE040"];
console.log( ids.sort( (a,b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]) ) );
for( var i = 0; i<ids.length; i++ ) // i is number of teams
{
    var password = "";
    for(var j=1; j<=6; j++)   // Six letter password.
        password += letters[getRandomInt(26)];

    var code = "Best of luck for CodeEnigma Season 3".replace(/ /g,'').split('').join('');

    // console.log(password + " (password)");
    var _password = password.split('').map( c => ("00000"+letters.indexOf(c).toString(2)).slice(-5) ).join('');
    // console.log(_password + " (_password)");
    // console.log(code + " (code)");

    var adjuster = 0;
    function replacer(match, offset ) {
      code = code.slice(0,offset+adjuster) + "<B>"+ code.slice(offset+adjuster, offset+adjuster+match.length) + "</B>" + code.slice(offset+adjuster+match.length) ;
      adjuster += 7;
      return "@@@@@@@@@@@@@@@@@@@@".slice(-match.length);
    }

    _password = _password.replace(/1+/g,replacer);
    // console.log(_password + " (_password) [AFTER]");
    // console.log(code + " (code) [AFTER]\n");

    // var temp = ("CE"+("000"+i).slice(-3));
    var temp = ids[i];
    var password = "CE_" + ids[i].match(/\d+/)[0];
    // var c = `db.users.insert( { id: "${temp}", type: "contestant", pass: "${password}", code:"${code}", score : 0, defaultLanguage: "c", solvedQuestions : { easy : [], medium : [], hard : [] }, savedCodes : { easy : [], medium : [], hard : [] } , lastSubmissionDisplay : "-", lastSubmission : 0 } );`
    var c = `db.users.insert( { id: "${temp}", type: "contestant", pass: "${password}", code:"${code}", score : 0, defaultLanguage: "c", solvedQuestions : { easy : [], medium : [], hard : [] }, savedCodes : { easy : [], medium : [], hard : [] } , lastSubmissionDisplay : "-", lastSubmission : 0 } );`

    // console.log(c,'\n');
}



// Day 1 :


var codes = [];

// for( var numCodes = 1; numCodes<=20; numCodes++ )
// {
//     var code = "";
//     for(var i=1; i<=6; i++)
//     {
//         code += Letters[getRandomInt(26)];
//     }
//     codes.push(code);
// }
//
// console.log(codes);
