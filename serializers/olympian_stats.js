module.exports = class OlympianStatsSerializer {
  static formatOne(stats) {
    return {
      olympian_stats: {
        total_competing_olympians: parseInt(stats.total_competing_olympians),
        average_weight: {
          unit: "kg",
          male_olympians: stats.average_male_weight,
          female_olympians: stats.average_female_weight
        },
        average_age: stats.average_age
      }
    }
  }
}
