CREATE TABLE "tb_test2" (
	"id" varchar(36) PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"age" integer,
	"phone" varchar(255),
	CONSTRAINT "tb_test2_phone_format_check" CHECK ("tb_test2"."phone" ~ '^1[3-9][0-9]{9}$')
);
