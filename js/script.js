let stripoviXML;
let stripovi;
let comicbooks = [];

class ComicBook 
{
    constructor(sifra, dostupno, naziv, cena, godinaIzdanja) 
    {
        this.sifra = sifra; 
        this.dostupno = dostupno;
        this.naziv = naziv;
        this.cena = cena;
        this.godinaIzdanja = godinaIzdanja; 
        comicbooks.push(this);
    }
}

function loadXML()
{
    let x = new XMLHttpRequest();
    x.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200)
        {
            stripoviXML = this.responseXML;
            stripovi = stripoviXML.getElementsByTagName("strip");
            showComics();
            addYears();
        }
    };
    
    x.open("GET", "../xml/stripovi.xml", true);
    x.send();
    
}

window.onload = loadXML();

function showComics(){

    let comicGrid = "";
    let available = document.querySelector("#available").value;
    let year = document.querySelector("#comic-filter-choice").value;
    
    let filter = document.querySelector("#name").value.trim();
    let regex = new RegExp(filter,"ig");

    for(let i = 0; i < stripovi.length; i++)
    {
        let naziv = stripovi[i].getElementsByTagName("naziv")[0].textContent;
        let sifra = stripovi[i].getElementsByTagName("sifra")[0].textContent; 
        let cena  = stripovi[i].getElementsByTagName("cena")[0].textContent;
        let dostupno = stripovi[i].getElementsByTagName("dostupno")[0].textContent; 
        let godinaIzdanja = stripovi[i].getElementsByTagName("godina-izdanja")[0].textContent;  

        let strip = new ComicBook(sifra, dostupno, naziv, cena, godinaIzdanja);
        
        if ( strip.naziv.includes( document.title.toUpperCase() ) )
        {
            if ( available === "SVE" )
            {
                if ( filter === "" || ( filter != "" && regex.test(naziv) ) )
                {
                    if ( year === "" || ( year != "" && year === godinaIzdanja ))
                    {
                        comicGrid += 
                        '<div class="card">' +
                            '<a href="">' +
                                '<img src="../img/' + strip.sifra + '.jpg" alt="' + strip.naziv + '" />' +
                                '<h1>' + strip.naziv + '</h1>' + 
                                '<p>Cena: ' + strip.cena + '.00 rsd</p>' +
                            '</a>' + 
                        '</div>';
                    }
                }
            }
            else if ( available === "DA" && dostupno === "DA" )
            {
                if ( filter === "" || ( filter != "" && regex.test(naziv) ) )
                {
                    if ( year === "" || ( year != "" && year === godinaIzdanja ))
                    {
                        comicGrid += 
                        '<div class="card">' +
                            '<a href="">' +
                                '<img src="../img/' + strip.sifra + '.jpg" alt="' + strip.naziv + '" />' +
                                '<h1>' + strip.naziv + '</h1>' + 
                                '<p>Cena: ' + strip.cena + '.00 rsd</p>' +
                            '</a>' + 
                        '</div>';
                    }
                }
            }
            else if ( available === "NE" && dostupno === "NE"  )
            {
                if ( filter === "" || ( filter != "" && regex.test(naziv) ) )
                {
                    if ( year === "" || ( year != "" && year === godinaIzdanja ))
                    {
                        comicGrid += 
                        '<div class="card">' +
                            '<a href="">' +
                                '<img src="../img/' + strip.sifra + '.jpg" alt="' + strip.naziv + '" />' +
                                '<h1>' + strip.naziv + '</h1>' + 
                                '<p>Cena: ' + strip.cena + '.00 rsd</p>' +
                            '</a>' + 
                        '</div>';
                    }
                }
            }
        }   


    }

    document.querySelector(".comic-grid").innerHTML = comicGrid;
}

function addYears ()
{  
    let options = "<option value = ''>Godina Izdanja</option>";
    let years = [];
    
    for ( let i = 0; i < stripovi.length; i++ )
    {      
        console.log(stripovi[i].naziv);
        if ( comicbooks[i].naziv.includes( document.title.toUpperCase() ) )
        {  
            years.push(stripovi[i].getElementsByTagName("godina-izdanja")[0].textContent); 
        }
    }
    
    years.sort();
    years = [...new Set(years)];

    for ( let i = 0; i < years.length; i++ )
    {
        options += "<option>" + years[i] + "</option>";
    }

    document.querySelector("#comic-filter-choice").innerHTML = options;
}