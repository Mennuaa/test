<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $ubytovna = $_POST['ubytovna'];
    $id = $_POST['id'];
    $quantity = $_POST['quantity'];




    $data = array(
        'ubytovna' => $ubytovna,
        'id' => $id,
        'quantity' => $quantity,
    );

    $file_path = 'pokoje.json';
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
}
?>
