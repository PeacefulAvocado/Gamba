//a pakli teteje a legelso
var lapok = [[11, 'AH'], [2, '2H'], [3, '3H'], [4, '4H'], [5, '5H'], [6, '6H'], [7, '7H'], [8, '8H'], [9, '9H'], [10, '10H'], [10, 'JH'], [10, 'QH'], [10, 'KH'],
[11, 'AD'], [2, '2D'], [3, '3D'], [4, '4D'], [5, '5D'], [6, '6D'], [7, '7D'], [8, '8D'], [9, '9D'], [10, '10D'], [10, 'JD'], [10, 'QD'], [10, 'KD'],
[11, 'AS'], [2, '2S'], [3, '3S'], [4, '4S'], [5, '5S'], [6, '6S'], [7, '7S'], [8, '8S'], [9, '9S'], [10, '10S'], [10, 'JS'], [10, 'QS'], [10, 'KS'],
[11, 'AC'], [2, '2C'], [3, '3C'], [4, '4C'], [5, '5C'], [6, '6C'], [7, '7C'], [8, '8C'], [9, '9C'], [10, '10C'], [10, 'JC'], [10, 'QC'], [10, 'KC']
];

var szamlalo = 0;
var jatekos = [];
var dealer = [];
var jertek = 0;
var dertek = 0;
var bet = 0;
var bank = 1000;
var chip_mode = true;

function Keveres()
{
    for (let i = 0; i < 52; i++) {
        let sv = lapok[i];
        let random = Math.floor(Math.random() * (51));
        lapok[i] = lapok[random];
        lapok[random] = sv;
    }
}

function Ertek(szereplo)
{
    if (szereplo == "jatekos")
    {
        jertek = 0;
        jatekos.forEach(item => jertek = jertek + item[0]);
        document.getElementById("jertek").innerHTML = jertek;
    }
    else
    {
        dertek = 0;
        dealer.forEach(item => dertek = dertek + item[0]);
        document.getElementById("dertek").innerHTML = dertek;
    }
}

function Osztas() 
{
    Keveres();
    jatekos.push(lapok[szamlalo]);
    Kep(lapok[szamlalo][1], 'jatekos', "create")
    szamlalo++;
    dealer.push(lapok[szamlalo]);
    Kep('back', 'dealer', "create")
    szamlalo++;
    jatekos.push(lapok[szamlalo]);
    Kep(lapok[szamlalo][1], 'jatekos', "create")
    szamlalo++;
    dealer.push(lapok[szamlalo]);
    Kep(lapok[szamlalo][1], 'dealer', "create")
    szamlalo++;
    document.getElementById("dertek").innerHTML = dealer[1][0];
    Ertek("jatekos");
    if (jertek == 21)
    {
        Stand();
    }
    if (bank >= bet)
    {
        document.getElementById("double").style.display = "block";
    }
}
function Kep(lap, szereplo, create)
{
    var filename ="";
    var szam = lap[0];
    var version = "";
    if(lap == "back") {
        filename ="card-img/back_red.png";
        var img = document.createElement("img");
        img.src=filename;
        img.className="kartyalap";
        img.id ="hatlap";
        var src = document.getElementById(szereplo);
        src.appendChild(img);
    }else {
        if (szam == "A") {
            szam = "ace";
        } else if (szam == "J") {
            szam = "jack";
            var version = "2"
        } else if (szam == "K") {
            szam = "king";
            var version = "2"
        }else if (szam == "Q") {
            szam = "queen";
            var version = "2"
        }else if (szam == "1") {
            szam = "10";
    }
    var index = 1;
    var laptipus ="";
    if (szam == 10)
    {
        var index = 2;
    }
    if (lap[index] == 'D') {
        laptipus = "diamonds";
    } else if (lap[index] == 'H') {
        laptipus = "hearts";
    }else if (lap[index] == 'S') {
        laptipus = "spades";
    }else if (lap[index] == 'C') {
        laptipus ="clubs";
    }
    filename = `card-img/${szam}_of_${laptipus}${version}.png`;
    if(create == "create"){
        var img = document.createElement("img");
        img.src=filename;
        img.className="kartyalap";
        var src = document.getElementById(szereplo);
        src.appendChild(img);
    }
    return filename;
    }
}

function RevealDealer()
{
    var hatlap = document.getElementById("hatlap");
    var filename = Kep(dealer[0][1],"dealer","");
    hatlap.src = filename;
    Ertek("dealer");
}

