
function execquery() {
    let token = "";
    let link = document.getElementById("text").value;
    

    if (checkLink(link)) {

        if(sessionStorage.getItem("link") == null && sessionStorage.getItem("link") == null)
        {
            console.log("both null")
        }
        else if (sessionStorage.getItem("token") != null && sessionStorage.getItem("link") != null) {
            if( sessionStorage.getItem("link") == link)
            {
                token=sessionStorage.getItem('token');
                console.log(token, " <- same url so using next token")
            }
            else{
                console.log("nex url session clear")
                sessionStorage.clear()
            }
        }

        fetch("https://chat-analysis-brown.vercel.app/getdata", {
            method: "POST",
            body: JSON.stringify({
                link: link,
                nextPageToken: token
            }),
            headers: {
                "content-type": "application/json; charset=UTF-8"
            }
        }
        ).then((res) => {
            const pro = res.json()
            pro.then((data) => {
                if(data.err != undefined)
                {
                    alert(data.err)
                }
                else{
                    console.log(data.token, data.emotionlist ,"response")
                    sessionStorage.setItem("token", data.token)
                    sessionStorage.setItem("link",link)
                }
                
            }).catch((err)=>{
                sessionStorage.clear()
                alert(err)
            })
        }).catch((err)=>{
            sessionStorage.clear()
            alert(err)
        })
        
    }
}

function checkLink(link)
{
    if(link.length >= 60)
    {
        alert("enter valid link");
        return false;
    }
    else if(link.search("www.youtube.com") == -1  || link.search("=")== -1) {
        alert("enter valid link");
        return false;
    }
    else{
        return true;
    }
}
