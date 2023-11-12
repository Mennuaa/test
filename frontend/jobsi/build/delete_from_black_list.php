<?php

// Путь к файлу black-list.json
$blackListFilePath = 'black-list.json';

// Путь к файлу file.json
$fileJsonPath = 'file.json';

// Получаем данные из тела запроса
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];

// Читаем содержимое файла black-list.json
$blackListContents = file_get_contents($blackListFilePath);
$employees = json_decode($blackListContents, true);

// Находим сотрудника по email
$employeeData = current(array_filter($employees, function ($employee) use ($email) {
    return $employee['email'] === $email;
}));

if ($employeeData) {
    // Добавляем информацию о сотруднике в file.json
    $fileJsonContents = file_get_contents($fileJsonPath);
    $fileJsonArray = json_decode($fileJsonContents, true);
    $fileJsonArray[] = $employeeData; // Добавляем данные сотрудника
    file_put_contents($fileJsonPath, json_encode($fileJsonArray, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    // Удаляем сотрудника из black-list.json
    $index = array_search($employeeData, $employees);
    array_splice($employees, $index, 1);
    file_put_contents($blackListFilePath, json_encode($employees, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    // Отправляем успешный ответ
    http_response_code(200);
    echo json_encode(['message' => 'Сотрудник успешно удален и добавлен в file.json']);
} else {
    // Отправляем ответ об ошибке
    http_response_code(404);
    echo json_encode(['error' => 'Сотрудник с указанным email не найден']);
}

