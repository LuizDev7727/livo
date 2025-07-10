CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" varchar,
	"avatar_url" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL
);
