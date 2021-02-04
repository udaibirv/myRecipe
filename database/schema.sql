set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "recipeDatabase" cascade;
create schema "recipeDatabase";
CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "recipes" (
	"recipeId" serial NOT NULL,
	"recipeName" TEXT NOT NULL,
	"equipment" TEXT NOT NULL,
	"recipeOrigin" TEXT NOT NULL,
	"userId" serial NOT NULL,
	CONSTRAINT "recipes_pk" PRIMARY KEY ("recipeId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "ingredients" (
	"ingredientId" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "ingredients_pk" PRIMARY KEY ("ingredientId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "categories" (
	"categoryId" serial NOT NULL,
	"categoryName" TEXT NOT NULL,
	CONSTRAINT "categories_pk" PRIMARY KEY ("categoryId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "recipeCategories" (
	"recipeId" int NOT NULL,
	"categoryId" int NOT NULL,
  PRIMARY KEY ("recipeId", "categoryId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "directions" (
	"directionId" serial NOT NULL,
	"instruction" TEXT NOT NULL,
	"recipeId" serial NOT NULL,
	"stepNumber" serial NOT NULL,
  primary key ("directionId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "recipeIngredients" (
	"recipeId" int NOT NULL,
	"ingredientId" int NOT NULL,
	"amount" TEXT NOT NULL,
  primary key ("recipeId", "ingredientId")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "recipeCategories" ADD CONSTRAINT "recipeCategories_fk0" FOREIGN KEY ("recipeId") REFERENCES "recipes"("recipeId");
ALTER TABLE "recipeCategories" ADD CONSTRAINT "recipeCategories_fk1" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId");
ALTER TABLE "directions" ADD CONSTRAINT "directions_fk0" FOREIGN KEY ("recipeId") REFERENCES "recipes"("recipeId");
ALTER TABLE "recipeIngredients" ADD CONSTRAINT "recipeIngredients_fk0" FOREIGN KEY ("recipeId") REFERENCES "recipes"("recipeId");
ALTER TABLE "recipeIngredients" ADD CONSTRAINT "recipeIngredients_fk1" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("ingredientId");