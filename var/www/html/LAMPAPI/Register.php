
<?php

    $inData = getRequestInfo();
// for testing
if (is_null($inData)) {
printf("JSON cannot be decoded\n");}

    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $login = $inData["login"];
    $password = $inData["password"];

// for testing
printf("first name is %s", $firstName);
printf("\nlast name is %s", $lastName);
printf("\nlogin is %s", $login);
printf("\npassword is %s", $password);
	
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

// clean up Users (for testing)
$conn->query("DELETE FROM Users WHERE Login='user123'");

	if ($conn->connect_error) 
	{
// for testing
printf("Error!!!");

		returnWithError( $conn->connect_error );
	} 
	else
	{
// for testing
printf("\nNo connection error\n");

        $stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, Login, Password) VALUES(?,?,?,?)");
		$stmt->bind_param("ssss", $firstName, $lastName, $login, $password);

		if ($stmt->execute()) 
		{
// for testing
printf("Executed succesfully\n");

			returnWithInfo( $row['firstName'], $row['lastName'], $row['login'], $row['password'] );
		}
		/*
		$result = $stmt->get_result();

		if( $row === $result->fetch_assoc()  )
		{
			returnWithError("User already exists");
		}
		else
		{
			returnWithInfo( $row['firstName'], $row['lastName'], $row['login'], $row['password'] );
		}*/

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
		$retValue = '{"firstName":"' . $firstName . '","lastName":"' . $lastName . '","login":"' . $login . '","password":"' . $password . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