function Hit()
{  
    Ertek("jatekos");
    for (let i = 0; i < jatekos.length; i++)
    {
        if (jatekos[i][1] == "AH")
        {
            var ahvane = true;
        }
        if (jatekos[i][1] == "AD")
        {
            var advane = true;
        }
        if (jatekos[i][1] == "AS")
        {
            var asvane = true;
        }
        if (jatekos[i][1] == "AC")
        {
            var acvane = true;
        }

    }
    let a = 0;
    jatekos.forEach(item => a = a + item[0]);
    if (a + 11 > 21 && (lapok[szamlalo][1] == "AH" || lapok[szamlalo][1] == "AD" || lapok[szamlalo][1] == "AS" || lapok[szamlalo][1] == "AC"))
    {
            jatekos.push(lapok[szamlalo]);
            Kep(lapok[szamlalo][1], 'jatekos', "create");
            szamlalo++;
            jatekos[jatekos.length - 1][0] = 1;
            Ertek("jatekos");
    }
    else if (a + lapok[szamlalo][0] > 21 && ahvane)
    {
        let b = 0;
        while (jatekos[b][1] != "AH")
        {
            b++;
        }
        jatekos[b][0] = 1;
        jatekos.push(lapok[szamlalo]);
        Kep(lapok[szamlalo][1], 'jatekos', "create");
        szamlalo++;
        Ertek("jatekos");
        if (jertek > 21)
        {
            document.getElementById("jertek").innerHTML = "Bust";
            End(0);
            RevealDealer();
        }
    }
    else if (a + lapok[szamlalo][0] > 21 && advane)
    {
        let b = 0;
        while (jatekos[b][1] != "AD")
        {
            b++;
        }
        jatekos[b][0] = 1;
        jatekos.push(lapok[szamlalo]);
        Kep(lapok[szamlalo][1], 'jatekos', "create");
        szamlalo++;
        Ertek("jatekos");
        if (jertek > 21)
        {
            document.getElementById("jertek").innerHTML = "Bust";
            End(0);
            RevealDealer();
        }
    }
    else if (a + lapok[szamlalo][0] > 21 && asvane)
    {
        let b = 0;
        while (jatekos[b][1] != "AS")
        {
            b++;
        }
        jatekos[b][0] = 1;
        jatekos.push(lapok[szamlalo]);
        Kep(lapok[szamlalo][1], 'jatekos', "create");
        szamlalo++;
        Ertek("jatekos");
        if (jertek > 21)
        {
            document.getElementById("jertek").innerHTML = "Bust";
            End(0);
            RevealDealer();
        }
    }
    else if (a + lapok[szamlalo][0] > 21 && acvane)
    {
        let b = 0;
        while (jatekos[b][1] != "AC")
        {
            b++;
        }
        jatekos[b][0] = 1;
        jatekos.push(lapok[szamlalo]);
        Kep(lapok[szamlalo][1], 'jatekos', "create");
        szamlalo++;
        Ertek("jatekos");
        if (jertek > 21)
        {
            document.getElementById("jertek").innerHTML = "Bust";
            End(0);
            RevealDealer();
        }
    }
    else {
        jatekos.push(lapok[szamlalo]);
        Kep(lapok[szamlalo][1], 'jatekos', "create");
        szamlalo++;
        Ertek("jatekos");
        if (jertek > 21)
        {
            document.getElementById("jertek").innerHTML = "Bust";
            End(0);
            RevealDealer();
        }
    }
    if (jertek == 21)
    {
        Stand();
    }
}

function Stand()
{
    RevealDealer();
    while(jertek >= dertek && dertek < 17)
    {
        for (let i = 0; i < dealer.length; i++)
        {
            if (dealer[i][1] == "AH")
            {
                var dahvane = true;
            }
            if (dealer[i][1] == "AD")
            {
                var dadvane = true;
            }
            if (dealer[i][1] == "AS")
            {
                var dasvane = true;
            }
            if (dealer[i][1] == "AC")
            {
                var dacvane = true;
            }
        }
        let a = 0;
        dealer.forEach(item => a = a + item[0]);
        if (a + 11 > 21 && (lapok[szamlalo][1] == "AH" || lapok[szamlalo][1] == "AD" || lapok[szamlalo][1] == "AS" || lapok[szamlalo][1] == "AC"))
        {
                dealer.push(lapok[szamlalo]);
                Kep(lapok[szamlalo][1], 'dealer', "create");
                szamlalo++;
                dealer[dealer.length - 1][0] = 1;
                Ertek("dealer");
        }
        else if (a + lapok[szamlalo][0] > 21 && dahvane)
        {
            let b = 0;
            while (dealer[b][1] != "AH")
            {
                b++;
            }
            dealer[b][0] = 1;
            dealer.push(lapok[szamlalo]);
            Kep(lapok[szamlalo][1], 'dealer', "create");
            szamlalo++;
            Ertek("dealer");
            if (dertek > 21)
            {
                document.getElementById("dertek").innerHTML = "Bust";
                End(1);
            }
        }
        else if (a + lapok[szamlalo][0] > 21 && dadvane)
        {
            let b = 0;
            while (dealer[b][1] != "AD")
            {
                b++;
            }
            dealer[b][0] = 1;
            dealer.push(lapok[szamlalo]);
            Kep(lapok[szamlalo][1], 'dealer', "create");
            szamlalo++;
            Ertek("dealer");
            if (dertek > 21)
            {
                document.getElementById("dertek").innerHTML = "Bust";
                End(1);
            }
        }
        else if (a + lapok[szamlalo][0] > 21 && dasvane)
        {
            let b = 0;
            while (dealer[b][1] != "AS")
            {
                b++;
            }
            dealer[b][0] = 1;
            dealer.push(lapok[szamlalo]);
            Kep(lapok[szamlalo][1], 'dealer', "create");
            szamlalo++;
            Ertek("dealer");
            if (dertek > 21)
            {
                document.getElementById("dertek").innerHTML = "Bust";
                End(1);
            }
        }
        else if (a + lapok[szamlalo][0] > 21 && dacvane)
        {
            let b = 0;
            while (dealer[b][1] != "AC")
            {
                b++;
            }
            dealer[b][0] = 1;
            dealer.push(lapok[szamlalo]);
            Kep(lapok[szamlalo][1], 'dealer', "create");
            szamlalo++;
            Ertek("dealer");
            if (dertek > 21)
            {
                document.getElementById("dertek").innerHTML = "Bust";
                End(1);
            }
        }
        else {
            dealer.push(lapok[szamlalo]);
            Kep(lapok[szamlalo][1], 'dealer', "create");
            szamlalo++;
            Ertek("dealer");
            if (dertek > 21)
            {
                document.getElementById("dertek").innerHTML = "Bust";
                End(1);
            }
    }
}
if (dertek <= 21)
{
    End(2);
}
}

