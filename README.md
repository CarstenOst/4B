
> HWR deployment:
>https://carstenost.github.io/4B/Prosjekter/How%20We%20Roll/index.html
>
>Fellesprosjektet deployment:
>https://carstenost.github.io/Sarra_4B/events.html

<hr><hr><hr>

# sluttRapport()
## CSS
```
- en forkortelse for "Cascading Style Sheet"
- et standar kodespråk brukt for å designe nettsider
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

![./How%20We%20Roll/Bilder/img_1.png](https://github.com/CarstenOst/4B/blob/main/Prosjekter/How%20We%20Roll/Bilder/img_1.png)



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
