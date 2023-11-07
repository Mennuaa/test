<?php
$input_data = file_get_contents('php://input');
$data = json_decode($input_data, true);

$name = isset($data['name']) ? $data['name'] : null;


$file_path = 'file.json';
$file_content = file_get_contents($file_path);
$objects = json_decode($file_content, true);

$updated = false;

foreach ($objects as &$object) {
    if ($object['name'] === $name) {
        $object['ubytovna'] = '-';
        $object['room'] = '-';
        $updated = true;
        break;
    }
}

if ($updated) {
    file_put_contents($file_path, json_encode($objects, JSON_PRETTY_PRINT));
    http_response_code(200);
    echo json_encode(array('message' => 'Данные успешно обновлены'));
} else {
    http_response_code(400);
    echo json_encode(array('message' => 'Не найден объект с указанным name'));
}
?>
