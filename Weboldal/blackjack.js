//a pakli teteje a legelso
var lapok = [[11, 'AH'], [2, '2H'], [3, '3H'], [4, '4H'], [5, '5H'], [6, '6H'], [7, '7H'], [8, '8H'], [9, '9H'], [10, '10H'], [10, 'JH'], [10, 'QH'], [10, 'KH'],[11, 'AD'], [2, '2D'], [3, '3D'], [4, '4D'], [5, '5D'], [6, '6D'], [7, '7D'], [8, '8D'], [9, '9D'], [10, '10D'], [10, 'JD'], [10, 'QD'], [10, 'KD'],[11, 'AS'], [2, '2S'], [3, '3S'], [4, '4S'], [5, '5S'], [6, '6S'], [7, '7S'], [8, '8S'], [9, '9S'], [10, '10S'], [10, 'JS'], [10, 'QS'], [10, 'KS'],[11, 'AC'], [2, '2C'], [3, '3C'], [4, '4C'], [5, '5C'], [6, '6C'], [7, '7C'], [8, '8C'], [9, '9C'], [10, '10C'], [10, 'JC'], [10, 'QC'], [10, 'KC']];

//var lapok =[[10, '10D'], [10, 'JD'], [10, 'QD'], [10, 'KD'],[10, '10H'], [10, 'JH'], [10, 'QH'], [10, 'KH'],[10, '10S'], [10, 'JS'], [10, 'QS'], [10, 'KS'],[10, '10C'], [10, 'JC'], [10, 'QC'], [10, 'KC'],[11, 'AH'], [2, '2H'], [3, '3H'], [4, '4H'], [5, '5H'], [6, '6H'], [7, '7H'], [8, '8H'], [9, '9H'],[11, 'AD'], [2, '2D'], [3, '3D'], [4, '4D'], [5, '5D'], [6, '6D'], [7, '7D'], [8, '8D'], [9, '9D'],[11, 'AS'], [2, '2S'], [3, '3S'], [4, '4S'], [5, '5S'], [6, '6S'], [7, '7S'], [8, '8S'], [9, '9S'],[11, 'AC'], [2, '2C'], [3, '3C'], [4, '4C'], [5, '5C'], [6, '6C'], [7, '7C'], [8, '8C'], [9, '9C']]

//var lapok =[[11, 'AH'], [10, 'QD'], [11, 'AD'], [11, 'AH'],[10, 'JD'], [7, '7H'], [8, '8H'], [6, '6H'],[10, '10S'], [10, 'JS'], [10, 'QS'], [10, 'KS'],[10, '10C'], [10, 'JC'], [10, 'QC'], [10, 'KC'],[11, 'AH'], [2, '2H'], [3, '3H'], [4, '4H'], [5, '5H'], [6, '6H'], [7, '7H'], [8, '8H'], [9, '9H'],[11, 'AD'], [2, '2D'], [3, '3D'], [4, '4D'], [5, '5D'], [6, '6D'], [7, '7D'], [8, '8D'], [9, '9D'],[11, 'AS'], [2, '2S'], [3, '3S'], [4, '4S'], [5, '5S'], [6, '6S'], [7, '7S'], [8, '8S'], [9, '9S'],[11, 'AC'], [2, '2C'], [3, '3C'], [4, '4C'], [5, '5C'], [6, '6C'], [7, '7C'], [8, '8C'], [9, '9C']]

var szamlalo = 0;
var jatekos = [];
var jatekos_split = [];  
var dealer = [];
var jertek = 0;
var jsertek = 0;
var dertek = 0;
var bet = 0;
var bank = 1000;
var chip_mode = true;
var split = false;  
var splitsz = 0;
var aceacesplitvane = false;
var double = -1;




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
        document.getElementById("jertek").innerHTML = "Érték: " +jertek;
    }
    else if (szereplo == "dealer")
    {
        dertek = 0;
        dealer.forEach(item => dertek = dertek + item[0]);
        document.getElementById("dertek").innerHTML = "Érték: " +dertek;
    }
    else if (szereplo == "jatekos_split")  
    {
        jsertek = 0;
        jatekos_split.forEach(item => jsertek = jsertek + item[0]);
        document.getElementById("jertek").innerHTML = "Érték: " +jsertek;
    }
}

