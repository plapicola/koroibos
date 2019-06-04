const parse = require('csv-parse/lib/sync')
const assert = require('assert')
const fs = require('fs')
var Olympian = require('../models/olympian')
var Team = require('../models/team')
var Sport = require('../models/sport')
var Event = require('../models/event')
var EventMedalist = require('../models/event_medalist')
var OlympianEvent = require('../models/olympian_event')
var pry = require('pryjs')

const input = fs.readFileSync('data.csv', {encoding: "utf-8"});

const records = parse(input, {
  columns: true,
  skip_empty_lines: true
})

createRecords(records);


async function createRecords(records) {
  for(var i = 0; i < records.length; i++) {
    var current = records[i]
    var team = await Team.find_or_create({name: current.Team})
    var sport = await Sport.find_or_create({name: current.Sport})
    var olympian = await Olympian.find_or_create({name: current.Name, sex: current.Sex, age: current.Age, sport_id: sport.id, team_id: team.id, height: (parseInt(current.Height) || 0), weight: (parseInt(current.Weight) || 0)})
    var e = await Event.find_or_create({name: current.Event, sport_id: sport.id})
    var oe = await OlympianEvent.create({olympian_id: olympian.id, event_id: e.id})
    if (current.Medal !== 'NA') {
      var em = await EventMedalist.create({olympian_id: olympian.id, event_id: e.id, medal: current.Medal})
    }
  }
}

// Order:
// Team
// Sport
// Olympian
// Event
// EventMedalist
// OlympianEvemt
