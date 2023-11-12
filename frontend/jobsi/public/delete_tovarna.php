<?php

// Путь к файлу file.json
$filePath = 'tovarny.json'; // Замените на путь к вашему файлу file.json

// Получаем данные из тела запроса
$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];

var_dump($data); 
var_dump($name);

// Читаем содержимое файла
$fileContents = file_get_contents($filePath);
$hostels = json_decode($fileContents, true);

var_dump($fileContents); 
var_dump($hostels);

// Находим индекс сотрудника по name
$index = array_search($name, array_column($hostels, 'name'));

var_dump($index);

if ($index !== false) {
    // Удаляем сотрудника из массива
    array_splice($hostels, $index, 1);

    // Записываем обновленные данные обратно в файл
    file_put_contents($filePath, json_encode($hostels));

    // Отправляем успешный ответ
    http_response_code(200);
    echo json_encode(['message' => 'Сотрудник успешно удален']);
} else {
    // Отправляем ответ об ошибке
    http_response_code(404);
    echo json_encode(['error' => 'Сотрудник с указанным name не найден']);
}

