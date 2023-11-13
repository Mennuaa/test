<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $stredisko = $_POST['stredisko'];
    $ubytovna = $_POST['ubytovna'];
    $country = $_POST['country'];
    $mobile = $_POST['mobile'];
    $gender = $_POST['gender'];
    $pokoj = $_POST['pokoj'];
    $registr = $_POST['registr'];
    $birth = $_POST['birth'];


    $data = array(
        'name' => $name,
        'email' => $email,
        'stredisko' => '',
        'ubytovna' => '',
        'country' => $country,
        'mobile' => $mobile,
        'gender' => $gender,
        'room' => "",
        'registr' => $registr,
        'birth' => $birth,
    );

    $file_path = 'black-list.json';
    if (file_exists($file_path)) {
        $existing_data = file_get_contents($file_path);
        $existing_array = json_decode($existing_data, true);
        if (is_array($existing_array)) {
            $existing_array[] = $data;
        } else {
            $existing_array = array($data);
        }
    } else {
        $existing_array = array($data);
    }

    $json_data = json_encode($existing_array);

    file_put_contents($file_path, $json_data);
    $filePathUser = 'file.json'; // Замените на путь к вашему файлу file.json

var_dump($email);

// Читаем содержимое файла
$fileContents = file_get_contents($filePathUser);
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
    file_put_contents($filePathUser, json_encode($employees));

    // Отправляем успешный ответ
    http_response_code(200);
    echo json_encode(['message' => 'Сотрудник успешно удален']);
} else {
    // Отправляем ответ об ошибке
    http_response_code(404);
    echo json_encode(['error' => 'Сотрудник с указанным email не найден']);
}
}
?>
