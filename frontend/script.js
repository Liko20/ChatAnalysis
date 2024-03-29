

function execquery() {
    let token = "";
    let link = document.getElementById("text").value;
    
    if (checkLink(link)) {

        if(sessionStorage.getItem("link") == null && sessionStorage.getItem("link") == null)
        {
            //console.log("both null")
        }
        else if (sessionStorage.getItem("token") != null && sessionStorage.getItem("link") != null) {
            if( sessionStorage.getItem("link") == link)
            {
                token=sessionStorage.getItem('token');
                //console.log(token, " <- same url so using next token")
            }
            else{
               // console.log("nex url session clear")
                sessionStorage.clear()
            }
        }
        let local="http://localhost:5000/getdata"
        let hostedlink="https://chat-analysis-brown.vercel.app/getdata"

        fetch(hostedlink, {
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

                    console.log(data)
                    if(data.token!=undefined &&  data.emotionlist!=undefined)
                    {
                        //console.log(data.token, data.emotionlist ,"response")
                        showResults(data.emotionlist)
                    }
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

function showResults(emotionlist)
{
    let arr = ["S.no" , "Emotion" , "Frequency"];
    const head = document.querySelector("thead");
    let tags="<tr>";
    for(let i=0;i<arr.length;i++)
    {
        tags+=`<th>${arr[i]}</th>`
    }
    tags+="</tr>";
    head.innerHTML=tags;

    let body=document.querySelector("tbody");

    let bodydata="";
    let i=0;
    for(keys in emotionlist){
        bodydata+=`<tr>
        <td>${i}</td>
        <td>${keys}</td>
        <td>${emotionlist[keys]}</td>
        </tr>
        `
        i++;
    }
    body.innerHTML=bodydata

}