function Start()
{
    if (bet != 0)
    {
        Osztas();
        document.getElementById("jatek").style.display = "block";
        document.getElementById("gombok").style.display = "none";
    }

}

function Mode()
{
    if(chip_mode)
    {
        chip_mode=false;
        var button = document.getElementById("modeselector");
        button.innerHTML="-";
        button.style.background="darkred";

    } else {
        chip_mode=true;
        var button = document.getElementById("modeselector");
        button.innerHTML="+";
        button.style.background="Green";
    }
}

function Add(amount)
{
    if (chip_mode) {
      if (amount <= bank)
    {
        bet = bet + amount;
        bank = bank - amount;
        document.getElementById("bet").innerHTML = bet;
        document.getElementById("bank").innerHTML = bank;
    }
    else if (amount == "allin")
    {
        bet = bet + bank;
        bank = 0;
        document.getElementById("bet").innerHTML = bet;
        document.getElementById("bank").innerHTML = bank;
    } 
    }else{
        if (amount <= bet)
    {
        bank = bank + amount;
        bet = bet - amount;
        document.getElementById("bet").innerHTML = bet;
        document.getElementById("bank").innerHTML = bank;
    }
}
    
}

function End(bust)
{
    // 0 - játékos bust
    // 1 - dealer bust
    // 2- többi
    let eredmeny = "";
    if (bust == 0)
    {
        bet = 0;
        document.getElementById("bet").innerHTML = 0;
        document.getElementById("bank").innerHTML = bank;
        eredmeny = "Vesztettél!";
    }
    else if (bust == 1)
    {
        bank = bank + 2 * bet;
        document.getElementById("bet").innerHTML = 0;
        document.getElementById("bank").innerHTML = bank;
        eredmeny = "Nyertél!";
    }
    else if (bust == 2)
    {
        if (jertek > dertek)
        {
            bank = bank + 2 * bet;
            document.getElementById("bet").innerHTML = 0;
            document.getElementById("bank").innerHTML = bank;
            eredmeny = "Nyertél!";
        }
        else if (dertek > jertek)
        {
            bet = 0;
            document.getElementById("bet").innerHTML = 0;
            document.getElementById("bank").innerHTML = bank;
            eredmeny = "Vesztettél!";
        }
        else if (jertek == dertek)
        {
            bank = bank + bet;
            document.getElementById("bet").innerHTML = 0;
            document.getElementById("bank").innerHTML = bank;
            eredmeny = "Push!";
        }
    }
    document.getElementById("eredmeny").innerHTML = eredmeny;
    document.getElementById("overlay").style.display = "block";
    jatekos = [];
    dealer = [];
    szamlalo = 0; 
    bet = 0;
    sleep(2000).then(() => {
        document.getElementById("overlay").style.display = "none";
    });
    sleep(2000).then(() => {
        Menu();
        document.getElementById("double").style.display = "none";
    });
    
}

function Menu()
{
    var images = document.getElementsByClassName('kartyalap');
    var l = images.length;
    for (var i = 0; i < l; i++) {
        images[0].parentNode.removeChild(images[0]);
    }
    document.getElementById("jatek").style.display = "none";
    document.getElementById("gombok").style.display = "block";
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function Double() 
{
    bank = bank - bet;
    document.getElementById("bank").innerHTML = bank;
    bet = bet * 2;
    document.getElementById("bet").innerHTML = bet;
    document.getElementById("double").style.display = "none";
    Hit();
    Stand();
}

