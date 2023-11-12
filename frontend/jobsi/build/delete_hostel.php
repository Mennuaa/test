<?php

// Путь к файлу file.json
$filePath = 'ubytovny.json'; 

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


// // Получаем данные из тела запроса
// $data2 = json_decode(file_get_contents("php://input"), true);

// // Путь к файлу pokoje.json
// $jsonFilePath2 = "pokoje.json";

// // Чтение данных из файла
// $jsonData2 = file_get_contents($jsonFilePath2);
// $rooms = json_decode($jsonData2, true);

// if (is_array($rooms) && isset($data2["room"]) && isset($data2["ubytovna"])) {
//     // Проходимся по всем объектам в массиве
//     foreach ($rooms as &$room) {
//         // Удаляем ключи "room" и "ubytovna", если их значения совпадают с переданными
//         if (isset($room["room"]) && isset($room["ubytovna"]) &&
//             $room["room"] === $data2["room"] && $room["ubytovna"] === $data2["ubytovna"]) {
//             unset($room["room"]);
//             unset($room["ubytovna"]);
//         }
//     }

//     // Сохраняем обновленные данные в файл
//     file_put_contents($jsonFilePath2, json_encode($rooms, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

//     // Возвращаем успешный ответ
//     http_response_code(200);
//     echo json_encode(array("message" => "Keys 'room' and 'ubytovna' removed from matching objects."));
// } else {
//     // Возвращаем ошибку, если данные некорректны
//     http_response_code(400);
//     echo json_encode(array("message" => "Invalid data in JSON file or missing 'room' or 'ubytovna' in request."));
// }

// ?>

