
<?php

    $inData = getRequestInfo();

    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $login = $inData["login"];
    $password = $inData["password"];
	
	// connect to Users
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

// clean up Users (for testing)
//$conn->query("DELETE FROM Users WHERE Login='user123'");

	// connection error
	if ($conn->connect_error) {
		returnWithError( $conn->connect_error ); 
	
	} else {

		// check if user already exists
		$stmt = $conn->prepare("SELECT Login, Password FROM Users");
		$stmt->execute();
		$result = $stmt->get_result();
		$register = true;

		if ($result->num_rows > 0) {
			while ($row = $result->fetch_assoc()) {
				echo "login: " . $row["Login"]. "\npassword: ". $row["Password"]. "\n";

				echo "" . $row["Login"]. "==" . $login. " is ";
				$val = $row["Login"] == $login;
				echo $val ? 'true' : 'false';
				echo "\n\n";
				if ($row["Login"] == $login) {
					$register = false;
					break;
				}
			}
		} else {
			echo "0 results";
		}

		// register new user
		if ( $register ) {
			$stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, Login, Password) VALUES(?,?,?,?)");
			$stmt->bind_param("ssss", $firstName, $lastName, $login, $password);
			$stmt->execute();
			returnWithError("");
		} else {
			returnWithError("Username already exists");
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
	
?>
