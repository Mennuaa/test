<?php
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Получаем данные из тела запроса
    $data = json_decode(file_get_contents("php://input"), true);

    // Путь к файлу JSON
    $file_path = 'file.json';

    // Читаем существующие данные из файла
    $existing_data = json_decode(file_get_contents($file_path), true);

    // Находим объект с совпадающим значением "name"
    $email = $data['email'];
    $idRoom = $data['idRoom'];
    $idUbytovna = $data['idUbytovna'];
    
    $updated = false;

    foreach ($existing_data as &$item) {
        if ($item['email'] === $email) {
            
            $item['room'] = $idRoom;
            $item['ubytovna'] = $idUbytovna;
            $updated = true;
            break;
        }
    }

    // Записываем обновленные данные обратно в файл
    if ($updated) {
        file_put_contents($file_path, json_encode($existing_data, JSON_PRETTY_PRINT));
        http_response_code(200);
        echo json_encode(['message' => 'Данные успешно обновлены']);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'Объект с указанным значением "name" не найден']);
    }
} else {
    http_response_code(405); // Метод не разрешен
    echo json_encode(['message' => 'Метод не разрешен']);
}
?>
