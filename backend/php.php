<?php
header('Access-Control-Allow-Origin: *'); // Allow cross-origin requests
header('Content-Type: application/json'); // Set correct content type for JSON

$responseArray = [
    'status' => 'success',
    'message' => 'Data fetched successfully.'
];

echo json_encode($responseArray);
