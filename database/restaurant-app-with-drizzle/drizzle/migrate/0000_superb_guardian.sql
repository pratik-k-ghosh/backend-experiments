CREATE TABLE `dish` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(10) NOT NULL,
	`description` varchar(255) NOT NULL,
	`price` int NOT NULL,
	CONSTRAINT `dish_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(10) NOT NULL,
	`designation` varchar(8) DEFAULT 'customer',
	`password` varchar(10) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
