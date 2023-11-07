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
        'stredisko' => $stredisko,
        'ubytovna' => $ubytovna,
        'country' => $country,
        'mobile' => $mobile,
        'gender' => $gender,
        'room' => $pokoj,
        'registr' => $registr,
        'birth' => $birth,
    );

    $file_path = 'file.json';
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
