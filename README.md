**AUTHORIZATION/ AUTHENTICATION**

AUTH **POST**: http://localhost:3001/auth/login

REQUEST

```
{
    "email":"marsh@gmail.com",
    "password":"mallows"
}
```

RESPONSE: token

```
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODkzMSwiZXhwIjoxNjI0NzUyNTMxfQ.SU9tk3aCzrjLKY29BuJxtFAD7QfUCaeipvPRC416zqY"
}
```

-----

AUTH **POST**: http://localhost:3001/auth/register REGISTERS A USER

REQUEST

```
{
    "username":"california",
    "email":"arnoldT1800@gmail.com",
    "password":"gettodachoppa",
    "passwordRepeat":"gettodachoppa"
}
```

RESPONSE: msg

```
{
    "msg": "User created successfully"
}
```

----

----

**USER**

-----------------------------------

USER **GET**: http://localhost:3001/user GETS A USER

REQUEST

```
Authorization : "Bearer eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODQ1MSwiZXhwIjoxNjI0NzUyMDUxfQ.rNNjkp1aTAIFP66BaEXA7X-mTNQhw4LPepBbK4Zkyb4"
```

RESPONSE: user profile

```
{
user: {
    "friendsList": [],
    "friendRequests": [...],
    "pendingRequests": [],
    "exp": 0,
    "currentLevel": 1,
    "highestScore":0,
    "gameInvites": []
    "_id": "60d8d1b4594b2c042856204c",
    "username": "sancar",
    "email": "svyaca@gmail.com",
    "createdAt": "2021-06-27T19:29:56.594Z",
    "updatedAt": "2021-06-28T01:38:31.067Z"
}
}
```

---

USER **GET**: http://localhost:3001/:username GETS A USER BY USERNAME

REQUEST

```
Authorization : "Bearer eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODQ1MSwiZXhwIjoxNjI0NzUyMDUxfQ.rNNjkp1aTAIFP66BaEXA7X-mTNQhw4LPepBbK4Zkyb4"
```

RESPONSE: user profile

```
{
user: {
    "friendsList": [],
    "friendRequests": [...],
    "pendingRequests": [],
    "exp": 0,
    "_id": "60d8d1b4594b2c042856204c",
    "username": "sancar",
    "email": "svyaca@gmail.com",
    "exp": 12000,
    "currentLevel": 32,
    "highestScore":1000000,
    "gameInvites": []
    "createdAt": "2021-06-27T19:29:56.594Z",
    "updatedAt": "2021-06-28T01:38:31.067Z"
}
}
```

--------

USER **PUT**: http://localhost:8000/user/add-friend SENDS A FRIEND REQUEST FROM USER ACCOUNT

REQUEST

```
Authorization : "Bearer eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODQ1MSwiZXhwIjoxNjI0NzUyMDUxfQ.rNNjkp1aTAIFP66BaEXA7X-mTNQhw4LPepBbK4Zkyb4"
```

```
{
    "friendId": "60d8d1b4594b2c042856204c",
    "friendName": "ujwalka"
}
```

RESPONSE: updated user profile

```
//Sending request from sancar's account to ujwalka
{
    "user": {
        "friendsList": [],
        "friendRequests": [],
        "pendingRequests": [
            {
                "id": "60d8d1b4594b2c042856204c",
                "username": "ujwalka"
            },
            //Previously sent request from sancar to charcarr
             {
                "id": "60d8d1b4590000000006204a",
                "username": "charcarr"
            },
        ],
        "exp": 12220,
        "_id": "60d927a6669ad125fc25c822",
        "username": "testuser",
        "email": "testuser@gmail.com",
        "currentLevel": 32,
        "highestScore":1000000,
        "gameInvites": []
        "password": "$2a$10$DouUS0K09aI69O6elkFTWO8DdUI1E4EpLwdGO4CpM9z46qSNuJJ.e",
        "createdAt": "2021-06-28T01:36:38.881Z",
        "updatedAt": "2021-06-28T01:38:31.022Z"
    }
}
```

----

USER **PUT**: http://localhost:8000/user/accept-request ACCEPT RECIEVED REQUESTS

REQUEST

```
Authorization : "Bearer eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODQ1MSwiZXhwIjoxNjI0NzUyMDUxfQ.rNNjkp1aTAIFP66BaEXA7X-mTNQhw4LPepBbK4Zkyb4"
```

```
{
    "friendId": "60d7951d830a6f13986829bc",
    "friendName": "sancar"
}
```

RESPONSE: updated user profile

