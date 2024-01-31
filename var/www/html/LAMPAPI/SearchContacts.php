
<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

    // connect to database
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

    // connection error
	if ($conn->connect_error) 
		returnWithError( $conn->connect_error );
	else
	{
		// find search results based on input parameter
		$stmt = $conn->prepare("select * from Contacts where (FirstName like ? or LastName like ? or Phone like ? or Email like ?) and UserID=?");
		$searchParameter = "%" . $inData["search"] . "%";
		$stmt->bind_param("ssssi", $searchParameter, $searchParameter, $searchParameter, $searchParameter, $inData["userId"]);
		$stmt->execute();
		$result = $stmt->get_result();
		
		// add each result to a single string
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
				$searchResults .= ",";
			
			$searchResults .= '{"firstName":"' . $row["FirstName"] . '","lastName":"' . $row["LastName"] . '","phone":"' . $row["Phone"] . '","email":"' . $row["Email"] . '"}';
			$searchCount++;
		}
		
		if( $searchCount == 0 )
			returnWithError( "No Records Found" );
		else
			returnWithInfo( $searchResults );
		
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
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>