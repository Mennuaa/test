<?php
// Открываем файл с данными
$file_path = 'file.json';
$file_content = file_get_contents($file_path);

// Преобразуем JSON-строку в ассоциативный массив
$data = json_decode($file_content, true);

// Получаем email сотрудника для удаления (предполагая, что оно приходит в запросе)
$request_data = json_decode(file_get_contents('php://input'), true);
$pracovikEmail = $request_data['email'];

// Ищем индекс сотрудника с заданным email
$index = -1;
foreach ($data as $key => $item) {
    if (isset($item['email']) && $item['email'] === $pracovikEmail) {
        $index = $key;
        break;
    }
}

if ($index !== -1) {
    // Если сотрудник найден, изменяем значение свойства "stredisko" на "-"
    $data[$index]['stredisko'] = "-";
    
    // Преобразуем данные обратно в JSON-формат
    $updated_data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    
    // Записываем обновленные данные обратно в файл
    file_put_contents($file_path, $updated_data);
    
    // Отправляем успешный статус
    http_response_code(200);
} else {
    // Если сотрудник не найден, отправляем ошибку
    http_response_code(404);
    echo json_encode(array("error" => "Сотрудник не найден"), JSON_UNESCAPED_UNICODE);
}
?>
