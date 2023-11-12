<?php

// Путь к файлу file.json
$filePath = 'pokoje.json'; 

// Получаем данные из тела запроса
$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];

// Загружаем содержимое файла JSON
$fileContents = file_get_contents($filePath);

if ($fileContents === false) {
    // Обработка ошибки чтения файла
    die('Не удалось прочитать файл JSON');
}

// Разбираем JSON в ассоциативный массив
$jsonData = json_decode($fileContents, true);

if ($jsonData === null) {
    // Обработка ошибки парсинга JSON
    die('Ошибка парсинга JSON');
}

// Индексы объектов для удаления
$indexesToRemove = [];

// Находим объекты для удаления
foreach ($jsonData as $index => $item) {
    if (isset($item['ubytovna']) && $item['ubytovna'] === $name) {
        $indexesToRemove[] = $index;
    }
}

// Удаляем объекты из массива
foreach ($indexesToRemove as $index) {
    unset($jsonData[$index]);
}

// Преобразуем обновленные данные обратно в JSON
$newJsonData = json_encode($jsonData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

if ($newJsonData === false) {
    // Обработка ошибки кодирования в JSON
    die('Ошибка кодирования в JSON');
}

// Записываем обновленные данные в файл
if (file_put_contents($filePath, $newJsonData) === false) {
    // Обработка ошибки записи файла
    die('Не удалось записать данные в файл JSON');
}

// Возвращаем успешный ответ
echo 'Данные успешно обновлены';
?>
