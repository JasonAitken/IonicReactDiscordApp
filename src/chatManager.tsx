

export function sendMessage(message: string, URL: string, name : string, image : string) {
    var request = new XMLHttpRequest();
    request.open("POST", URL);
    //https://discordapp.com/api/webhooks/748385870956200057/SGKDX_0m5_YSoqKlyLSl6cuhQK27P9Og-0rB7B0pCDg6aKR3_m5r9dBjQvus3xwoocvb //test server
    //https://discordapp.com/api/webhooks/747719880077475850/d1VUc0U9te98rpHPiTXIX5dD_DCZA9tBJ3-O8KmbJW9Ws70k2NNEw2zpjZt7FMyuxNw6 //bot chat


    //images
    //"https://www.theflavorbender.com/wp-content/uploads/2019/02/Homemade-Bread-Featured-1-500x500.jpg" // bread

    request.setRequestHeader('Content-type', 'application/json');

    var params = {
        username: name,
        avatar_url: image,
        content: message
    }

    request.send(JSON.stringify(params));
}