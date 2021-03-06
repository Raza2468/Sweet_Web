var url = window.location.href.split(":");

if (url[0]==="https")
{
    url = "https://databaselogin.herokuapp.com/"
}
else{
    url = "http://localhost:3001"
}



export default url;