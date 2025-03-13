PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_matches` (
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
	`duration` integer DEFAULT 0,
	FOREIGN KEY (`p1_id`) REFERENCES `users_table`(`uuid`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`p2_id`) REFERENCES `users_table`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_matches`("id", "uuid", "p1Alias", "p2Alias", "p1_id", "p2_id", "status", "winner", "start_time", "end_time", "duration") SELECT "id", "uuid", "p1Alias", "p2Alias", "p1_id", "p2_id", "status", "winner", "start_time", "end_time", "duration" FROM `matches`;--> statement-breakpoint
DROP TABLE `matches`;--> statement-breakpoint
ALTER TABLE `__new_matches` RENAME TO `matches`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `matches_uuid_unique` ON `matches` (`uuid`);--> statement-breakpoint
ALTER TABLE `users_table` ADD `friends` text DEFAULT (json_array());