CREATE TABLE `friends` (
	`requester` text,
	`recipient` text,
	`status` integer DEFAULT 0,
	FOREIGN KEY (`requester`) REFERENCES `users_table`(`uuid`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recipient`) REFERENCES `users_table`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `matches` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`p1Alias` text NOT NULL,
	`p2Alias` text NOT NULL,
	`p1_id` text,
	`p2_id` text,
	`status` integer NOT NULL,
	`winner` integer,
	`start_time` text DEFAULT (current_timestamp),
	`end_time` text DEFAULT (current_timestamp),
	`duration` integer DEFAULT 0,
	FOREIGN KEY (`p1_id`) REFERENCES `users_table`(`uuid`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`p2_id`) REFERENCES `users_table`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `matches_uuid_unique` ON `matches` (`uuid`);--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`alias` text NOT NULL,
	`profile_pic` blob,
	`language` text DEFAULT 'en',
	`status` integer,
	`wins` integer DEFAULT 0,
	`loss` integer DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_uuid_unique` ON `users_table` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_username_unique` ON `users_table` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_alias_unique` ON `users_table` (`alias`);