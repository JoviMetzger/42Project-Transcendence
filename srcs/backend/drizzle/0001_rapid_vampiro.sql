CREATE TABLE `matches` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`p1Alias` text NOT NULL,
	`p2Alias` text NOT NULL,
	`p1_id` text,
	`p2_id` text,
	`status` text NOT NULL,
	`winner` integer,
	`start_time` text DEFAULT (current_timestamp),
	`end_time` text DEFAULT (current_timestamp),
	`duration` integer,
	FOREIGN KEY (`p1_id`) REFERENCES `users_table`(`uuid`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`p2_id`) REFERENCES `users_table`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `matches_uuid_unique` ON `matches` (`uuid`);