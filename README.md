**AUTHORIZATION/ AUTHENTICATION**

AUTH **POST**: http://localhost:3001/auth/login

REQUEST

```
{
    "email":"marsh@gmail.com",
    "password":"mallows"
}
```

RESPONSE

```
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODkzMSwiZXhwIjoxNjI0NzUyNTMxfQ.SU9tk3aCzrjLKY29BuJxtFAD7QfUCaeipvPRC416zqY"
}
```

-----

AUTH **POST**: http://localhost:3001/auth/register REGISTERS A USER

REQUEST

```
{
    "username":"california",
    "email":"arnoldT1800@gmail.com",
    "password":"gettodachoppa",
    "passwordRepeat":"gettodachoppa"
}
```

RESPONSE

```
{
    "msg": "User created successfully"
}
```

----

----------



----

----

**USER**

-----------------------------------

USER **GET**: http://localhost:3001/user GETS A USER

REQUEST

Headers:

```
Authorization : "Bearer eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODQ1MSwiZXhwIjoxNjI0NzUyMDUxfQ.rNNjkp1aTAIFP66BaEXA7X-mTNQhw4LPepBbK4Zkyb4"
```

RESPONSE

```
{
    "exp": 0,
    "_id": "60d7951d830a6f13986829bc",
    "username": "test",
    "email": "asdf@gmail.com",
    "createdAt": "2021-06-26T20:59:09.332Z",
    "updatedAt": "2021-06-26T20:59:09.332Z"
}
```

--------

USER **PUT**: http://localhost:8000/user/add-friend SENDS A FRIEND REQUEST FROM USER ACCOUNT

REQUEST

Headers

```
Authorization : "Bearer eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODQ1MSwiZXhwIjoxNjI0NzUyMDUxfQ.rNNjkp1aTAIFP66BaEXA7X-mTNQhw4LPepBbK4Zkyb4"
```



```
{
    "friendId": "60d8d1b4594b2c042856204c",
    "friendName": "ujwalka"
}
```

RESPONSE

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
        ],
        "exp": 0,
        "_id": "60d927a6669ad125fc25c822",
        "username": "testuser",
        "email": "testuser@gmail.com",
        "password": "$2a$10$DouUS0K09aI69O6elkFTWO8DdUI1E4EpLwdGO4CpM9z46qSNuJJ.e",
        "createdAt": "2021-06-28T01:36:38.881Z",
        "updatedAt": "2021-06-28T01:38:31.022Z"
    }
}
```

----

USER **PUT**: http://localhost:8000/user/accept-request ACCEPT RECIEVED REQUESTS

REQUEST

Headers:

```
Authorization : "Bearer eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODQ1MSwiZXhwIjoxNjI0NzUyMDUxfQ.rNNjkp1aTAIFP66BaEXA7X-mTNQhw4LPepBbK4Zkyb4"
```

```
{
    "friendId": "60d7951d830a6f13986829bc",
    "friendName": "sancar"
}
```

RESPONSE

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
        "exp": 0,
        "_id": "60d927a6669ad125fc25c822",
        "username": "testuser",
        "email": "testuser@gmail.com",
        "password": "$2a$10$DouUS0K09aI69O6elkFTWO8DdUI1E4EpLwdGO4CpM9z46qSNuJJ.e",
        "createdAt": "2021-06-28T01:36:38.881Z",
        "updatedAt": "2021-06-28T01:38:31.022Z"
    }
}
```

-----

USER **PUT**: http://localhost:8000/user/decline-request DECLINE FRIEND REQUESTS

REQUEST

Headers:

```
Authorization : "Bearer eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODQ1MSwiZXhwIjoxNjI0NzUyMDUxfQ.rNNjkp1aTAIFP66BaEXA7X-mTNQhw4LPepBbK4Zkyb4"
```



```
{
//sancar's id
    "friendId": "60d7951d830a6f13986829bc"
}
```

RESPONSE

```
//Declining the request in charcarr's account
{
    "user": {
        "friendsList": [],
        "friendRequests": [
        ***sancar's request removed***
        ],
        "pendingRequests": [],
        "exp": 0,
        "_id": "60d927a6669ad125fc25c822",
        "username": "testuser",
        "email": "testuser@gmail.com",
        "password": "$2a$10$DouUS0K09aI69O6elkFTWO8DdUI1E4EpLwdGO4CpM9z46qSNuJJ.e",
        "createdAt": "2021-06-28T01:36:38.881Z",
        "updatedAt": "2021-06-28T01:38:31.022Z"
    }
}

```



--------

-----------



------

--------

**GAME**

-------

GAME **GET**: http://localhost:8000/game  CREATES A GAME

REQUEST

Headers:

```
Authorization : "Bearer eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkNzk1MWQ4MzBhNmYxMzk4NjgyOWJjIn0sImlhdCI6MTYyNDc0ODQ1MSwiZXhwIjoxNjI0NzUyMDUxfQ.rNNjkp1aTAIFP66BaEXA7X-mTNQhw4LPepBbK4Zkyb4"
```

RESPONSE

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

Headers:

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

RESPONSE:

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

