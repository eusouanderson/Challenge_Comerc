CREATE TABLE "client" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"lastname" varchar(100) NOT NULL,
	"cpf" varchar(14) NOT NULL,
	"email" varchar(255) NOT NULL,
	"cell" varchar(20) NOT NULL,
	"cep" varchar(9) NOT NULL,
	"street" varchar(255) NOT NULL,
	"neighborhood" varchar(100) NOT NULL,
	"city" varchar(100) NOT NULL,
	"uf" varchar(2) NOT NULL,
	"password" varchar(255) NOT NULL,
	"status" varchar(10) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"document" varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	"email" varchar NOT NULL,
	"status" varchar(10) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