function Osztas() 
{
    document.getElementById("insurance").style.display = "none";
    //Keveres();
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
    document.getElementById("dertek").innerHTML = "Érték: "+dealer[1][0];
    Ertek("jatekos");
    if (jertek == 21)
    {
        End(4);
        
        
    }
    if (bank >= bet)
    {
        document.getElementById("double").style.display = "inline";
    }
    if (jatekos[0][0][0] == jatekos[1][0][0] && bank >= bet)  
    {
        document.getElementById("split").style.display = "inline";
    }
    if (jatekos[0][1][0] == "A" && jatekos[1][1][0] == "A")
    {
        jatekos[0][0] = 1;
        Ertek("jatekos")
        aceacesplitvane = true;
    }
    if (dealer[1][1][0] === "A" && bet/2 <= bank)
    {
        document.getElementById("insurance").style.display = "inline";
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

async function RevealDealer()
{
    fordit();
    await sleep(200);
    var hatlap = document.getElementById("hatlap");
    var filename = Kep(dealer[0][1],"dealer","");
    hatlap.src = filename;
    Ertek("dealer");
    if (dertek > 21 && dealer[0][1] == "AH" || dealer[0][1] == "AD" || dealer[0][1] == "AS" || dealer[0][1] == "AC")
    {
        dealer[0][0] = 1;
    }
    Ertek("dealer");
}

function Hit()
{  
    document.getElementById("double").style.display = "none";
    document.getElementById("insurance").style.display = "none";
    document.getElementById("split").style.display = "none";
    if (splitsz == 0)  
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
                if (split)  
                {
                    Stand();
                }
                else
                {
                    End(0);
                    RevealDealer();
                }
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
                if (split)  
                {
                    Stand();
                }
                else
                {
                    End(0);
                    RevealDealer();
                }
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
                if (split)  
                {
                    Stand();
                }
                else
                {
                    End(0);
                    RevealDealer();
                }
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
                if (split)  
                {
                    Stand();
                }
                else
                {
                    End(0);
                    RevealDealer();
                }
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
                if (split)  
                {
                    Stand();
                }
                else
                {
                    End(0);
                    RevealDealer();
                }
            }
        }
        if (jertek == 21)
        {
            Stand();
        }
    }
    else // slpitv
    {
        Ertek("jatekos_split");
        for (let i = 0; i < jatekos_split.length; i++)
        {
            if (jatekos_split[i][1] == "AH")
            {
                var ahvane = true;
            }
            if (jatekos_split[i][1] == "AD")
            {
                var advane = true;
            }
            if (jatekos_split[i][1] == "AS")
            {
                var asvane = true;
            }
            if (jatekos_split[i][1] == "AC")
            {
                var acvane = true;
            }

        }
        let a = 0;
        jatekos_split.forEach(item => a = a + item[0]);
        if (a + 11 > 21 && (lapok[szamlalo][1] == "AH" || lapok[szamlalo][1] == "AD" || lapok[szamlalo][1] == "AS" || lapok[szamlalo][1] == "AC"))
        {
                jatekos_split.push(lapok[szamlalo]);
                Kep(lapok[szamlalo][1], 'jatekos', "create");
                szamlalo++;
                jatekos_split[jatekos.length - 1][0] = 1;
                Ertek("jatekos_split");
        }
        else if (a + lapok[szamlalo][0] > 21 && ahvane)
        {
            let b = 0;
            while (jatekos_split[b][1] != "AH")
            {
                b++;
            }
            jatekos_split[b][0] = 1;
            jatekos_split.push(lapok[szamlalo]);
            Kep(lapok[szamlalo][1], 'jatekos', "create");
            szamlalo++;
            Ertek("jatekos_split");
            if (jsertek > 21)
            {
                document.getElementById("jertek").innerHTML = "Bust";
                if (split)  
                {
                    Stand();
                }
                else
                {
                    End(0);
                    RevealDealer();
                }
            }
        }
        else if (a + lapok[szamlalo][0] > 21 && advane)
        {
            let b = 0;
            while (jatekos_split[b][1] != "AD")
            {
                b++;
            }
            jatekos_split[b][0] = 1;
            jatekos_split.push(lapok[szamlalo]);
            Kep(lapok[szamlalo][1], 'jatekos', "create");
            szamlalo++;
            Ertek("jatekos_split");
            if (jsertek > 21)
            {
                document.getElementById("jertek").innerHTML = "Bust";
                if (split)  
                {
                    Stand();
                }
                else
                {
                    End(0);
                    RevealDealer();
                }
            }
        }
        else if (a + lapok[szamlalo][0] > 21 && asvane)
        {
            let b = 0;
            while (jatekos_split[b][1] != "AS")
            {
                b++;
            }
            jatekos_split[b][0] = 1;
            jatekos_split.push(lapok[szamlalo]);
            Kep(lapok[szamlalo][1], 'jatekos', "create");
            szamlalo++;
            Ertek("jatekos_split");
            if (jsertek > 21)
            {
                document.getElementById("jertek").innerHTML = "Bust";
                if (split)  
                {
                    Stand();
                }
                else
                {
                    End(0);
                    RevealDealer();
                }
            }
        }
        else if (a + lapok[szamlalo][0] > 21 && acvane)
        {
            let b = 0;
            while (jatekos_split[b][1] != "AC")
            {
                b++;
            }
            jatekos_split[b][0] = 1;
            jatekos_split.push(lapok[szamlalo]);
            Kep(lapok[szamlalo][1], 'jatekos', "create");
            szamlalo++;
            Ertek("jatekos_split");
            if (jsertek > 21)
            {
                document.getElementById("jertek").innerHTML = "Bust";
                if (split)  
                {
                    Stand();
                }
                else
                {
                    End(0);
                    RevealDealer();
                }
            }
        }
        else {
            jatekos_split.push(lapok[szamlalo]);
            Kep(lapok[szamlalo][1], 'jatekos', "create");
            szamlalo++;
            Ertek("jatekos_split");
            if (jsertek > 21)
            {
                document.getElementById("jertek").innerHTML = "Bust";
                if (split)  
                {
                    Stand();
                }
                else
                {
                    End(0);
                    RevealDealer();
                }
            }
        }
        if (jsertek == 21)
        {
            Stand();
        }
    }
}

