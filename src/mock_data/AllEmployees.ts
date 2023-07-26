const allEmployees = [
    {
      "_id": "6486ca7c9004c2e2e44ab264",
      "email": "admin@gmail.com",
      "password": "$2a$10$0/HglA3FNBAygHjq56Pyk.T0a70iDhvN0yrysEnWRJENeNsav1zdW",
      "fullName": "Luke Norris",
      "availability": {
        "0": {
          "start": "09:00",
          "end": "16:20"
        }
      },
      "payRate": 25.99,
      "roles": [2001, 5150],
      "jobTitle": "",
      "createdAt": "2023-06-12T07:34:20.502Z",
      "updatedAt": "2023-07-13T23:19:38.761Z",
      "token": ""
    },
    {
      "_id": "6486caa69004c2e2e44ab268",
      "email": "luke@gmail.com",
      "password": "$2a$10$ylKBGdpnvwQ6wmkffkHtV.LxtMSAjYT0.faIn0/XizUHjC4uWKFYW",
      "fullName": "Luke Norris",
      "availability": {
        "0": {
          "start": "06:00",
          "end": "17:30"
        },
        "1": {
          "start": "05:00",
          "end": "12:00"
        }
      },
      "payRate": 25.55,
      "roles": [2001],
      "jobTitle": "",
      "createdAt": "2023-06-12T07:35:02.236Z",
      "updatedAt": "2023-06-27T16:15:38.650Z",
      "token": ""
    },
    {
      "_id": "648923cbef2866f2aedc1d9e",
      "email": "jef112221fK@gmail.com",
      "password": "$2a$10$lFAtif9GkHC5jloQXXlKsOUjyPv83WJmj2gB6tTZU.LuC1ZG/S./m",
      "fullName": "Jeff Krobus",
      "availability": {
        "0": {
          "start": "10:24",
          "end": "18:26"
        }
      },
      "payRate": 25.55,
      "roles": [2001, 2442],
      "jobTitle": "Software Engineer",
      "createdAt": "2023-06-14T02:19:55.797Z",
      "updatedAt": "2023-06-27T12:24:27.967Z",
      "token": ""
    },
    {
      "_id": "648bad4f0bca22c2dbd1bf2d",
      "email": "testAvail@gmail.com",
      "password": "$2a$10$zUarPhN5MASWDrnDryz4XOPGXM3dI8Gnab1ny7/JdiyWuMvIETE9K",
      "fullName": "available Krobus",
      "availability": {
        "0": {
          "start": "09:30",
          "end": "17:00"
        },
        "1": {
          "start": "08:30",
          "end": "16:30"
        },
        "3": {
          "start": "18:54",
          "end": "23:55"
        }
      },
      "payRate": 25.54,
      "roles": [2001],
      "jobTitle": "Soft",
      "createdAt": "2023-06-16T00:31:11.647Z",
      "updatedAt": "2023-06-19T06:49:06.503Z",
      "token": ""
    },
    {
      "_id": "649008528b00540097f8bb12",
      "email": "asd@asd.com",
      "password": "$2a$10$WuZJU90zSCuLNrsgIj8Bj.pMagxb7ho.DtopTkpC7SoCfhgTUYCkO",
      "fullName": "a2",
      "availability": {
        "0": {
          "start": "06:09",
          "end": "17:09"
        },
        "1": {
          "start": "15:00",
          "end": "17:00"
        },
        "4": {
          "start": "09:00",
          "end": "12:00"
        }
      },
      "payRate": 25.55,
      "roles": [2001, 2442],
      "jobTitle": "Dooer",
      "createdAt": "2023-06-19T07:48:34.038Z",
      "updatedAt": "2023-06-19T23:17:58.784Z",
      "token": ""
    },
    {
      "_id": "649009348b00540097f8bb1d",
      "email": "pee@gmail.com",
      "password": "$2a$10$y8ohqwJOv/MEan0nYyrsKuf/vIsY7sOyiAfmTVTT3jk6yPUYCGSAy",
      "fullName": "Pee Div",
      "availability": {
        "0": {
          "start": "06:00",
          "end": "21:00"
        },
        "2": {
          "start": "12:00",
          "end": "15:00"
        },
        "4": {
          "start": "00:00",
          "end": "02:00"
        }
      },
      "payRate": 400.22,
      "roles": [2001],
      "jobTitle": "King coffee man",
      "createdAt": "2023-06-19T07:52:20.265Z",
      "updatedAt": "2023-06-19T23:21:50.440Z",
      "token": ""
    },
    {
      "_id": "649adba08cda7885be4a2741",
      "email": "test@gmail.com",
      "password": "$2a$10$n4AY43Xl2fcDAZTKZ8uqBOK3FA/WW.pQqNor/iK3yiqiWjyI9SeBm",
      "fullName": "available Krobus",
      "availability": {
        "0": {
          "start": "09:00",
          "end": "17:00"
        },
        "1": {
          "start": "08:30",
          "end": "16:30"
        }
      },
      "payRate": 25.55,
      "roles": [2001, 5150],
      "jobTitle": "Software Engineer",
      "createdAt": "2023-06-27T12:52:48.789Z",
      "updatedAt": "2023-06-27T12:52:48.789Z",
      "token": ""
    },
    {
      "_id": "649b4c20b242c0c6c0447a91",
      "email": "2@gmail.com",
      "password": "$2a$10$BjiCEyZc9fvxs.rmuQWpMO1AO5f9Dauv8m13To.KoDQU/oLdHVaJ.",
      "fullName": "testasdhadwqdjqdqdqwdqddqdq",
      "availability": {
        "0": {
          "start": "09:00",
          "end": "17:00"
        }
      },
      "payRate": 25.69,
      "roles": [2001],
      "jobTitle": "floor clearner",
      "createdAt": "2023-06-27T20:52:48.077Z",
      "updatedAt": "2023-06-27T20:53:35.988Z",
      "token": ""
    },
    {
      "_id": "649b4cd4b242c0c6c0447aa8",
      "email": "5@gmail.com",
      "password": "$2a$10$xf3NHNPgIBflHo683VoXGu8zeA74SgaEvwD/UMOPxQIB2doLX/tOO",
      "fullName": "te2222",
      "availability": {},
      "payRate": 32.55,
      "roles": [2001],
      "jobTitle": "admin",
      "createdAt": "2023-06-27T20:55:48.846Z",
      "updatedAt": "2023-07-24T03:49:36.230Z",
      "token": ""
    },
    {
      "_id": "64a48d4dbe2edd27394fe16e",
      "email": "email@gmail.com",
      "password": "$2a$10$svd9yOI.sWfPHEXUVKeUNueVF6StMLsF2m6cEvA96pXR5GDSBj8EK",
      "fullName": "321",
      "availability": {
        "0": {
          "start": "09:00",
          "end": "17:00"
        },
        "1": {
          "start": "12:00",
          "end": "17:00"
        },
        "2": {
          "start": "15:00",
          "end": "20:09"
        }
      },
      "payRate": 30,
      "roles": [2001],
      "jobTitle": "testJob",
      "createdAt": "2023-07-04T21:21:17.256Z",
      "updatedAt": "2023-07-04T21:21:31.577Z",
      "token": ""
    },
    {
      "_id": "64a8892f7c5268ec8174a847",
      "email": "payrate@gmail.com",
      "password": "$2a$10$25.mGb8MA2ddhYlKFPygU.Z1UH42RQGWMadJsnIDpkwtFAM5tH87W",
      "fullName": "astird",
      "availability": {
        "0": {
          "start": "09:00",
          "end": "14:00"
        },
        "1": {
          "start": "14:00",
          "end": "21:00"
        }
      },
      "payRate": 25.55,
      "roles": [2001],
      "jobTitle": "testjobtitle",
      "createdAt": "2023-07-07T21:52:47.476Z",
      "updatedAt": "2023-07-07T21:52:47.476Z",
      "token": ""
    },
    {
      "_id": "64a889681d25d173b5629e2e",
      "email": "ree@gmail.com",
      "password": "$2a$10$f6FCox.0oY9k/NXJbIYaCOS65y7qSUlXLt3ybu2YwcceCR4QPJph6",
      "fullName": "astrr",
      "availability": {
        "0": {
          "start": "09:00",
          "end": "12:00"
        }
      },
      "payRate": 55.21,
      "roles": [2001],
      "jobTitle": "newjobtitle",
      "createdAt": "2023-07-07T21:53:44.279Z",
      "updatedAt": "2023-07-13T23:20:30.184Z",
      "token": ""
    }
  ]

export default allEmployees