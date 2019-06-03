# Koroibos Challenge

### Using the application

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
