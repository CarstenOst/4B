
> HWR deployment:
>https://carstenost.github.io/4B/Prosjekter/How%20We%20Roll/index.html
>
>Fellesprosjektet deployment:
>https://carstenost.github.io/Sarra_4B/events.html

<hr><hr>

# sluttRapport()

Her skal vi ta for oss det grunnleggende i HTML, CSS og JavaScript

## HTML
```text
I semesteret har vi lært mye grunnleggende rundt HTML5-koding. Kort forklart er alle tagger (<tag>) en boks.
Til og med taggen "<head>" som man bruker for å linke inn eks. .css-filer, vise til "charset" og definere 
viewport (responsiv), er en boks. Her kan man i teorien skrive hele nettsiden sin inn i "<head>”-boksen. 
Men det burde unngås av flere grunner. Eksempelvis bruker man til vanlig en definert tag som gir mening til
det man skal skrive. Vi kan se at taggen "<nav>" blir brukt når man lager en navigasjon. Hvis man hadde brukt 
"<head>" i stedet for “<nav>” her så ville det ikke blitt et direkte problem for nettleseren å vise det den skal.
Her er det andre problemer, som dårlig lesbarhet i koden, som er grunnen til å bruke “<nav>”. Videre vil programvare
laget for de som har lesevansker ofte feile, da de er rettet mot korrekt HTML- skriving. Under, viser vi generelt til
hvordan oppsettet i HTML burde være:
```

```
<!DOCTYPE html> 
<html> 
<head> 
    <meta> 
    <link> 
    <title></title> 
</head> 
<body> 
    <header> 
    </header> 
    <nav> 
    </nav> 
    <main> 
        <article></article> 
        <section></section> 
        <div></div> 
    </main> 
    <footer> 
    </footer> 
    <script></script> 
</body> 
</html> 
```
(NB: dette er ikke et bilde)

Videre med beskrivende kommentarer:
```

<!DOCTYPE html> <!-- Forteller browseren hva dette dokumentet er--> 
<html> <!-- Spesifiser språket slik:(<html lang="en">)--> 
<head> <!-- Legge inn .css fil, viewport og meta charset--> 
    <meta> <!-- Charset og/eller viewport--> 
    <link> <!-- Stylesheet fra fil, eller fra et sted på nettet (href) --> 
    <title></title> <!-- Tittel, vises øverst i fane-vinduet--> 
</head> <!-- Avslutter "head", noe veldig basic--> 
<body> <!-- I body er det man skriver mesteparten av nettsiden --> 
    <header> <!-- Overskrift bruk <h1>"overskrift"</h1> her --> 
    </header> 
    <nav> <!-- Brukes til navigasjons-meny --> 
    </nav> 
    <main> <!-- hovedinnhold --> 
        <article></article> <!-- tekst eks: forum, blogg eller nyheter--> 
        <section></section> <!-- En seksjon i dokumentet--> 
        <div></div> <!-- Konteiner, lett å manipulere med css/js--> 
    </main> 
    <footer> <!-- Info om kontakt, copyright, relaterte dokumenter osv.--> 
    </footer> 
    <script></script> <!-- Skrive JS, linke til en .js fil. Legges ofte inn nederst for å øke brukeropplevelsen av nettsiden--> 
</body> 
</html> 
```
Vi skiller kode med og uten kommentarer. Dette gjør vi for å få et bedre overblikempler for å vise at vi har både lært, og forstått dette. k på selve koden hvor det ikke er forstyrrende kommentarer. Vi viser også til med slike eks


## CSS
```
- en forkortelse for "Cascading Style Sheet"
- et standar kodespråk brukt for å designe nettsider (HTML)
```
Nå skal vi ta for oss litt grunnleggende syntax, selector (velger) og noen av de mest brukte "properties" (egenskaper)

```CSS
/* Syntax: */
selector{ /* Selector "velger" det elementet som får egenskapene som står inni "{}" */
    egenskap: verdi;
    egenskap2: verdi2;
}
/* eksempel selector (velger): */
*{} /* gjelder for alle elementer  */
div{} /* alle "div" tagger */
div, h1{} /* alle div og h1 */
div h1{} /* alle h1 tagger inni hvilken som helst div */
.klasse{} /* velger alle elementer som bruker 'class="klasse"' */
#idnavn{} /* velger element med lik id (dersom et html element har "id=idnanv" vil denne bli valgt nå */ 
selector:hover{} /* utfører koden i "{}" når datamusen er posisjonert over elementet*/

selector{
    position: center; /* Bare å sette inn fleire */
    display: flex;
    
}

```

Eksempl med bruk av CSS:

![imgWith](https://github.com/CarstenOst/4B/blob/main/Prosjekter/How%20We%20Roll/Bilder/img.png)

Eksempl uten bruk av CSS:

![imgWithout](https://github.com/CarstenOst/4B/blob/main/Prosjekter/How%20We%20Roll/Bilder/img_1.png)



## javaScript()

<!-- Hvis du kan lese dette så har du åpnet dokumentet på "feil" måte (med mindre du vil se alle de fine kommentarene våre :)) -->





<!-- ASCII kunst tatt fra: https://patorjk.com/software/taag/#p=display&f=Graffiti&t=just%20do%20it -->
```  __                __        .___       .__  __   
    |__|__ __  _______/  |_    __| _/____   |__|/  |_ 
    |  |  |  \/  ___/\   __\  / __ |/  _ \  |  \   __\
    |  |  |  /\___ \  |  |   / /_/ (  <_> ) |  ||  |  
/\__|  |____//____  > |__|   \____ |\____/  |__||__|  
\______|          \/              \/                  
```
