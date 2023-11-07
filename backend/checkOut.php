<?php
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Получаем данные из тела запроса
    $email = file_get_contents("php://input");

    // Путь к файлу JSON
    $file_path = 'file.json';

    // Читаем существующие данные из файла
    $existing_data = json_decode(file_get_contents($file_path), true);

    // Находим объект с совпадающим значением "email"
    foreach ($existing_data as &$item) {
        if ($item['email'] === $email) {
            // Удаляем ключи "room" и "ubytovna" из объекта
            unset($item['room']);
            $item['ubytovna'] = "-";
            break;
        }
    }

    // Записываем обновленные данные обратно в файл
    file_put_contents($file_path, json_encode($existing_data, JSON_PRETTY_PRINT));
    http_response_code(200);
    echo json_encode(['message' => 'Ключи "room" и "ubytovna" успешно удалены']);
} else {
    http_response_code(405); // Метод не разрешен
    echo json_encode(['message' => 'Метод не разрешен']);
}
?>


