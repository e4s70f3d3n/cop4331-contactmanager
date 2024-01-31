
<?php

	$inData = getRequestInfo();
	
    $firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phone = $inData["phone"];
	$email = $inData["email"];
    $ID = $inData["ID"];

    // connect to database
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	
    // connection error
    if ($conn->connect_error)
		returnWithError( $conn->connect_error );
	
    // update contact
    else 
	{
        if ($firstName && $firstName != "")
        {
            $stmt = $conn->prepare("UPDATE Contacts SET FirstName=? WHERE ID=?");
            $stmt->bind_param("si", $firstName, $ID);
            $stmt->execute();
        }
        if ($lastName && $lastName != "")
        {
            $stmt = $conn->prepare("UPDATE Contacts SET LastName=? WHERE ID=?");
            $stmt->bind_param("si", $lastName, $ID);
            $stmt->execute();
        }
        if ($phone && $phone != "")
        {
            $stmt = $conn->prepare("UPDATE Contacts SET Phone=? WHERE ID=?");
            $stmt->bind_param("si", $phone, $ID);
            $stmt->execute();
        }
        if ($email && $email != "")
        {
            $stmt = $conn->prepare("UPDATE Contacts SET Email=? WHERE ID=?");
            $stmt->bind_param("si", $email, $ID);
            $stmt->execute();
        }
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
