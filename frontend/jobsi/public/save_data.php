<?php

// Assuming that the form submission is made to this script.

// The path to the JSON files
$file_path = 'file.json';
$notification_file_path = 'notifications.json';
$blacklist_file_path = 'black-list.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $name = $_POST['name'];
    $email = $_POST['email'];
    $stredisko = $_POST['stredisko'];
    $ubytovna = $_POST['ubytovna'];
    $country = $_POST['country'];
    $mobile = $_POST['mobile'];
    $gender = $_POST['gender'];
    // $pokoj = $_POST['pokoj'];
    $registr = $_POST['registr'];
    $birth = $_POST['birth'];
    $blacklist_data = file_exists($blacklist_file_path) ? file_get_contents($blacklist_file_path) : '';
    $blacklist = $blacklist_data ? json_decode($blacklist_data, true) : [];

    foreach ($blacklist as $blacklistedUser) {
        if ($blacklistedUser['name'] == $name && $blacklistedUser['birth'] == $birth) {
            // User is in blacklist, return a suitable response
            echo json_encode(['status' => 'error', 'message' => 'User is in black list']);
            return; 
            die;// Stop further processing
        }
    }
    // Combine the new user data
    $data = [
        'name' => $name,
        'email' => $email,
        'stredisko' => $stredisko,
        'ubytovna' => $ubytovna,
        'country' => $country,
        'mobile' => $mobile,
        'gender' => $gender,
        'room' => $_POST['pokoj'] ? $_POST['pokoj'] : "",
        'registr' => $registr,
        'birth' => $birth,
        'created_at' => time() // Record the creation time
    ];

    // Load existing data and append the new user
    $existing_data = file_exists($file_path) ? file_get_contents($file_path) : '';
    $existing_array = $existing_data ? json_decode($existing_data, true) : [];
    $existing_array[] = $data;
    file_put_contents($file_path, json_encode($existing_array, JSON_PRETTY_PRINT));
}

// Now we need a separate process that runs this check.
// This would ideally be a separate script called via a cron job.
$users = json_decode(file_get_contents($file_path), true);

foreach ($users as $user) {
    if (empty($user['stredisko']) && (time() - $user['created_at'] >= 3)) {
        $first_name = explode(' ', $user['name'])[0]; // Get the first name from the full name

        // Prepare the notification data
        $notification = [
            "notification" => "{$first_name} was not checked into the hotel for 2 days",
            "user_id" => 1, 
            "user_name" => $first_name,
            "created_date" => date("d-m-Y")
        ];

        // Load existing notifications and append the new one
        $existing_notifications = file_exists($notification_file_path) ? file_get_contents($notification_file_path) : '[]';
        $notifications_array = json_decode($existing_notifications, true);
        $notifications_array[] = $notification;
        $notifications_added = true;
    }
}

// if ($notifications_added) {
//     file_put_contents($notification_file_path, json_encode($notifications_array, JSON_PRETTY_PRINT));
// }

?>





