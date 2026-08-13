CREATE TYPE "public"."client_status" AS ENUM('ACTIVE', 'INACTIVE');--> statement-breakpoint
CREATE TYPE "public"."engagement_status" AS ENUM('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('ADMIN', 'MEMBER');--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'::"public"."client_status";--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "status" SET DATA TYPE "public"."client_status" USING "status"::"public"."client_status";--> statement-breakpoint
ALTER TABLE "engagements" ALTER COLUMN "status" SET DEFAULT 'NOT_STARTED'::"public"."engagement_status";--> statement-breakpoint
ALTER TABLE "engagements" ALTER COLUMN "status" SET DATA TYPE "public"."engagement_status" USING "status"::"public"."engagement_status";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'MEMBER'::"public"."user_role";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "public"."user_role" USING "role"::"public"."user_role";