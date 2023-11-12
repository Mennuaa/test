<?php

// Путь к файлу file.json
$filePath = 'file.json'; // Замените на путь к вашему файлу file.json

// Получаем данные из тела запроса
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];

var_dump($data); 
var_dump($email);

// Читаем содержимое файла
$fileContents = file_get_contents($filePath);
$employees = json_decode($fileContents, true);

var_dump($fileContents); 
var_dump($employees);

// Находим индекс сотрудника по email
$index = array_search($email, array_column($employees, 'email'));

var_dump($index);

if ($index !== false) {
    // Удаляем сотрудника из массива
    array_splice($employees, $index, 1);

    // Записываем обновленные данные обратно в файл
    file_put_contents($filePath, json_encode($employees));

    // Отправляем успешный ответ
    http_response_code(200);
    echo json_encode(['message' => 'Сотрудник успешно удален']);
} else {
    // Отправляем ответ об ошибке
    http_response_code(404);
    echo json_encode(['error' => 'Сотрудник с указанным email не найден']);
}
