<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $adress = $_POST['adress'];
    $mobile = $_POST['mobile'];
    $email = $_POST['email'];



    $data = array(
        'name' => $name,
        'adress' => $adress,
        'mobile' => $mobile,
        'email' => $email,
    );

    $file_path = 'ubytovny.json';
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
