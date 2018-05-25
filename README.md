
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

## Route Structure:
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



## Screenshots:
Login:
![Login 1of2](https://lh3.googleusercontent.com/_RhMwdaIzFCWSYawgYATNTbAziX2cGYwAFqRpQaMHxFgXhsnqQmF_DZ201CmTy0lpEeNY9I20XaeR6Fw3vtQfn92HBOlccYj0LDk6BHLOVrKTtxRU9oZfZeRNvnqSPEAEbCPJLefoQguRxScu7I6eZK0Yk3Qo5dp4EiAbAtAuOiTBjf-DoQIJYHY5T81xUUG_KkYG6EMFADE5U4yJBKxxTSuy7ciaUB79HqwnyriSv3zFgyXWpL0bvq_Gka8pj5NSy1gDC26cX6kDmfXcc-RhXcmEwDraMlZ9nH0PlRfqr4NikzVzsi7GTSEJoEY5L0AwrKPzaQvFp5p7Ssdcyow-sONDHUonVAtyF3kaILWiNtNoViKpy-pTD0kGm_JBND0OEo2mmqQeTBz0hrAeQTnq8HX2_vPdaUVZkrJRP6adIgy2dJL1FQax8NOuFRGVAdIkukozXMyxfN2KvJwmeJ-gJLYejCT0LOHB1dH1a5keLB59eyfJuNQO2S57E6G3J3tuKkXGRn1ywWwJOOOOcyc07ghmJfjCADfczOyFH7GUsXpR6a5it3eW8cCVhlntlenmOJE73odVDcPWUAG3nfycHVHBQ1glXiVKByaN3I=w1600-h790-no)

![Login 2of2](https://lh3.googleusercontent.com/2L9KnLFaTz4IDCVgrntigSfL_0_y4J68mmDKxer97oRLEIsNqjPVnGOh-XFSQgl4hlK08ko8Po6PgNdr0OaVdQO9f_cw5EGH9290hPINq4NPiicyq7DZYKmCYJ55qMGDKDwD-eKsMtq9gD3o0jkq29F0DEDvG7QzboiSJTe5GOMZG_sVa3fX8EI-ODMjpbSUYjGgnOIiSH0iVHhiGpmYrqMRr2pJckTttNYO33BU7oPiJ1YTQE2GvESAyCVS8taPy1K5CVYY3_CaTJckQr1EosmczO5fgywDL3KoRfs75KnR5YdufokeFu0f8J8uVKLvB3kp1gy1AwK54f0WIe2WQnaZWWpXRbNk0Mf1sYvhy57xpkmadZOknWuARNK3VmG1z5prTmXRQSWI5e3n0M_Ykp5atz3a8-Gi7R2gQcFVvRmxgur5MuZjP8wEI1PGnMGajXTiistk3Uq_x3lORb5XS39Cfp8DsY_ecU31KOn6Rjoj3DF0JKV7se2pJge8AvTmnWNCKl4dwrKSt6FX-IjkSIZTmyn7DUXWpDhR9qAOdtaes7MgralwGjfBXlJnQnjVmkWae0VKwpNuJGiJbnGUH49XuGwEaGeX_p-2YAE=w1600-h790-no)

Instructions:
![Instructions](https://lh3.googleusercontent.com/-6dQh27YzCcEnoz3Y4PQ1LwI1J0w2icFAIKXhZmWiJ4ogP4MglhuoYTZbq9HkTr8WxFgxBGgNGxyJ83gX1AoxMIsj79h-B-oKW4A2TqMeOPp9lOiEYi2WeZHuwjRWckqIFO1oTFn5ZeMWYeA1gsBnToFYnG1SNFzQpbBQWeod3pr8UmvZuaOZPFxfduZBSawE1OGUTfDrbUQutTwHd8DZUTDmCptVAn3hhECN8mvGOhnMD1xH8A0bFai-sn0AbdD8wK23mwRKnm8fDKPLUXsZ0qBIxJDls3nYw2iSjLUVOgBCt7U2QR1CbSmxDOl86jjLmle_f8kpgpX5Bpk5-2SURxFqsFDu1omjC9hLaWiRmEUsCbTp-zBdcgGfrYkPPGvVRiuLER0n6FXHSltwmtnOx5U9W2U1ZmNEsTjpUmTeapLyhORklFcz1-ADWhpsrS99GYpNRlLPlYcpyBszM-ttF2hFf5nuE1-opRDL1PfVgB1oEd-H_weEbtkbl5CLzsoBs9kOagCbvnnA-os75oVdhVMeP4-C_75Sofyudhqa7hbjuRCdXXPbSSKfqouRQrLF0hIoyBkM5wO_WjEhacKrammKK9_sKWwxcfQyAw=w1600-h790-no)

Dashboard:
![Dashboard](https://lh3.googleusercontent.com/kQgIGLQb8UBU7gU2ve3_1u20xy8YwC-T14-gzV4xE1HQSS2civ2h7FdiCJ7JFWFF--igStJZpnihQuiRNHCB1HceWDgVUtQ1U092lFNm8ksf1-y3Y6RsD8vke8zQCbgdDtkvSKuRkHBCyh8jhJ2Yie7ZaCkAfTPNcZVyvc1XP7UjGftqwNOAFo5W5_7jDd4hGNYaPEJVvS2O7qKUDXAS3gxSBhHSi0DK-lbC6cJbPROmazRKg3zK74251_Islav1i6nCExKbMoJ3bNn8vaA8SfggBbQCVDYtDgzrclq7ntJ6bTmJGSs1hpdfb11T-sqbMJ6C3f6LCct6OWb-LW8Ox0UAbv_5zArzTuKXl8KJnROsYHgV9bZHsAiK9XrRMZ8-MFU753nOzcqCf4Dg3wYx-psU2yPJHnIoNH56ETb-CpdDNZy-x7xhSAAjHrT3I31PwyIWR5keQ75mmym7LO8ZBz06WBm7pM-IllH14MPfD9rzXwa0BZHn1x0qyMTQwv1h1QPBLNrUpxQQvt_FH8QLr3ZwFapnuG0Ti5y1yK-O-eDMnKoqhz6u4SHz2Be6M1TzZHdJ6BeM6Scf_-BsuD1YuraY-x7x80iGwKI8AxY=w1600-h790-no)

Editor:
![Editor](https://lh3.googleusercontent.com/wMntSN0KU-S_Kalfzu-CX9C81AxYfWDRFpyMHIbjY8ZdH4fUlp4xirYVsHAzmE3ydIx9irMQJBgeJ5QPOYeFU3lPxxz9JpEHsaNFIO1Z3troEK3VTsE_OPmZVKDSM0ajVcaD7vXUctnVd7TZ4gAEXti1kFeErS9rKo9kX9_JozfkhJILiKSfkzB0jDuJ-oQDy_b5Wkwhlmx4QFHGP7p3vhNnKfWLHlPbQLqwRMbfmb4PGzE56F9NdmPVyRsCFQhrHkYifBgp9jyWXxC57OZ4wpbgH9odnndtazr29OqFLAvKeo7p2to8sJJbVSg5oa3-jZFx4pNt9k2Z8GOp9W7Q0Wwq2fAsUBSFhzJz7G6Cs-xEh2S72Vb855QvLQhXcM8exrE8Fy_UmNkxlrw_rc5WwaCdHxWpIxIo47A8HI1G1K9g5ztUXh6zkTB7jTehE-B4J49qM9AKSg_gZhLEtIMLCUocGIlYSNp_Av5BTncJnrpmI1uO3rZzKNCPSo-iJhBn4YaRh0Gm2ZI86c4lzOi5GtcjKMJruVziR38fn8Ar7y8PvekIuWPLMc8E-wNxvQNmhL7lfMrlXQ-Jyd-Kh63Z0khBwoTxmZvwzuIAhas=w1600-h790-no)

![Editor-Run](https://lh3.googleusercontent.com/3jHqmwluZLl8ESbW6ftPARlBhsC57GyCVbMhilsHQaaPp2eg5WgmjwLqe1U3pshY4gY7ZKeqsVSB999z0cvxY5-rBW4Uvnmymx2fzi7jSkyq_r-N0nNqSNdYULOpLuSQkFhO0NF4Ut9Jyc2bCQSvJXVIvz5xz7NF1jjTb-FcoCCj7OniGDuOfNf1sHiV_V2QwjKiN3AqQnrLyH4BlXTAIRMDyr7-1f-yJ5aLAibei94qIOEXcrpeu8v3gAoMuiMQMdPwLmyATcu-RE1WSgcXm1vBCoUvGf2ogX3b00voLncp1Mi_l7mHxVEjFzFbgeebW00sSfIEZdcWC59PbTFeTqlZpvgsP2Ohgi7W5pCPauqVena5fvK1n_m4U5TsBYXmYxfpI33UUoRj6ObnG__tB4RqNTwD1b8G3T82daTdPUiuttLd-cXIeT8p5fH0dAqdrcSIyKOj29OgpK0RIFbuBOsAnYNOmOnDQ4rtq2M7_z4-soGF26Gn5XxGvdZnl13GbIZ9JcGFFo0s27nvm2mKWR9qq9lnYdU_kW4-_HkqYWVrd7Dmj6yfEbzsJmllJ8UThctP88lJaq3PZeWlu_9gV6b2O6JBKlUCheRE2kk=w1600-h790-no)

![Editor-Submit](https://lh3.googleusercontent.com/VADAr4TppgvJ8AqCFLjJf2U6HK4Zwf6GjEPR4qCPVoqEcJpR8N8hbzOxHFkTuB_o0AtnCIdAp3_I6xawUeC3gqjR7Sqk4yGHJ2LlmDmFDS4KB2jmuiDgv_yDtfS48q0y43O-EKa9eSbeaAClSM-ZqGf6-NEDoSCBZt211dss0bY8vdJLUyi_-2TraAv6Tmj5It4EhKHsRxujn4zMWeRbpOEoXlej1DP9WjY_BJ01XLlypRlWwnN-J9otYVd4Y9YpHIS2iJXlC4G541DRO6LYKyb4FSb_7TzonNvOzvB_BO0vGTunkJ3A3V1G3mtuZT-DE1ttQ2UbK1oXBc2YI7xm8LFGhsZU3VMOvXztg-aqvEL5CsIkUWlWqV5ZaE-fa2V7EYN06KCUbTduBx-88QrB9xmwZDyucZIK4-TgGxihiqNTa3fYExRKAoknvbWP7mbk665XY0UJP5rGe1GfG-cFCLsQ80ob7FOg9vlzHCIIlT1Nto7hAiG5RGWkkF3o9X3Ie26NvRsgVwBoWXTakZxBdOMbw9dlgl4Z6xoxhT6IeHea1OI06lqhyi9PQ8F--mZGObQWQVtQ5YdXdMyaG1Dy1pP76zFc1VV2CKEjqmU=w1600-h790-no)

Results:
![Results](https://lh3.googleusercontent.com/3zrrNJC-q6Ts_fi2nDjpkkI9pUofwv7cVsrTnpQ8yt22icazMJA-25V9CSdGG1kVIhJP5_1HNNkdP7UzfhN0Bb2g2Hp0K-g8zVm9weY09NLE4FLDOh8gWb0R-LCkV0gqszoVG47vhfdAiSxOybSKprIv-fbgT1bOc05kYrvRdnOUlI262KH0-THzR7sLBk5-LGLZ1C19zCGni1e4XxjdJyMpILpaDu48mu9Z21k8YsCD1zQbEDpT7eyP0Ken9YGbHpFqgivBVS7WgtkWDaqgVRkqleQK20HxtdYOvkAmPh0eG_tu3PzpeQE972aihAmXByEGiSaL8-qHAaoUOtegUKvtkENVUyEP5p_PaItu5S1TDMZkeunKIJyJTZyFAIr0K1ebUZ3NCYPCoJyvJAQ1vM76jblBKmbTusgCMcY950v5CgYSBvzbfoSTMJsTKO_QjUcDrwawxyb6y0wjKvM8vYD8aQgUQXZA49Mho9Sp-LA_rmXRIPg_yzNVJ3hzUbvpKUud_Y_Vlpsdg_hUk1B6hgmI6TFeg6jG6Avnc4x3pkVWN9P-b-N-fYRHpaDFbripjkAZx-b2CzoF7J_X8H-tKmc-DsKJ1wz3hc8weeM=w1600-h790-no)

Insertion (Admin):
![Insertion](https://lh3.googleusercontent.com/hcJYcUzyLYkSnjpbwADW9Sg1Xe0boOyxmXtW3JzvibEr2oZMngryNUSLT3qBSvSBZ7MTTU85en5pq7bz5HxV92p5IPA8b_pXQqumI7M85dTFRI1QyirtnhS1sVn7gg2S8D3KAZHWkADcJwgjhKbvNQPYNxLi7MUU0mrVKNdfq_N8UbAIYlgAiNlorEisWgPtsf52EGkTJ-ymIsPE7TWMWhTmqyRNLkx1qBWZ8ob2a92umXR2rSRUvFhVQKRjGmkWPeu7_JM6VUssukujoz1FoboyHtdLRjf38AbCFJT2z-i4Q5jITsPvxYi608VrVQ5d3kdS926_X_fcME2JoF8QRDbjjYdJ_dy67rIoK6u_pgtI4v9rmFfHNmOTF7WfObwuq2Zw4V3Jj1BtqMHuoaqTA2EY6_dT0snFw7_Ue5nPQGlbvZQJLHctf8QnBENMAt0sv_Sagp9KD-A1MXY4UwUaYuLIy51r9cqyACtmtTOqqe1HbgGH_09QEIkzu0WknhT5VjhYwqs5Shr7C-4w_S3OcgjkUH2lt_wAK3o1D3udP3KLlJXLPigPq0rfV5LgJPmmuM6GNZFja-qro98mknW6KYYGHxuM6qEnQn0iPi4=w1600-h790-no)

Configuration (Admin):
![Configuration](https://lh3.googleusercontent.com/4e-DQyHUqL0mFhctLz5dDuLwyeuYZryzwLu_qNaws-fFJ3QauZMZUGOYu-l2KkFTNhWzX2nPUrp-NEd-Y5ZbJAjqX95e6eLDPH8h0BY9RsVzBg0-jGaGsJUc5NZFSd5oDVst7JtDKkn7l8dKGscMtZ5qmOoxzbcvN-y-E7YDZ2s39qWV0g7GNV4Ya4L3kOtf98ZgJoZMtC9jCL8nM0LA-PbXu-fNY266vwSPHUUPAuzfDWb8VoN1aXRHQaLa05PW6M7G2cNrHG3GVy_FX_qUCgT4kX3cLlGEu1f7r9ZBCjj4rx_wDAFQCfu1xW1qF0bbcbSiTu0lIspNCwjP5YUWGxeMPusmHTNEAjgJ6-lzOdqM4Xx_efZMdzwInbaDdTQKZoZNBzHoe1plXXoElSpnrdqI4Pr6A4PFbuAmPOEn2jhI3LemImEla4Fj3PFwYki-wXAhLcl5HHvoiyfDuSQKdumtnQ5KhiAO0673Tg0Ks34xEnzyE1gaDyKMqRTycJPOh9PuaV5P5rdWSK34V5bD1WVozESFBLEvrAsjI5pPzRq8fpBTNAsuM2pYb_CAWWtHlgvZuFAKYfKPVBgj3DvnSV-WQ_-nZKxEOZEGX3A=w1600-h790-no)