```
// Accepting sancar's request in ujwalka's account
{
    "user": {
        "friendsList": [
         	{
                "id": "60d8d1b4594b2c042856204c",
                "username": "sancar"
            }
        ],
        "friendRequests": [
        	***moved to friends list***
        ],
        "pendingRequests": [],
        "exp": 12220,
        "_id": "60d927a6669ad125fc25c822",
        "username": "testuser",
        "email": "testuser@gmail.com",
         "currentLevel": 32,
         "highestScore":1000000,
         "gameInvites": []
        "password": "$2a$10$DouUS0K09aI69O6elkFTWO8DdUI1E4EpLwdGO4CpM9z46qSNuJJ.e",
        "createdAt": "2021-06-28T01:36:38.881Z",
        "updatedAt": "2021-06-28T01:38:31.022Z"
    }
}
```

-----

USER **PUT**: http://localhost:8000/user/decline-request DECLINE FRIEND REQUESTS

REQUEST

```
Authorization : "Bearer eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODQ1MSwiZXhwIjoxNjI0NzUyMDUxfQ.rNNjkp1aTAIFP66BaEXA7X-mTNQhw4LPepBbK4Zkyb4"
```

```
{
//sancar's id
    "friendId": "60d7951d830a6f13986829bc"
}
```

RESPONSE: updated user profile

```
//Declining the request in charcarr's account
{
    "user": {
        "friendsList": [],
        "friendRequests": [
        ***sancar's request removed***
        ],
        "pendingRequests": [],
        "exp": 12220,
        "_id": "60d927a6669ad125fc25c822",
        "username": "testuser",
        "email": "testuser@gmail.com",
        "currentLevel": 32,
        "highestScore":1000000,
        "gameInvites": []
        "password": "$2a$10$DouUS0K09aI69O6elkFTWO8DdUI1E4EpLwdGO4CpM9z46qSNuJJ.e",
        "createdAt": "2021-06-28T01:36:38.881Z",
        "updatedAt": "2021-06-28T01:38:31.022Z"
    }
}

```

------

--------

**GAME**

-------

GAME **GET**: http://localhost:8000/game  CREATES A GAME

REQUEST

```
Authorization : "Bearer eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODQ1MSwiZXhwIjoxNjI0NzUyMDUxfQ.rNNjkp1aTAIFP66BaEXA7X-mTNQhw4LPepBbK4Zkyb4"
```

RESPONSE: newly created single player game

```
{
    "game": {
        "active": true,
        "currentScore": 0,
        "locations": [
            {
                "images": [
                	//imageURLs
                    ...
                ],
                "_id": "60d8ca06aeae02457ccc58ac",
                "title": "Toronto",
                "latitude": "43.653",
                "longitude": "-79.383",
                "createdAt": "2021-06-27T18:57:10.450Z",
                "updatedAt": "2021-06-27T18:57:10.450Z"
            },
            {...}
        ],
        "currentTurn": 1,
        "guesses": [],
        "_id": "60d92e08669ad125fc25c823",
        "userID": "60d927a6669ad125fc25c822",
        "createdAt": "2021-06-28T02:03:52.983Z",
        "updatedAt": "2021-06-28T02:03:52.983Z"
    }
}
```

-----

GAME **PUT**: http://localhost:8000/game/update UPDATES GAME STATE, TURNS "ACTIVE" TO "FALSE" AFTER THE LAST TURN

REQUEST

```
Authorization : "Bearer eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODQ1MSwiZXhwIjoxNjI0NzUyMDUxfQ.rNNjkp1aTAIFP66BaEXA7X-mTNQhw4LPepBbK4Zkyb4"
```

```
{
// Score from previous turn, ***NOT cumulative score***
 "turnScore":4001,

 "gameID": "60d92e08669ad125fc25c823",

 //Guess from previous turn
 "userGuess": {"lat":12.341, "lng":-124.234}
}
```

RESPONSE: updated single player game

```
{
    "game": {
        "active": true,
        "currentScore": 4001,
        "locations": [... ref previous example],
        "currentTurn": 2,
        "guesses": [
            {
                "lat": 12.341,
                "lng": -124.234
            }
        ],
        "_id": "60d92e08669ad125fc25c823",
        "userID": "60d927a6669ad125fc25c822",
        "createdAt": "2021-06-28T02:03:52.983Z",
        "updatedAt": "2021-06-28T02:11:43.657Z"
    }
}
```

---

GAME GET: http://localhost:8000/game/multiplayer CREATES A MULTIPLAYER GAME

REQ

```
Authorization : "Bearer eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODQ1MSwiZXhwIjoxNjI0NzUyMDUxfQ.rNNjkp1aTAIFP66BaEXA7X-mTNQhw4LPepBbK4Zkyb4"
```

RES: newly created game

```
{
    "game": {
        "active": true,
        "isMultiplayer":true,
        "userID":"60asdfwerasdf",
        "currentScore": 0,
        "locations": [... ref previous example],
        "currentTurn": 1,
        "guesses": [],//Guesses have no shape
        multiplayerGameID:"60d92e08669ad125fc25c823" //gameID when the game was created, common to all players
        "_id": "60d92e08669ad125fc25c823",
        "userID": "60d927a6669ad125fc25c822",
        "createdAt": "2021-06-28T02:03:52.983Z",
        "updatedAt": "2021-06-28T02:11:43.657Z"
    }
}
```

