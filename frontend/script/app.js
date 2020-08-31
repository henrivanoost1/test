"use strict";

const lanIP = `${window.location.hostname}:5000`;
const socket = io(`http://${lanIP}`);

let htmlknop
let htmldata


const listenToSocket = function () {
    socket.on("connected", function () {
        console.log("verbonden met socket webserver");

    });
    
    
    

}

const ontvangData = function () {
    socket.emit("F2B_test", {value: "Aanvraag succesvol"})
    socket.on("B2F_waterniveau", (data) => {
        console.log(data)
        document.querySelector(".js-waterniveau").innerHTML = "<p>" + data + "</p>"
    })
    socket.on("B2F_temperature", (data) => {
        console.log(data)
        document.querySelector(".js-temperatuur").innerHTML = "<p>" + data + "°C</p>"

    })
    socket.on("B2F_bowl", (data) => {
        console.log(data)
        var correct_data= Number(data)+20
        console.log(correct_data)
        document.querySelector(".js-bowl").innerHTML = "<p>" + correct_data + " g</p>"

    })
    socket.on("B2F_waterbowl", (data) => {
        console.log(data)
        
        document.querySelector(".js-waterbowl").innerHTML = "<p>" + data + " ml</p>"

    })
    socket.on("B2F_supply", (data) => {
        console.log(data)
        document.querySelector(".js-supply").innerHTML = "<p>" + data + " g</p>"

    })
    
    socket.on("B2F_datachart", (data) => {
        console.log(data)
    
    })  
    

    // socket.on("B2F_datachart", (data) => {
    //     console.log(data)
    //     chart

    // })

}

const listenToButton = function () {
    console.log("listen to button")
    let refreshknop = document.querySelector(".js-refresh")
    refreshknop.addEventListener("click", function () {
        socket.emit("F2B_test", { value: 'Aanvraag Succesvol' })
        ontvangData()
        
    })

    

}

const listenToFeedButton = function () {
    console.log("listen to feed button")
    let feedknop= document.querySelector(".js-feedbtn")
    feedknop.addEventListener("click", function () {
        let weight = document.querySelector(".js-weight").value
        
        // for(i=0;i<time.length;i++) {
        //     if(time[i].checked){
        //         timechecked=time[i].value
        //         if(timechecked=="radio_othertime"){
                    
        //             timechecked==document.querySelector(".js-time").value
        //         }

        //     }
        // }
        socket.emit("F2B_weight", { value: weight})
        
    })
    

}

const listenToButtonRefreshChart = function () {
    console.log("listen to button")
    let refreshknop = document.querySelector(".js-refreshchart")
    refreshknop.addEventListener("click", function () {
        console.log("charts setter")
        var arrayHoev=[]
        var arrayDagen=[]
        socket.emit("F2B_chart", { value: 'aanvraag chart' })
        socket.on("B2F_arrayhoev", (data) => {
            console.log(data)
            arrayHoev= data
            console.log("test "+arrayHoev)


        })
        socket.on("B2F_arraydagen", (data) => {
            console.log(data)
            console.log(data.length)
            arrayDagen= data
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: arrayDagen,
                    datasets: [{
                        label: '# of Visits',
                        data: arrayHoev,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(200, 52, 124, 0.2)'
                            
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(200, 52, 124, 1)'

                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

        })

    
            
        })

    

}



const chart=function(){
    console.log("charts setter")
    var arrayHoev=[]
    var arrayDagen=[]
    socket.emit("F2B_chart", { value: 'aanvraag chart' })
    socket.on("B2F_arrayhoev", (data) => {
        console.log(data)
        arrayHoev= data
        console.log("test "+arrayHoev)


    })
    socket.on("B2F_arraydagen", (data) => {
        console.log(data)
        console.log(data.length)
        arrayDagen= data
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: arrayDagen,
                datasets: [{
                    label: '# of Visits',
                    data: arrayHoev,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(200, 52, 124, 0.2)'
                        
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(200, 52, 124, 1)'

                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    })

    if(arrayHoev.length==7 && arrayDagen.length==7){
        

    }
    
    
}




document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM geladen");
    toggleNav();
    
    listenToSocket();
    console.log(lanIP)
    console.log(socket)
    console.log(window.location.href)
    console.log(window.location)
    console.log(window.location.origin)
    if ((window.location.href == window.location.origin+"/")||(window.location.href == window.location.origin+"/index.html")){
        listenToButton();
        ontvangData();
      }
    if (window.location.href == window.location.origin+"/extraportion.html"){
        console.log("feeder succesvol")
        listenToFeedButton();
      }

      if (window.location.href == window.location.origin+"/charts.html"){
        console.log("charts succesvol")
        chart();
      }
    
    

});

function toggleNav() {
    let toggleTrigger = document.querySelectorAll(".js-toggle-nav");
    for (let i = 0; i < toggleTrigger.length; i++) {
        toggleTrigger[i].addEventListener("touchstart", function () {
            document.querySelector("html").classList.toggle("has-mobile-nav");
        })
    }
}