async function Stand()
{
    if (!split || splitsz == 1)  
    {
        await RevealDealer();
        Ertek("dealer"); 
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
                await sleep(400)
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
                await sleep(400)
                dealer.push(lapok[szamlalo]);
                Kep(lapok[szamlalo][1], 'dealer', "create");
                szamlalo++;
                Ertek("dealer");
                if (dertek > 21)
                {
                    document.getElementById("dertek").innerHTML = "Bust";
                    if (split)
                    {
                        await End(3);
                    }
                    else 
                    {
                        End(1);
                    }
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
                await sleep(400)
                dealer.push(lapok[szamlalo]);
                Kep(lapok[szamlalo][1], 'dealer', "create");
                szamlalo++;
                Ertek("dealer");
                if (dertek > 21)
                {
                    document.getElementById("dertek").innerHTML = "Bust";
                    if (split)
                    {
                        await End(3);
                    }
                    else 
                    {
                        End(1);
                    }
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
                await sleep(400)
                dealer.push(lapok[szamlalo]);
                Kep(lapok[szamlalo][1], 'dealer', "create");
                szamlalo++;
                Ertek("dealer");
                if (dertek > 21)
                {
                    document.getElementById("dertek").innerHTML = "Bust";
                    if (split)
                    {
                        await End(3);
                    }
                    else 
                    {
                        End(1);
                    }
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
                await sleep(400)
                dealer.push(lapok[szamlalo]);
                Kep(lapok[szamlalo][1], 'dealer', "create");
                szamlalo++;
                Ertek("dealer");
                if (dertek > 21)
                {
                    document.getElementById("dertek").innerHTML = "Bust";
                    if (split)
                    {
                        await End(3);
                    }
                    else 
                    {
                        End(1);
                    }
                }
            }
            else {
                await sleep(400)
                dealer.push(lapok[szamlalo]);
                Kep(lapok[szamlalo][1], 'dealer', "create");
                szamlalo++;
                Ertek("dealer");
                if (dertek > 21)
                {
                    document.getElementById("dertek").innerHTML = "Bust";
                    if (split)
                    {
                        await End(3);
                    }
                    else 
                    {
                        End(1);
                    }
                }
                Ertek("dealer")
        }
        }
        if (split && splitsz == 1)  
        {
            End(3);
        }
        else if (dertek <= 21)
        {
            End(2);
        }
        
    }
    else
    {
        var images = document.getElementsByClassName('kartyalap');
        var l = images.length;
        for (var i = 0; i < l; i++) {
        images[0].parentNode.removeChild(images[0]);
        }
        Kep("back", "dealer", "create");
        Kep(dealer[1][1], "dealer", "create");
        Kep(jatekos_split[0][1], "jatekos", "create");
        jatekos_split.push(lapok[szamlalo]);
        Kep(lapok[szamlalo][1], "jatekos", "create");
        szamlalo++;
        splitsz = splitsz + 1;
        Ertek("jatekos_split");

        if (bank >= bet)
        {
            document.getElementById("double").style.display = "inline";
        }
        if (jsertek == 21)
        {
            Stand();
        }
    }
}

function Start()
{
    document.getElementById("beuszo").style.opacity = "1";
    //lapok = [[11, 'AH'], [2, '2H'], [3, '3H'], [4, '4H'], [5, '5H'], [6, '6H'], [7, '7H'], [8, '8H'], [9, '9H'], [10, '10H'], [10, 'JH'], [10, 'QH'], [10, 'KH'],[11, 'AD'], [2, '2D'], [3, '3D'], [4, '4D'], [5, '5D'], [6, '6D'], [7, '7D'], [8, '8D'], [9, '9D'], [10, '10D'], [10, 'JD'], [10, 'QD'], [10, 'KD'],[11, 'AS'], [2, '2S'], [3, '3S'], [4, '4S'], [5, '5S'], [6, '6S'], [7, '7S'], [8, '8S'], [9, '9S'], [10, '10S'], [10, 'JS'], [10, 'QS'], [10, 'KS'],[11, 'AC'], [2, '2C'], [3, '3C'], [4, '4C'], [5, '5C'], [6, '6C'], [7, '7C'], [8, '8C'], [9, '9C'], [10, '10C'], [10, 'JC'], [10, 'QC'], [10, 'KC']];
    lapok = [[3, '3H'], [11, 'AH'], [3, '3H'], [11, 'AH'], [5, '5H'], [6, '6H'], [7, '7H'], [8, '8H'], [9, '9H'], [10, '10H'], [10, 'JH'], [10, 'QH'], [10, 'KH'],[11, 'AD'], [2, '2D'], [3, '3D'], [4, '4D'], [5, '5D'], [6, '6D'], [7, '7D'], [8, '8D'], [9, '9D'], [10, '10D'], [10, 'JD'], [10, 'QD'], [10, 'KD'],[11, 'AS'], [2, '2S'], [3, '3S'], [4, '4S'], [5, '5S'], [6, '6S'], [7, '7S'], [8, '8S'], [9, '9S'], [10, '10S'], [10, 'JS'], [10, 'QS'], [10, 'KS'],[11, 'AC'], [2, '2C'], [3, '3C'], [4, '4C'], [5, '5C'], [6, '6C'], [7, '7C'], [8, '8C'], [9, '9C'], [10, '10C'], [10, 'JC'], [10, 'QC'], [10, 'KC']];
    jatekos = [];
    jatekos_split = [];
    dealer = [];
    if (bet != 0)
    {
        Osztas();
        document.getElementById("jatek").style.display = "block";
        document.getElementById("gombok").style.display = "none";
        document.getElementById("deal").style.display = "none";
        document.getElementById("row.operator").style.display = "none";
        document.getElementById("deal").style.display = "none";
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
        document.getElementById("bet").innerHTML ="Bet:"+ bet;
        document.getElementById("bank").innerHTML = "Bank:" +bank;
    }
    else if (amount == "allin")
    {
        bet = bet + bank;
        bank = 0;
        document.getElementById("bet").innerHTML ="Bet:"+ bet;
        document.getElementById("bank").innerHTML = "Bank:" +bank;
    } 
    }else{
        if (amount <= bet)
    {
        bank = bank + amount;
        bet = bet - amount;
        document.getElementById("bet").innerHTML ="Bet:"+ bet;
        document.getElementById("bank").innerHTML = "Bank:" +bank;
    }
}
    
}

