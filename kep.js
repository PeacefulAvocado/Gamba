


function kep(lap, szereplo)
{
 
var szam = lap[0];
var version = "";

if (szam == "A") {
    szam = "ace";
    var version = "2"
} else if (szam == "J") {
    szam = "jack";
    var version = "2"
} else if (szam == "K") {
    szam = "king";
    var version = "2"
}else if (szam == "Q") {
    szam = "queen";
    var version = "2"
}

var laptipus ="";

if (lap[1] == 'D') {
    laptipus = "diamonds";
} else if (lap[1] == 'H') {
    laptipus = "hearts";
}else if (lap[1] == 'S') {
    laptipus = "spades";
}else if (lap[1] == 'C') {
    laptipus ="clubs";
}




var filename = `card-img/${szam}_of_${laptipus}${version}.png`;

 var img = document.createElement("img");
 img.src=filename;
 var src = document.getElementById(szereplo);
 src.appendChild(img);
}


