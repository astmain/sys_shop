CREATE TABLE "tb_test1" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "tb_account" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) DEFAULT '小许',
	"at_created" timestamp DEFAULT now() NOT NULL,
	"at_updated" timestamp DEFAULT now() NOT NULL
);
