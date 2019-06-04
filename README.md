# Koroibos Challenge

### Using the application

##### Import Script

The application has a script to load in the seed data included with the application. This can be run using the command `npm run import`.

##### GET /api/v1/olympians

The application can return a list of all olympians. A sample response can be found below:

``` JSON
{
  "olympians":
    [
      {
        "name": "Maha Abdalsalam",
        "team": "Egypt",
        "age": 18,
        "sport": "Diving",
        "total_medals_won": 0
      },
      {
        "name": "Ahmad Abughaush",
        "team": "Jordan",
        "age": 20,
        "sport": "Taekwondo",
        "total_medals_won": 1
      },
      {...}
    ]
}
```

Additionally, the application accepts a query parameter to return only the youngest olympian, in the format `age=youngest`. This will result in only the youngest olympian being returned.

``` JSON
{
  "olympians":
    [
      {
        "name": "Maha Abdalsalam",
        "team": "Egypt",
        "age": 18,
        "sport": "Diving",
        "total_medals_won": 0
      }
    ]
}
```

Lastly, the application accepts a query parameter to return only the oldest olympian, in the format `age=oldest`. This will result in only the oldest olympian being returned.

``` JSON
{
 "olympians":  [
    {
      "name": "Julie Brougham",
      "team": "New Zealand",
      "age": 62,
      "sport": "Equestrianism",
      "total_medals_won": 0
    }
  ]
}
```

##### GET /api/v1/events

The application can return a list of all events, grouped by the sport. A sample response can be found below:

``` JSON
{
  "events": [
    {
      "sport": "Archery",
      "events": [
        {
          "id": 1,
          "name": "Archery Men's Individual"
        },
        {
          "id": 2,
          "name": "Archery Men's Team"
        }
      ]
    },
    {...}
  ]
}
```

##### GET /api/v1/olympian_stats

The application can return a series of statistics about the olympians participating in the games. A sample response can be found below:

``` JSON
{
   "olympian_stats": {
     "total_competing_olympians": 3120,
     "average_weight": {
       "unit": "kg",
       "male_olympians": 75.4,
       "female_olympians": 70.2
     },
     "average_age": 26.2
   }
 }
```

##### GET /api/v1/events/:id/medalists

The application can return all the medalists for a particular event. A sample response can be found below:

``` JSON
{
  "event": "Badminton Mixed Doubles",
  "medalists": [
      {
        "name": "Tontowi Ahmad",
        "team": "Indonesia-1",
        "age": 29,
        "medal": "Gold"
      },
      {
        "name": "Chan Peng Soon",
        "team": "Malaysia",
        "age": 28,
        "medal": "Silver"
      }
    ]
}
```
