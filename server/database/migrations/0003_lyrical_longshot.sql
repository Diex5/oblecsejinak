ALTER TABLE "products" ADD COLUMN "discount" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "discount_start" timestamp;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "discount_end" timestamp;