---

GAME POST: http://localhost:8000/game/multiplayer/send-invite SENDS INVITE

REQ

```
Authorization : "Bearer eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODQ1MSwiZXhwIjoxNjI0NzUyMDUxfQ.rNNjkp1aTAIFP66BaEXA7X-mTNQhw4LPepBbK4Zkyb4"
```

```
//from sancar's to kipvla
{
"gameID": 60d92e08669ad125fc25c823 //Same as created gameID
"userToInviteID": 60d7951d830a6f13986829bc //charcarr's id (has to be in the friend's list to be able to send invite)
}
```

RES: msg

```
{ msg: 'Game invitation sent!' }
```

---

GAME POST: http://localhost:8000/game/multiplayer/accept-invite ACCEPT INVITE

REQ: from kipvla's account

```
Authorization : "Bearer eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODQ1MSwiZXhwIjoxNjI0NzUyMDUxfQ.rNNjkp1aTAIFP66BaEXA7X-mTNQhw4LPepBbK4Zkyb4"
```

```
{
gameID: "60d92e08669ad125fc25c823"
}
```

RES: instance of newly created game

```
{
    "game": {
        "active": true,
        "isMultiplayer":true,
        "userID":"60d7951d830a6f13986829bc",
        "currentScore": 0,
        "locations": [... ref previous example],
        "currentTurn": 1,
        "guesses": [], //Guesses have no shape
        multiplayerGameID:"60d92e08669ad125fc25c823" //gameID when the game was created, common to all players
        "_id": "60d92e08669ad125fc2asdf", //player's game instance
        "userID": "60d927a6669ad125fc25c821", //kipvla's account
        "createdAt": "2021-06-28T02:03:52.983Z",
        "updatedAt": "2021-06-28T02:11:43.657Z"
    }
}
```

---

GAME POST: http://localhost:8000/game/multiplayer/decline-invite DECLINE INVITE

REQ: from charcarr's account

```
Authorization : "Bearer eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODQ1MSwiZXhwIjoxNjI0NzUyMDUxfQ.rNNjkp1aTAIFP66BaEXA7X-mTNQhw4LPepBbK4Zkyb4"
```

```
{
"gameID" :  60d92e08669ad125fc25c823
}
```

RES: msg

```
{ msg: 'Invitation declined!' }
```

---

GAME PUT: http://localhost:8000/game/multiplayer/update UPDATES MULTIPLAYER GAMES

REQ

```
Authorization : "Bearer eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODQ1MSwiZXhwIjoxNjI0NzUyMDUxfQ.rNNjkp1aTAIFP66BaEXA7X-mTNQhw4LPepBbK4Zkyb4"
```

```
{
"turnScore":3000,
"gameID":60d92e08669ad125fc25c823,
"userGuess": {
            lat: 132
            lng:123
            dist:1234
            ...
            } //userguess does not have a shape yet send anything uniform
}

```

RES: updated game

```
{
    "game": {
        "active": true,
        "isMultiplayer":true,
        "userID":"60d7951d830a6f13986829bc",
        "currentScore": 3000,
        "locations": [... ref previous example],
        "currentTurn": 2,
        "guesses": [
        	{
            "lat": 132
            "lng":123
            "dist":1234
            ...
            }
        ], //Guesses have no shape
        multiplayerGameID:"60d92e08669ad125fc25c823" //gameID when the game was created, common to all players
        "_id": "60d92e08669ad125fc25asdf", //player's game instance
        "userID": "60d927a6669ad125fc25c821", //kipvla's account
        "createdAt": "2021-06-28T02:03:52.983Z",
        "updatedAt": "2021-06-28T02:11:43.657Z"
    }
}
```

---

GAME GET: http://localhost:8000/game/multiplayer/results/:gameID GETS AN ARRAY OF THE MULTIPLAYER GAME INSTANCES FROM ALL PLAYERS

REQ

```
Authorization : "Bearer eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODQ1MSwiZXhwIjoxNjI0NzUyMDUxfQ.rNNjkp1aTAIFP66BaEXA7X-mTNQhw4LPepBbK4Zkyb4"
```

```
{
"gameID": "60d92e08669ad125fc25c823" //multiplayer gameId
}
```

RES: Array of all multiplayer game instances

```
{
	results: [
	{
    "game": {..."currentScore": 3002,
			 ..."userID": "60d927a6669ad125fc25c821", //kipvla's account ...}
	},
	{
    "game": {..."currentScore": 3005,
			 ..."userID": "60d927a6669ad125fc25c823", //charcarr's account ...}
	},
	{
    "game": {..."currentScore": 3001,
			 ..."userID": "60d927a6669ad125fc25c834", //sancarr's account ...}
	},
	{
    "game": {..."currentScore": 200,
			 ..."userID": "60d927a6669ad125fc25cas4", //ujwalka's account ...}
	},
	]
}
```

