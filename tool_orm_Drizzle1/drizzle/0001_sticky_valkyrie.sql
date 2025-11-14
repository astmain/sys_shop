ALTER TABLE "tb_account" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "tb_account" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "tb_account" DROP COLUMN "at_created";--> statement-breakpoint
ALTER TABLE "tb_account" DROP COLUMN "at_updated";