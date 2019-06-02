
exports.up = function(knex, Promise) {
  return knex.schema
    .alterTable("olympians", function(table) {
      table.integer("team_id").unsigned().notNullable();
      table.foreign("team_id").references("id").inTable("teams");
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .alterTable("olympians", function(table) {
      table.dropColumn("team_id");
    })
};
