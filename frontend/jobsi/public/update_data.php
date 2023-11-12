<?php
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Получаем данные из тела запроса
    $input_data = file_get_contents('php://input');
    $data = json_decode($input_data, true);

    // Получаем новый email работника из данных запроса
    $newEmail = isset($data['email']) ? $data['email'] : null;

    // Путь к файлу file.json
    $file_path = 'file.json';

    // Чтение содержимого файла
    $file_content = file_get_contents($file_path);
    $employees = json_decode($file_content, true);

    // Находим индекс работника в массиве по старому email
    $oldEmail = urldecode($data['oldEmail']); // Предполагая, что вы передаете старый email из клиента
    $index = array_search($oldEmail, array_column($employees, 'email'));

    if ($index === false) {
        http_response_code(404);
        echo json_encode(array('message' => 'Работник с указанным email не найден'));
        exit();
    }

    // Обновляем данные работника с новыми значениями
    $employees[$index]['name'] = isset($data['name']) ? $data['name'] : $employees[$index]['name'];
    $employees[$index]['email'] = $newEmail; // Используем новый email из данных запроса
    $employees[$index]['ubytovna'] = isset($data['ubytovna']) ? $data['ubytovna'] : $employees[$index]['ubytovna'];
    $employees[$index]['country'] = isset($data['country']) ? $data['country'] : $employees[$index]['country'];
    $employees[$index]['mobile'] = isset($data['mobile']) ? $data['mobile'] : $employees[$index]['mobile'];
    $employees[$index]['gender'] = isset($data['gender']) ? $data['gender'] : $employees[$index]['gender'];
    $employees[$index]['birth'] = isset($data['birth']) ? $data['birth'] : $employees[$index]['birth'];
    // Обновите другие поля работника, которые нужно обновить

    // Записываем обновленные данные в файл
    file_put_contents($file_path, json_encode($employees, JSON_PRETTY_PRINT));

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
