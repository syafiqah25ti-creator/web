<?php
/**
 * api.php - Backend REST API Sederhana (Opsional)
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/data.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        echo json_encode(["status" => "empty", "data" => []]);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    if (!empty($input)) {
        file_put_contents($dataFile, $input);
        echo json_encode(["status" => "success", "message" => "Data tersimpan di server!"]);
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Payload kosong!"]);
    }
    exit;
}
