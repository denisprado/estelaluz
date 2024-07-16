import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "works" ALTER COLUMN "description" SET DATA TYPE jsonb;
ALTER TABLE "works" ALTER COLUMN "technical_description" SET DATA TYPE jsonb;
ALTER TABLE "products" ALTER COLUMN "description" SET DATA TYPE jsonb;
ALTER TABLE "products" ALTER COLUMN "technical_description" SET DATA TYPE jsonb;`)
};

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "works" ALTER COLUMN "description" SET DATA TYPE varchar;
ALTER TABLE "works" ALTER COLUMN "technical_description" SET DATA TYPE varchar;
ALTER TABLE "products" ALTER COLUMN "description" SET DATA TYPE varchar;
ALTER TABLE "products" ALTER COLUMN "technical_description" SET DATA TYPE varchar;`)
};
