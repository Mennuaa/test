<?php
// Получаем данные из формы
$name = $_POST['name'];
$email = $_POST['email'];

// Создаем ассоциативный массив с новыми данными
$new_data = array(
    'name' => $name,
    'email' => $email
);

// Загружаем текущее содержимое файла, если он существует
$file_path = 'file.json';
$current_data = file_exists($file_path) ? json_decode(file_get_contents($file_path), true) : array();

// Объединяем старые данные с новыми
$updated_data = array_merge($current_data, $new_data);

// Преобразуем объединенные данные в JSON-строку
$json_data = json_encode($updated_data);

// Записываем данные обратно в файл
file_put_contents($file_path, $json_data);
?>
