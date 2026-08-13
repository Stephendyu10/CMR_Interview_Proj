export const userRoleEnum = pgEnum("user_role", [
  "ADMIN",
  "MEMBER",
]);

export const clientStatusEnum = pgEnum("client_status", [
  "ACTIVE",
  "INACTIVE",
]);

export const engagementStatusEnum = pgEnum("engagement_status", [
  "NOT_STARTED",
  "IN_PROGRESS",
  "COMPLETED",
]);


import {
    pgTable,
    pgEnum,
    uuid,
    text,
    integer,
    timestamp,
    unique,
    index,
    date,
} from "drizzle-orm/pg-core";

export const firms = pgTable("firms", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),

    firmId: uuid("firm_id")
        .notNull()
        .references(() => firms.id, { onDelete: "cascade" }),

    name: text("name").notNull(),
    email: text("email").notNull(),
    role: userRoleEnum("role").notNull().default("MEMBER"),

    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
},
    (table) => [unique("users_firm_email_unique").on(table.firmId, table.email), 
        index("users_firm_id_idx").on(table.firmId),],
);

export const clients = pgTable("clients", {
  id: uuid("id").defaultRandom().primaryKey(),

  firmId: uuid("firm_id")
    .notNull()
    .references(() => firms.id, { onDelete: "cascade" }),

  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  status: clientStatusEnum("status").notNull().default("ACTIVE"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
},
    (table) =>[index("clients_firm_id_idx").on(table.firmId)],
);

export const engagements = pgTable("engagements", {
  id: uuid("id").defaultRandom().primaryKey(),

  clientId: uuid("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "cascade" }),

  name: text("name").notNull(),
  type: text("type").notNull(),
  taxYear: integer("tax_year"),
  status: engagementStatusEnum("status").notNull().default("NOT_STARTED"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

},
    (table) =>[index("engagements_client_id_idx").on(table.clientId)],
);


export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),

  firmId: uuid("firm_id").notNull(),

  clientId: uuid("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "cascade" }),

  engagementId: uuid("engagement_id")
    .notNull()
    .references(() => engagements.id, { onDelete: "cascade" }),

  title: text("title").notNull(),

  description: text("description"),

  status: text("status").notNull().default("NOT_STARTED"),

  priority: text("priority").notNull().default("NORMAL"),

  assignedToUserId: uuid("assigned_to_user_id")
    .references(() => users.id, { onDelete: "set null" }),

  dueDate: date("due_date"),

  completedAt: timestamp("completed_at", { withTimezone: true }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
},
    (table) => [
        index("tasks_firm_id_idx").on(table.firmId),
        index("tasks_client_id_idx").on(table.clientId),
        index("tasks_engagement_id_idx").on(table.engagementId),
    ],
);

export const requests = pgTable("requests", {
  id: uuid("id").defaultRandom().primaryKey(),

  firmId: uuid("firm_id").notNull(),

  clientId: uuid("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "cascade" }),

  engagementId: uuid("engagement_id")
    .notNull()
    .references(() => engagements.id, { onDelete: "cascade" }),

  title: text("title").notNull(),

  description: text("description"),

  status: text("status").notNull().default("DRAFT"),

  assignedToUserId: uuid("assigned_to_user_id")
    .references(() => users.id, { onDelete: "set null" }),

  dueDate: date("due_date"),

  sentAt: timestamp("sent_at", { withTimezone: true }),

  completedAt: timestamp("completed_at", { withTimezone: true }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
},
    (table) => [
        index("requests_firm_id_idx").on(table.firmId),
        index("requests_client_id_idx").on(table.clientId),
        index("requests_engagement_id_idx").on(table.engagementId),
    ],
);

