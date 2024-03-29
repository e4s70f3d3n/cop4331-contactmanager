
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
        $stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=? WHERE ID=?");
		$stmt->bind_param("ssssi", $firstName, $lastName, $phone, $email, $ID);
		$stmt->execute();
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