
<?php

    $inData = getRequestInfo();

    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $login = $inData["login"];
    $password = $inData["password"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
        $stmt = $conn->prepare("INSERT into Users (FirstName, LastName, Login, Password) VALUES(?,?,?,?)");
		$stmt->bind_param("ssss", $firstName, $lastName, $login, $password);
		$stmt->execute();
		$result = $stmt->get_result();
printf("name is %s %s and login is %s %s \n", $firstName, $lastname, $login, $password);
		if( $row = $result->fetch_assoc()  )
		{
			returnWithError("User already exists");
		}
		else
		{
			returnWithInfo( $row['firstName'], $row['lastName'], $row['login'], $row['password'] );
		}

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

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

    function returnWithInfo( $firstName, $lastName, $login, $password)
	{
		$retValue = '{"firstName":' . $firstName . '","lastName":"' . $lastName . '","login":"' . $login . '","password":"' . $password . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>