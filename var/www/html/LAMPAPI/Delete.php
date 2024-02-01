<?php

include 'config.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Mehtods: DELETE");
header("Access-Control-Allow-Headers:Access-Control-Allow-Mehtods,Content-Type,Access-Control-Allow-Mehtods,Authorization,X-Requested-With");

$requestMethod = $_SERVER["REQUEST_METHOD"];

if($requestMethod == "DELETE") {
    $deleteContact = deleteContact($_GET);
    echo $deleteContact;
} else {
    $data = [
        'message' => $requestMethod, 'Method Not Allowed',
        'status' => 405,
    ];
    header("HTTP/1.0 405 Method Not Allowed");
    echo json_encode($data);
}

function deleteContact($inData)
{
    global $conn;

    if (!isset($inData['id'])) {
        return error422('Error: Contact ID not found in URL.');
    } elseif ($inData['id'] == null) {
        return error422('Error: Contact ID is NULL. Please enter the contact ID.');
    }

    $contactID = mysqli_real_escape_string($conn, $inData['ID']);

    $search = "DELETE FROM Contacts WHERE id='$contactID' LIMIT 1";
    $search_results = mysqli_query($conn, $search);

    if ($search_results) {
        $data = [
            'message' => 'Contact Deleted Successfully.',
            'status' => 200,
        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
    } else {
        $data = [
            'message' => 'Contact Not Found',
            'status' => 404,
        ];
        header("HTTP/1.0 404 Not Found");
        return json_encode($data);
    }
}

?>
