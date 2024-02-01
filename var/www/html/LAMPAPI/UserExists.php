
<?php

	$inData = getRequestInfo();

	// connect to database
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
	
	// connection error
	if( $conn->connect_error ) 
		returnWithError( $conn->connect_error );

    // check that the user exists
	else 
	{
		$stmt = $conn->prepare("SELECT ID,firstName,lastName FROM Users WHERE Login=?");
		$stmt->bind_param("s", $inData["login"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if ( $row = $result->fetch_assoc() )
            returnWithError($row['ID'], "");
		else
			returnWithError("No Records Found");

		$stmt->close();
		$conn->close();
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
	
	function returnWithError( $id, $err )
	{
		$retValue = '{"id":' . $id . ',"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
