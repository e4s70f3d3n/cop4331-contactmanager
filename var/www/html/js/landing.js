function selectTab(tabIndex) 
{
    // Declare all variables
    let i, tabContent;

    tabContent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContent.length; i++) 
	{
        tabContent[i].style.display = "none";
    }
    //Show the Selected Tab
    document.getElementById(tabIndex).style.display = "block";
}

function unhideMain()
{
    let tabContent = document.getElementsByClassName("tabContent");
	tabContent[0].style.display = "block";
}
