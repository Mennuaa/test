<?php
$file_path = 'file.json';
if (file_exists($file_path)) {
    // Очищаем файл (записываем пустую строку)
    file_put_contents($file_path, '');
    echo "Файл успешно очищен.";
} else {
    echo "Файл не существует.";
}
?>
