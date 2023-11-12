<?php
// Получаем данные из тела запроса
$input_data = file_get_contents('php://input');
$data = json_decode($input_data, true);
$id = $data['pokoj'];
$ubytovna = $data['ubytovna'];

// Путь к файлу pokoje.json
$file_path = 'pokoje.json';

// Читаем содержимое файла
$file_content = file_get_contents($file_path);
$rooms = json_decode($file_content, true);

// Находим индекс комнаты в массиве по id и ubytovna
$index = -1;
foreach ($rooms as $key => $room) {
    if ($room['id'] == $id && $room['ubytovna'] == $ubytovna) {
        $index = $key;
        break;
    }
}

if ($index !== -1) {
    // Удаляем комнату из массива
    array_splice($rooms, $index, 1);

    // Записываем обновленные данные в файл
    file_put_contents($file_path, json_encode($rooms, JSON_PRETTY_PRINT));

    // Отправляем успешный ответ
    http_response_code(200);
    echo json_encode(['message' => 'Комната успешно удалена']);
} else {
    // Отправляем ответ об ошибке
    http_response_code(404);
    echo json_encode(['error' => 'Комната с указанными id и ubytovna не найдена']);
}
?>
