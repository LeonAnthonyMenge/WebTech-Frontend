<template>
    <header>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
      <a class="plain-link" href="/WebTech-Frontend/login">
        <h2 id="login">Login</h2>
      </a>
      <h1 id="NavH1">Note</h1>
      <p>Darkmode</p>
  
      <label class="switch">
        <input @click="changeDarkMode" type="checkbox" id="toggleswitch" />
        <span class="slider round"></span>
      </label>
    </header>

    <div class="content">

        <div class="pictureLeft">
            <h3>WebTech-Projekt</h3>
            <p>Im Rahmen des Programmierprojektes im dritten Semester an der HTW-Berlin, ist diese Notiz-App entstanden. Im Frontend wurde auf das Vue.js Framework gesetzt und das Backand basiert auf Java. Um das die Programmierung des Backends zu erleichtern wurde auf Spring Boot zurück gegriffen. Die Repositories sind öffentlich verfügbar. Hier kommen Sie zum <a href="">Frontend-Repository</a> und hier zum <a href="">Backend Repository</a>. Programmiert wurde diese App von Maik Peters und Leon Menge. Im folgenden Tei dieser Homepage werden die Funktionen und besonderheiten dieser App erklärt.</p>
        </div>
        <div class="pictureRight">
            <h3>Login</h3>
          <img alt="Login picture" src='src/assets/login.PNG'>
            <p>Beim Login werden die eingegebene E-Mail und das eingegebene Passwort erst verschlüsselt und dann an das Backend gesendet. Dieses entschlüsselt diese anschließend und überprüft, ob es einen Nutzer mit diesen Eigenschaften gibt. Nachdem das Passwort im Backend entschlüsselt wurde, wird nach einem Nutzer mit der E-Mail gesucht. Dann wird der individuelle Salt des Nutzers auf das eingegebene Passwort addiert und das Passwort+Salt gehasht. Nach erfolgreichem hashen wird das gehashte Passwort mit dem gehashten Passwort des Nutzers verglichen. Stimmen diese exakt überein wird eine Response Enity an das Frontend weitergeleitet, welche dies bestätigt. Des Weiteren enthält diese Response Entity die Id des Nutzers. Mit dieser Id kann das Frontend dann auf die Seite des Benutzers weiterleiten.</p>
        </div>
        <div class="pictureLeft">
            <h3>Registrieren</h3>
            <p>Das Registrieren läuft ähnlich, wie das Anmelden. Erst werden die Credentials verschlüsselt und anschließend an das Backend gesendet. Dieses decoded diese und versucht einen Nutzer anzulegen. Beim speichern des Nutzers in der Datenbank wird überprüft, dass die E-Mail Adresse einmalig ist und noch nicht Existiert. Um sicher zu gehen, dass das Passwort nicht durch außenstehende aufgegriffen werden kann, wird dieses Gehasht + Salt in der Datenbank gespeichert. Kann das Backend diesen Prozess erfolgreich ausführen wird so wie im Login-Prozess eine Response Entity, welche unter anderem die Id des neu erstellten nutzers enthält. So kann das Frontend auch hier auf die individuelle Seite des Nutzers weiterleiten.</p>
        </div>
        <div class="pictureRight">
            <h3>Darkmode</h3>
            <p>Auf allen Seiten dieser Webb-Application kann man oben rechts einen DarkMode Toggle finden. Über diesen kann man wie der Name schon sagt zwischen dem Darkmode und dem Lightmode wechseln.</p>
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

  #login{
    margin-left: 8px;
  }
  .content{
    text-align: center;
    max-width: 110rem;
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
  
  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin: 1rem;
  }
  
  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  
  input:checked + .slider {
    background-color: #2196f3;
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }
  
  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  
  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }
  
  .plain-link {
    text-decoration: none;
    color: inherit;
  }
  </style>
  