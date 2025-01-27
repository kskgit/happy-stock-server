-- todo: add user_id to stocks
CREATE TABLE `stocks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`day_of_week` text,
	`notification_time` text
);
