CREATE TABLE `review_submission_rate_limits` (
	`id` int AUTO_INCREMENT NOT NULL,
	`keyHash` varchar(64) NOT NULL,
	`attempts` int NOT NULL DEFAULT 0,
	`windowStartedAt` timestamp NOT NULL,
	CONSTRAINT `review_submission_rate_limits_id` PRIMARY KEY(`id`),
	CONSTRAINT `review_submission_rate_limits_key_hash_unique` UNIQUE(`keyHash`)
);
