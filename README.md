# Koroibos Challenge

### Introduction

This application is intended to act as a basic backend for tracking olympians, events, and medalists.

### Dependencies

The application requires the following dependencies prior to setup:

- Node.js
- Express.js
- PostgreSQL

### Initial Setup:

You will need to manually create a database for `koroibos_development` and `koroibos_test`.

``` bash
npm install # Installs required dependencies
npx knex migrate:latest # Run migrations for database
```

Once the dependencies have been installed and the database has been created, you may start the application using the command `npm start`.

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

### Testing

To execute the test suite, run the command `npm test`. Testing is handled through the Jest library.

### Known Issues

- Formatting of events with no medalist information contains nulls for a single medal.

### Contributing

To contribute to this project, please fork and issue a pull request to the master branch with a note indicating changes made.

### Core Contributors

- @plapicola (Author)

### Database Schema

![Database Schema](/schema.png)

### Tech Stack

This application was built using the following technologies:

- Node.js
- Express.js
- Knex
- PostgreSQL
- Heroku
