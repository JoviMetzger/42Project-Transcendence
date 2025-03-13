CREATE TABLE `simple_table` (
	`test` text,
	`number` integer
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`alias` text NOT NULL,
	`profile_pic` blob,
	`language` text DEFAULT 'en',
	`wins` integer DEFAULT 0,
	`loss` integer DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_uuid_unique` ON `users_table` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_username_unique` ON `users_table` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_alias_unique` ON `users_table` (`alias`);