# CodeEnigma:
It is a web application which was used for hosting the Code Enigma Season 3 (2018), a coding competition which is being held in LNCT Bhopal annually for the last three years (2016-18).

## Problems in first two seasons:
* Obsolete Testing of Code :  The volunteers had to go to each contestant and manually check their code with the test cases however all the test cases could not be covered because it was a time consuming process. Which lead to false acceptance of invalid code.
* Obsolete Ranking System : There was no time monitoring due to which the rank of the contestant couldn't be decided if they have solved the same number of questions. Also posting the list of contestants in the increasing order of rank was a problem because they had to sort the list of contestants manually.
* Loose Timing Constraints : Even when the competition ends, several contestants could still code secretly by avoiding the sight of the volunteers until the volunteer tests their code.
* Wastage of Papers : The questions were printed on a papers for each contests while incurred additional printing charges and wastage of paper.

## How this web application helps:
* Testing the Code : On RUN : Contestant's code is tested against Sample Test cases which are visible (Input, Output and Expected Output) to the contestants.On SUBMIT : Contestant's code is tested against Hidden Test cases which are not visible to the contestants. Also contestants can run their code against cutom inputs (which they have to provide themselves), for the debugging purposes.
* Ranking System : While submitting the code, the server keeps a record of the last submission time (in miliseconds) for each contestants. Hence the contestants could be ranked properly if they have same score. However in a very unlikely situation where two contestants have the same score and last submission time then, they are ranked according to their time of registration for the event (As the ids are given as CE001, CE002, ... at the time of registration).
* Strict Timings :  The timings of the Competition will be saved in the database, hence the server will not allow any contestant to submit their code before the competition starts or after the competition ends.	
* No Papers Required : Since the competition is held online, there is no need to print the questions on the paper.


# Installation Steps:
1. Clone or Download the repository.
2. Open terminal or command prompt in the downloaded directory.
3. Install Node.js and MongoDB.
4. Install all the dependecies listed in package.json file with `npm install`.
5. Import the database:
	- sudo mongoimport --db enigmadb --collection users --file EXPORT/usersExport.json
	- sudo mongoimport --db enigmadb --collection questions --file EXPORT/questionsExport.json
	- sudo mongoimport --db enigmadb --collection contest --file EXPORT/contestExport.json
5) Run MongoDB Server using `mongod`.
6) Run the project by this command `npm start`.
7) Open http://localhost/CodeEnigma/login to login.

## Route Structures:
For Contestants:
1. http://localhost/CodeEnigma/login
2. http://localhost/CodeEnigma/instructions
3. http://localhost/CodeEnigma/results
4. http://localhost/CodeEnigma/[difficulty]
5. http://localhost/CodeEnigma/[difficulty]/[questionID]/[language]
	- difficulty : easy, medium or hard
    - questionID : A, B, C, etc.
    - languageCode : c, cpp, java, python2 or python3

For Adminstrator, all the above routes and these:
1. http://localhost/CodeEnigma/config
2. http://localhost/CodeEnigma/insert

# Screenshots:

