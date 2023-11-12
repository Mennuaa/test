<?php
// Получение данных из POST-запроса
$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->email) || !isset($data->password)) {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(['message' => 'Invalid request']);
    exit();
}

$email = $data->email;
$password = $data->password;

// В данном примере используется простой файл с пользователями и хэшированными паролями
$users = [
    'user1@example.com' => '$2y$10$25iM6DKyI/nVXZ7WGR9ikunpWXeVxxS7NPTtNsc9z9C1lZFDNo5hm', // Пароль: password1
    'user2@example.com' => '$2y$10$f30f4tLyBc64tkrWQWbw3e3jCp0pC5Fjj82mH1Xj5VDW0mEaJ7y1e', // Пароль: password2
    // Добавьте других пользователей по аналогии
];

if (isset($users[$email]) && password_verify($password, $users[$email])) {
    // Если пользователь найден и пароль верный
    echo json_encode(['message' => 'Login successful']);
} else {
    // Если пользователь не найден или пароль неверный
    header('HTTP/1.1 401 Unauthorized');
    echo json_encode(['message' => 'Login failed']);
}
?>
