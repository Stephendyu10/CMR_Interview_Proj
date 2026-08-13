CREATE INDEX "clients_firm_id_idx" ON "clients" USING btree ("firm_id");--> statement-breakpoint
CREATE INDEX "engagements_client_id_idx" ON "engagements" USING btree ("client_id");--> statement-breakpoint
CREATE INDEX "users_firm_id_idx" ON "users" USING btree ("firm_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_firm_email_unique" UNIQUE("firm_id","email");