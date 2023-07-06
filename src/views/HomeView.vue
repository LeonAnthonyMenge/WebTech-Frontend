<template>
    <header>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Martian+Mono:wght@400;500;600&family=Pacifico&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

      <a class="plain-link" href="/WebTech-Frontend/login">
        <h2 id="login">Login</h2>
      </a>
      <h1 id="NavH1">Note</h1>

  
      <label class="switch">
        <button id="darkModeButton" @click="changeDarkMode">Darkmode: On/Off</button>
      </label>
    </header>

    <div class="content">

        <div class="pictureLeft">
            <h3>WebTech-Projekt</h3>
            <p>Im Rahmen des Programmierprojektes im dritten Semester an der HTW-Berlin, ist diese Notiz-App entstanden. Im Frontend wurde auf das Vue.js Framework gesetzt und das Backand basiert auf Java. Um das die Programmierung des Backends zu erleichtern wurde auf Spring Boot zurück gegriffen. Die Repositories sind öffentlich verfügbar. Hier kommen Sie zum <a href="">Frontend-Repository</a> und hier zum <a href="">Backend Repository</a>. Programmiert wurde diese App von Maik Peters und Leon Menge. Im folgenden Tei dieser Homepage werden die Funktionen und besonderheiten dieser App erklärt.</p>
        </div>
        <div class="pictureRight">
            <h3>Login</h3>
            <p>Beim Login werden die eingegebene E-Mail und das eingegebene Passwort erst verschlüsselt und dann an das Backend gesendet. Dieses entschlüsselt diese anschließend und überprüft, ob es einen Nutzer mit diesen Eigenschaften gibt. Nachdem das Passwort im Backend entschlüsselt wurde, wird nach einem Nutzer mit der E-Mail gesucht. Dann wird der individuelle Salt des Nutzers auf das eingegebene Passwort addiert und das Passwort+Salt gehasht. Nach erfolgreichem hashen wird das gehashte Passwort mit dem gehashten Passwort des Nutzers verglichen. Stimmen diese exakt überein wird eine Response Enity an das Frontend weitergeleitet, welche dies bestätigt. Des Weiteren enthält diese Response Entity die Id des Nutzers. Mit dieser Id kann das Frontend dann auf die Seite des Benutzers weiterleiten.</p>
        </div>
        <div class="pictureLeft">
            <h3>Registrieren</h3>
            <p>Das Registrieren läuft ähnlich, wie das Anmelden. Erst werden die Credentials verschlüsselt und anschließend an das Backend gesendet. Dieses decoded diese und versucht einen Nutzer anzulegen. Beim speichern des Nutzers in der Datenbank wird überprüft, dass die E-Mail Adresse einmalig ist und noch nicht Existiert. Um sicher zu gehen, dass das Passwort nicht durch außenstehende aufgegriffen werden kann, wird dieses Gehasht + Salt in der Datenbank gespeichert. Kann das Backend diesen Prozess erfolgreich ausführen wird so wie im Login-Prozess eine Response Entity, welche unter anderem die Id des neu erstellten nutzers enthält. So kann das Frontend auch hier auf die individuelle Seite des Nutzers weiterleiten.</p>
        </div>
        <div class="pictureRight">
            <h3>Darkmode</h3>
            <p>Auf allen Seiten dieser Web-Application kann man oben rechts einen DarkMode Button finden. Über diesen kann man wie der Name schon sagt zwischen dem Darkmode und dem Lightmode wechseln.</p>
        </div>
        <div class="pictureLeft">
            <h3>Home Button</h3>
            <p>Über das klicken auf den Home Button gelangt man zurück auf diese HomePage. Der Button auf allen Seiten, außer dieser, sichtbar. Durch das klicken auf diesen Button wird der Benutzer automatisch abgemeldet.</p>
        </div>
        <div class="pictureRight">
            <h3>Titel der Notizseiten</h3>
            <p>Die Titel der einzelnen Notizseiten sind auch die Überschriften der jeweiligen Seite in der Notizansicht. Das heißt, dass der Nutzer auf eine erstellte Notizseite mit dem Namen "Example" klicken kann und dann ist in der ansicht, in welcher die Notizen sichtbar sind, die Überschrift "Example" zu sehen.</p>
        </div>
        <div class="pictureLeft">
          <h3>WebSecurity</h3>
          <p>Wie oben schon beschrieben findet die kommunikation von Passwörtern E-Mails etc. nut verschlüsselt zwischen Front- und Backend statt. Das Passwort wird gehasht + salt in der Datenbank gespeichert, was den zugriff für dritte stark erschwert. Auf einzelne Seiten und  Notizen kann nur zugegriffen werden, wenn man sich vorher angemeldet hat.</p>
        </div>
      <div class="pictureRight">
        <h3>Style</h3>
        <p>Diese App verwendet auf der Homepage im Content eine andere Schriftart. Wie oben schon beschrieben kann mittels eines Buttons zwischen Dark- und Lightmode gewechselt werden. Durch die nutzung eines Local Storages innerhalb der App Komponente muss der Darkmode auch nicht auf jeder Seite erneut eingestellt werden. Durch das selbe Prinzip wird sichergestellt, dass der Nutzerbezogene Inhalt nur für angemeldete nutzer sichtbar ist und geladen wird. Die Navigation Bar oben ist fixiert und somit weiterhin erreichbar wenn der Nutzer nach ganz unten Scrollt.</p>
      </div>

    </div>
  </template>
  
  <script>
  
  import App from "@/App";

  export default {
    data() {
      return {
        color: "black",
        textcolor: "black",
      };
    },
    methods: {
      changeDarkMode() {
        if (App.methods.getDarkMode()) {
          App.methods.setDarkMode(false);
          this.textcolor = "black";
          document.body.style.backgroundColor = "#FFFFFF";
          this.color = "black";
          document.body.style.color = "black";
        } else {
            App.methods.setDarkMode(true);
            document.body.style.backgroundColor = "#191919";
            document.body.style.color = "white";
            this.color = "white";
            this.textcolor = "black";

        }
      },
      createDarkMode(){
        if(App.methods.getDarkMode()){
          document.body.style.backgroundColor = "#191919";
          document.body.style.color = "white";
          this.color = "white";
          this.textcolor = "black";
        }else{
          this.textcolor = "black";
          document.body.style.backgroundColor = "#FFFFFF";
          this.color = "black";
          document.body.style.color = "black";
        }
      }
    },
    created() {
      this.createDarkMode();
    }
  };
  </script>
  
  <style scoped>

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 200;
  }

  #login{
    margin-left: 1rem;
  }
  #darkModeButton{
    background: #4caf50;
    width: 86px;
    border-radius: 4px;
  }
  .switch {
    margin-right: 1rem;
  }
  .content{
    font-family: 'Martian Mono', monospace;
    text-align: center;
    max-width: 110rem;
    margin-top: 6rem;
    margin-left: auto;
    margin-right: auto;
  }

  :hover#login{
    color: rgb(40, 40, 40);
  }
  
  
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: auto;
  }
  #changeDarkMode {
    display: flex;
    justify-content: flex-end;
  }
  #NavH1 {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: auto;
  }

  .plain-link {
    text-decoration: none;
    color: inherit;
  }
  </style>
  