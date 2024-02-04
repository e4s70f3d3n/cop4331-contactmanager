
<?php

	$inData = getRequestInfo();
    $ID = $inData["ID"];

    // connect to database
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	
    // connection error
    if ($conn->connect_error)
		returnWithError( $conn->connect_error );
	
    // delete contact
    else 
	{
        $stmt = $conn->prepare("DELETE FROM Contacts WHERE ID=?");
		$stmt->bind_param("i", $ID);
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
