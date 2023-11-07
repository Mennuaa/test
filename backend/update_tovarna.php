<?php
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Получаем данные из тела запроса
    $input_data = file_get_contents('php://input');
    $data = json_decode($input_data, true);

    // Получаем новый email работника из данных запроса
    $newName = isset($data['name']) ? $data['name'] : null;

    // Путь к файлу file.json
    $file_path = 'tovarny.json';

    // Чтение содержимого файла
    $file_content = file_get_contents($file_path);
    $hostels = json_decode($file_content, true);

    // Находим индекс работника в массиве по старому email
    $oldName = urldecode($data['oldName']); // Предполагая, что вы передаете старый email из клиента
    $index = array_search($oldName, array_column($hostels, 'name'));

    if ($index === false) {
        http_response_code(404);
        echo json_encode(array('message' => 'Работник с указанным email не найден'));
        exit();
    }

    // Обновляем данные работника с новыми значениями
    $hostels[$index]['email'] = isset($data['email']) ? $data['email'] : $hostels[$index]['email'];
    $hostels[$index]['name'] = $newName; // Используем новый email из данных запроса
    $hostels[$index]['mobile'] = isset($data['mobile']) ? $data['mobile'] : $hostels[$index]['mobile'];
    $hostels[$index]['adress'] = isset($data['adress']) ? $data['adress'] : $hostels[$index]['adress'];

    // Обновите другие поля работника, которые нужно обновить

    // Записываем обновленные данные в файл
    file_put_contents($file_path, json_encode($hostels, JSON_PRETTY_PRINT));

    // Отправляем ответ об успешном обновлении
    http_response_code(200);
    echo json_encode(array('message' => 'Данные работника успешно обновлены'));
    exit();
} else {
    http_response_code(400);
    echo json_encode(array('message' => 'Неподдерживаемый метод запроса'));
    exit();
}

?>