async function End(bust)
{
    // 0 - játékos bust
    // 1 - dealer bust
    // 2 - többi
    // 3 - split
    // 4 - jetekos blackjack
    Ertek("dealer");    
    let eredmeny = "";
    if (bust == 0)
    {
        bet = 0;
        document.getElementById("bet").innerHTML ="Bet:"+ 0;
        document.getElementById("bank").innerHTML = "Bank:" +bank;
        eredmeny = "Vesztettél!";
    }
    else if (bust == 1)
    {
        bank = bank + 2 * bet;
        document.getElementById("bet").innerHTML ="Bet:"+ 0;
        document.getElementById("bank").innerHTML = "Bank:" +bank;
        eredmeny = "Nyertél!";
    }
    else if (bust == 2)
    {
        if (jertek > dertek && jertek <= 21)
        {
            bank = bank + 2 * bet;
            document.getElementById("bet").innerHTML ="Bet:"+ 0;
            document.getElementById("bank").innerHTML = "Bank:" +bank;
            eredmeny = "Nyertél!";
        }
        else if (dertek > jertek || jertek > 21)
        {
            bet = 0;
            document.getElementById("bet").innerHTML ="Bet:"+ 0;
            document.getElementById("bank").innerHTML = "Bank:" +bank;
            eredmeny = "Vesztettél!";
        }
        else if (jertek == dertek)
        {
            bank = bank + bet;
            document.getElementById("bet").innerHTML ="Bet:"+ 0;
            document.getElementById("bank").innerHTML = "Bank:" +bank;
            eredmeny = "Push!";
        }
    }
    else if (bust == 3)  
    {
        let bet1 = bet;
        let bet2 = bet;
        if (double == 0)
        {
            bet1 = bet1 * 2;
        }
        else if (double == 1)
        {
            bet2 = bet2 * 2;
        }
        else if (double == 2)
        {
            bet1 = bet1 * 2;
            bet2 = bet2 * 2;
        }
        Ertek("jatekos_split");
        if (jsertek == 21 && jatekos_split.length==2 && jsertek != dertek)
        {
            eredmeny = "BlackJack!"
        document.getElementById("eredmeny").innerHTML = eredmeny;
        await sleep(400);
        document.getElementById("overlay").style.display = "block";
        bank = bank+Math.floor(bet*2.5)
        bet = 0;
        document.getElementById("bet").innerHTML ="Bet:"+ 0;
                document.getElementById("bank").innerHTML = "Bank:" +bank;
        } 
        else if (jsertek > dertek && jsertek <= 21 && dertek <= 21)
        {
            bank = bank + 2 * bet2;
            bet2 = 0;
            document.getElementById("bet").innerHTML ="Bet:"+ 0;
            document.getElementById("bank").innerHTML = "Bank:" +bank;
            eredmeny = "Nyertél!";
        }
        else if (dertek > jsertek && jsertek <= 21 && dertek <= 21)
        {
            document.getElementById("bet").innerHTML ="Bet:"+ 0;
            document.getElementById("bank").innerHTML = "Bank:" +bank;
            eredmeny = "Vesztettél!";
        }
        else if (jsertek == dertek && jsertek <= 21 && dertek <= 21)
        {
            bank = bank + bet2;
            document.getElementById("bet").innerHTML ="Bet:"+ 0;
            document.getElementById("bank").innerHTML = "Bank:" +bank;
            eredmeny = "Push!";
        }
        else if (jsertek > 21)
            {
                document.getElementById("bet").innerHTML ="Bet:"+ 0;
                document.getElementById("bank").innerHTML = "Bank:" +bank;
                eredmeny = "Vesztettél!";
            }
            else if (jsertek <=21 && dertek > 21)
            {
                bank = bank + 2 * bet2;
                bet2 = 0;
                document.getElementById("bet").innerHTML ="Bet:"+ 0;
                document.getElementById("bank").innerHTML = "Bank:" +bank;
                eredmeny = "Nyertél!";
            }
            
        document.getElementById("eredmeny").innerHTML = eredmeny;
        await sleep(400);
        document.getElementById("overlay").style.display = "block";
        await sleep(2000)
        Ertek("jatekos");
        document.getElementById("overlay").style.display = "none";
        var images = document.getElementsByClassName('kartyalap');
        var l = images.length;
        for (var i = 0; i < l; i++) {
            images[0].parentNode.removeChild(images[0]);
        }
        for (var j = 0; j < dealer.length; j++)
        {
            Kep(dealer[j][1], "dealer", "create");
        }
        for (let j = 0; j < jatekos.length; j++)
        {
            Kep(jatekos[j][1], "jatekos", "create");
        }
        if (jertek === 21 && jatekos.length == 2 && jertek != dertek)
        {
            eredmeny = "BlackJack!"
        document.getElementById("eredmeny").innerHTML = eredmeny;
        await sleep(400);
        document.getElementById("overlay").style.display = "block";
        bank = bank+Math.floor(bet*2.5)
        bet = 0;
        document.getElementById("bet").innerHTML ="Bet:"+ 0;
            document.getElementById("bank").innerHTML = "Bank:" +bank;
        }
        else if (jertek <=21 && dertek > 21)
        {
            bank = bank + 2 * bet1;
            bet1 = 0;
            document.getElementById("bet").innerHTML ="Bet:"+ 0;
            document.getElementById("bank").innerHTML = "Bank:" +bank;
            eredmeny = "Nyertél!";
        }
        else if (dertek > jertek && jertek <= 21 && dertek <= 21)
        {
            //bet = 0;
            document.getElementById("bet").innerHTML ="Bet:"+ 0;
            document.getElementById("bank").innerHTML = "Bank:" +bank;
            eredmeny = "Vesztettél!";
        }
        else if (jertek == dertek && jertek <= 21 && dertek <= 21)
        {
            bank = bank + bet1;
            document.getElementById("bet").innerHTML ="Bet:"+ 0;
            document.getElementById("bank").innerHTML = "Bank:" +bank;
            eredmeny = "Push!";
        }
        else if (jertek > 21)
        {
            //bet = 0;
            document.getElementById("bet").innerHTML ="Bet:"+ 0;
            document.getElementById("bank").innerHTML = "Bank:" +bank;
            eredmeny = "Vesztettél!";
        }
        else if (jertek > dertek && jertek <= 21 && dertek <= 21)
        {
            bank = bank + 2 * bet1;
            bet1 = 0;
            document.getElementById("bet").innerHTML ="Bet:"+ 0;
            document.getElementById("bank").innerHTML = "Bank:" +bank;
            eredmeny = "Nyertél!";
        }
        document.getElementById("eredmeny").innerHTML = eredmeny;
        await sleep(400);
        document.getElementById("overlay").style.display = "block";
        szamlalo = 0; 
        split = false;
        splitsz = 0;
        bet = 0;
        double=-1;
    } else if (bust==4)
    {
        RevealDealer()
        if(dertek!=jertek ){
        eredmeny = "BlackJack!"
        document.getElementById("eredmeny").innerHTML = eredmeny;
        await sleep(400);
        document.getElementById("overlay").style.display = "block";
        bank = bank+Math.floor(bet*2.5)
        bet = 0;
        document.getElementById("bet").innerHTML ="Bet:"+ 0;
        document.getElementById("bank").innerHTML = "Bank:" +bank;}
        else{
            bank = bank + bet;
        document.getElementById("bet").innerHTML ="Bet:"+ 0;
        document.getElementById("bank").innerHTML = "Bank:" +bank;
        eredmeny = "Push!";
        }

    }
    if (!split)
    {
        document.getElementById("eredmeny").innerHTML = eredmeny;
        await sleep(400);
        document.getElementById("overlay").style.display = "block";
        szamlalo = 0; 
        split = false;
        splitsz = 0;
        bet = 0;
    }
    sleep(4000).then(() => {
        document.getElementById("overlay").style.display = "none";
    });
    sleep(4000).then(() => {
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
    } localStorage.setItem("localBank", bank);
    
    document.getElementById("jatek").style.display = "none";
    document.getElementById("gombok").style.display = "flex";
    document.getElementById("deal").style.display = "inline";
    document.getElementById("row.operator").style.display = "inline";

}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function Double() 
{
    bank = bank - bet;
    document.getElementById("bank").innerHTML = "Bank:" +bank;
    if (split)
    {
        if (splitsz == 0)
        {
            double = 0;
        }
        else if (splitsz == 1 && double == 0)
        {
            double = 2;
        }
        else if (splitsz == 1)
        {
            double = 1;
        }
        document.getElementById("bet").innerHTML ="Bet:"+ bet;
        document.getElementById("double").style.display = "none";
        Hit();
    }
    else {
        bet = bet * 2;
        document.getElementById("bet").innerHTML ="Bet:"+ bet;
        document.getElementById("double").style.display = "none";
        Hit();
    }
    if (jertek > 21)
    {
        End(0);
    }
    Stand();
}

function Split()  
{   
    if (bank <= bet)
    {
        document.getElementById("double").style.display = "none";
    }
    if(aceacesplitvane)
    {
        jatekos[0][0] = 11;
    }
    bank = bank - bet;
    document.getElementById("bank").innerHTML = "Bank:" +bank;
    split = true;
    document.getElementById("split").style.display = "none";
    jatekos_split[0] = jatekos[1];
    jatekos.pop();
    var images = document.getElementsByClassName('kartyalap');
    var l = images.length;
    for (var i = 0; i < l; i++) {
        images[0].parentNode.removeChild(images[0]);
    }
    Kep("back", "dealer", "create");
    Kep(dealer[1][1], "dealer", "create");
    Kep(jatekos[0][1], "jatekos", "create");
    jatekos.push(lapok[szamlalo]);
    Kep(lapok[szamlalo][1], "jatekos", "create");
    szamlalo++;
    Ertek("jatekos");
    if (jertek == 21)
    {
        Stand();
    }
}

var insuranceBet = 0;

async function Insurance(){
    document.getElementById("insurance").style.display="none";
    insuranceBet = Math.round(bet/2)
    bank = bank-insuranceBet;
    if(dealer[0][0] == 10)
    {
        RevealDealer();
        document.getElementById("eredmeny").innerHTML = "Insurance Won!";
        await sleep(400);
        document.getElementById("overlay").style.display = "block";
        sleep(2000).then(() =>{
            document.getElementById("overlay").style.display = "none";
            
            bank = bank+insuranceBet*2;
            Stand();
        })
    }
    else{
        document.getElementById("eredmeny").innerHTML = "Insurance Lost!";
        await sleep(400);
        document.getElementById("overlay").style.display = "block";
        sleep(2000).then(() =>{
            document.getElementById("overlay").style.display = "none";
        }) 
    }
    document.getElementById("insurance").style.display = "none";
}

function fordit(){
    document.getElementById("hatlap").style.transform ="rotateY(360deg)";
}


async function Utmutato(){
    document.getElementById("overlay").style.display = "block";
    if(localStorage.getItem("localBank") != 1000) {
        bank = Number(localStorage.getItem("localBank")); 
        document.getElementById("bank").innerHTML = "Bank:" +bank;
    }
}

function Ertettem(){
    document.getElementById("overlay").style.display = "none";
    document.getElementById("utmutato").style.display = "none";
}
