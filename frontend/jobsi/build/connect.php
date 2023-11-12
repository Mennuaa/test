<?php
$host = '127.0.0.1';
$port = '8889';
$dbname = 'jobsi';
$username = 'root';
$password = 'root';

// Create connection
$pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);

// Check connection
if (!$pdo) {
    die("Connection failed: " . mysqli_connect_error());
}

// Write your SQL statement for the migration
$sql = "
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
";

// Run the migration
try {
    $pdo->exec($sql);
    echo "Migration successful.";
} catch (PDOException $e) {
    die("DB ERROR: ". $e->getMessage());
}
