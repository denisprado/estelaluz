import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "profile_curriculum" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" varchar
);

CREATE TABLE IF NOT EXISTS "profile_press" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"link" varchar
);

CREATE TABLE IF NOT EXISTS "profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_id" integer NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"phone" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "works_gallery" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"image_id" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "works" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"slug" varchar,
	"description" varchar NOT NULL,
	"technical_description" varchar NOT NULL,
	"coordenadas_longitude" varchar,
	"coordenadas_latitude" varchar,
	"category_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar,
	"title" varchar NOT NULL,
	"url" varchar NOT NULL,
	"description" varchar,
	"color" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "category_work" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"slug" varchar,
	"description" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric,
	"sizes_thumbnail_url" varchar,
	"sizes_thumbnail_width" numeric,
	"sizes_thumbnail_height" numeric,
	"sizes_thumbnail_mime_type" varchar,
	"sizes_thumbnail_filesize" numeric,
	"sizes_thumbnail_filename" varchar,
	"sizes_card_url" varchar,
	"sizes_card_width" numeric,
	"sizes_card_height" numeric,
	"sizes_card_mime_type" varchar,
	"sizes_card_filesize" numeric,
	"sizes_card_filename" varchar,
	"sizes_tablet_url" varchar,
	"sizes_tablet_width" numeric,
	"sizes_tablet_height" numeric,
	"sizes_tablet_mime_type" varchar,
	"sizes_tablet_filesize" numeric,
	"sizes_tablet_filename" varchar
);

CREATE TABLE IF NOT EXISTS "products_gallery" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"image_id" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"slug" varchar,
	"description" varchar NOT NULL,
	"technical_description" varchar,
	"price" numeric,
	"stock" numeric,
	"product_category_id" integer NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "products_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"works_id" integer
);

CREATE TABLE IF NOT EXISTS "category_product" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"slug" varchar,
	"description" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "profile_curriculum_order_idx" ON "profile_curriculum" ("_order");
CREATE INDEX IF NOT EXISTS "profile_curriculum_parent_id_idx" ON "profile_curriculum" ("_parent_id");
CREATE INDEX IF NOT EXISTS "profile_press_order_idx" ON "profile_press" ("_order");
CREATE INDEX IF NOT EXISTS "profile_press_parent_id_idx" ON "profile_press" ("_parent_id");
CREATE INDEX IF NOT EXISTS "profile_created_at_idx" ON "profile" ("created_at");
CREATE INDEX IF NOT EXISTS "works_gallery_order_idx" ON "works_gallery" ("_order");
CREATE INDEX IF NOT EXISTS "works_gallery_parent_id_idx" ON "works_gallery" ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "works_slug_idx" ON "works" ("slug");
CREATE INDEX IF NOT EXISTS "works_created_at_idx" ON "works" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "courses_slug_idx" ON "courses" ("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "courses_url_idx" ON "courses" ("url");
CREATE INDEX IF NOT EXISTS "courses_created_at_idx" ON "courses" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "category_work_slug_idx" ON "category_work" ("slug");
CREATE INDEX IF NOT EXISTS "category_work_created_at_idx" ON "category_work" ("created_at");
CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" ("filename");
CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" ("sizes_thumbnail_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_card_sizes_card_filename_idx" ON "media" ("sizes_card_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" ("sizes_tablet_filename");
CREATE INDEX IF NOT EXISTS "products_gallery_order_idx" ON "products_gallery" ("_order");
CREATE INDEX IF NOT EXISTS "products_gallery_parent_id_idx" ON "products_gallery" ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "products_slug_idx" ON "products" ("slug");
CREATE INDEX IF NOT EXISTS "products_created_at_idx" ON "products" ("created_at");
CREATE INDEX IF NOT EXISTS "products_rels_order_idx" ON "products_rels" ("order");
CREATE INDEX IF NOT EXISTS "products_rels_parent_idx" ON "products_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "products_rels_path_idx" ON "products_rels" ("path");
CREATE UNIQUE INDEX IF NOT EXISTS "category_product_slug_idx" ON "category_product" ("slug");
CREATE INDEX IF NOT EXISTS "category_product_created_at_idx" ON "category_product" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
DO $$ BEGIN
 ALTER TABLE "profile_curriculum" ADD CONSTRAINT "profile_curriculum_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "profile"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "profile_press" ADD CONSTRAINT "profile_press_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "profile"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "works_gallery" ADD CONSTRAINT "works_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "works_gallery" ADD CONSTRAINT "works_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "works"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "works" ADD CONSTRAINT "works_category_id_category_work_id_fk" FOREIGN KEY ("category_id") REFERENCES "category_work"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_product_category_id_category_product_id_fk" FOREIGN KEY ("product_category_id") REFERENCES "category_product"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_works_fk" FOREIGN KEY ("works_id") REFERENCES "works"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
};

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DROP TABLE "users";
DROP TABLE "profile_curriculum";
DROP TABLE "profile_press";
DROP TABLE "profile";
DROP TABLE "works_gallery";
DROP TABLE "works";
DROP TABLE "courses";
DROP TABLE "category_work";
DROP TABLE "media";
DROP TABLE "products_gallery";
DROP TABLE "products";
DROP TABLE "products_rels";
DROP TABLE "category_product";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";`)
};
