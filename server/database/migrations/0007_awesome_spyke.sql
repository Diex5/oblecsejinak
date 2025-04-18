CREATE TABLE "order_upsells" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer,
	"step_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"cta_text" text,
	"fomo_text" text,
	"amount" numeric(10, 2) NOT NULL,
	"discounted_amount" numeric(10, 2),
	"image_url" text,
	"next" integer,
	"type" text DEFAULT 'upsell' NOT NULL,
	"context" text DEFAULT 'checkout' NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0,
	"accepted" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "order_upsells" ADD CONSTRAINT "order_upsells_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;