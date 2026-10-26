<?php
/**
 * index.php - Entry point jika dijalankan via Laragon / XAMPP / PHP Server
 */
$htmlFile = __DIR__ . '/index.html';
if (file_exists($htmlFile)) {
    include_once $htmlFile;
} else {
    echo "<h1>Error: File index.html tidak ditemukan!</h1>";
}
