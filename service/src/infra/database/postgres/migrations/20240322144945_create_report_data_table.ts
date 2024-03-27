import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('report_data', (table) => {
    table.uuid('id').unique().primary();

    table.integer('number_of_charges');
    table.integer('charged_every_x_days');
    table.datetime('start_date').notNullable();
    table.string('status', 255).notNullable();
    table.datetime('status_date').notNullable();
    table.datetime('cancellation_date').nullable();
    table.double('amount').notNullable();
    table.datetime('next_cycle').notNullable();
    table.string('subscriber_id', 255).notNullable();

    table.uuid('report_id').notNullable();

    table.foreign('report_id').references('id').inTable('reports');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('report_data');
}
