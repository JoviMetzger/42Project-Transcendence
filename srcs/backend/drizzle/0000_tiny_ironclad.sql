CREATE TABLE `friends` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`requester` text(264) NOT NULL,
	`recipient` text(264) NOT NULL,
	`status` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`requester`) REFERENCES `users_table`(`uuid`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recipient`) REFERENCES `users_table`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `matches` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text(264) NOT NULL,
	`p1Alias` text(264) NOT NULL,
	`p2Alias` text(264) NOT NULL,
	`p1_id` text(264),
	`p2_id` text(264),
	`status` integer NOT NULL,
	`winner` integer DEFAULT 0,
	`start_time` text(264) DEFAULT (current_timestamp),
	`end_time` text(264) DEFAULT (current_timestamp),
	`duration` integer DEFAULT 0,
	FOREIGN KEY (`p1_id`) REFERENCES `users_table`(`uuid`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`p2_id`) REFERENCES `users_table`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `matches_uuid_unique` ON `matches` (`uuid`);--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text(264) NOT NULL,
	`username` text(264) NOT NULL,
	`password` text(264) NOT NULL,
	`alias` text(264) NOT NULL,
	`profile_pic` blob,
	`language` text(264) DEFAULT 'en',
	`status` integer DEFAULT 0,
	`wins` integer DEFAULT 0,
	`loss` integer DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_uuid_unique` ON `users_table` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_username_unique` ON `users_table` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_alias_unique` ON `users_table` (`alias`);