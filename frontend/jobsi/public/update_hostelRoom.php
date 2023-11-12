<?php
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Получаем данные из тела запроса
    $data = json_decode(file_get_contents("php://input"), true);

    // Путь к файлу JSON
    $file_path = 'pokoje.json';

    // Читаем существующие данные из файла
    $existing_data = json_decode(file_get_contents($file_path), true);


    $newid = $data['new_id'];
    $newquantity = $data['quantity'];
    $ubytovna = $data['ubytovna'];
    
    $updated = false;

    foreach ($existing_data as &$item) {
        if ($item['ubytovna'] === $ubytovna) {
            // Обновляем объект, добавляя новый ключ "room"
            $item['quantity'] = $newquantity;
            $item['id'] = $newid;
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

