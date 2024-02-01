
<?php

	$inData = getRequestInfo();
	
    $login = $inData["login"];
    $newPassword = $inData["newPassword"];

    // connect to database
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	
    // connection error
    if ($conn->connect_error)
		returnWithError( $conn->connect_error );
	
    // update password
    else 
	{
        $stmt = $conn->prepare("UPDATE Users SET Password=? WHERE Login=?");
		$stmt->bind_param("ss", $newPassword, $login);
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