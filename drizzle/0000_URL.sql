CREATE TABLE "urls" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"short_url" varchar(10) NOT NULL,
	"original_url" varchar(2048) NOT NULL,
	"visit_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_visited_at" timestamp,
	CONSTRAINT "urls_short_url_unique" UNIQUE("short_url")
);
