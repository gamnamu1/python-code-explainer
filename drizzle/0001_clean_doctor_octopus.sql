CREATE TABLE `code_analyses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`code` text NOT NULL,
	`fileName` varchar(255),
	`elementaryExplanation` text,
	`collegeExplanation` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `code_analyses_id` PRIMARY KEY(`id`)
);
