# Changelog

## [1.5.1] - 2024-04-14
- Hinzugefügt: Erste kleine Variante für "Hide" hinzugefügt.
- Fix: Kleine Fehler wurden behoben.

## [1.5.0] - 2024-04-14
- Hinzugefügt: Voice to Text Service
- Hinzugefügt: Innerhalb des Modus "Single Out" ist der Testbetrieb für die "Voice To Score" Funktion gestartert. Diese kann über die Einstellungen aktiviert werden.
- Änderung: Kleine Änderung innerhalb der "Teilnehmer" Liste (Design Anpassung, Voreinstellungen)
- Änderung: Die Liste der Songs ist nun pro Seite auf 10 Lieder beschränkt. Insgesamt sind momentan 20 Lieder verfügbar.

## [1.4.0] - 2024-04-14
- Hinzugefügt: Am Ende einer Runde wird ein Gewinner-Song abgespielt, dieser kann innerhalb der Voreinstellungen aus einer Liste von Songs vorgehört und ausgewählt werden.
- Änderung: Der Text der "Score"-Ansage wurde überarbeitet.
- Fix: Die Logik für die Abspielung der Special-Sounds wurde noch einmal neu angepasst, da manchmal ein Sound nicht richtig abgespielt wurde.

## [1.3.0] - 2024-04-13
- Info: Anpassung der Versionierung Bugs werden nun als Revision (1.0.R) gezählt und eine Funktion als Nebenversion (1.NV.0)
- Hinzugefügt: Text-To-Speech für aktueller Spieler und Score. (Aktivierbar über Einstellungen)
- Hinzugefügt: Special Score Sounds. (Deaktivierbar über Einstellungen)
- Hinzugefügt: Konfetti Animation bei Speziellen Zahlen (Deaktivierbar über Einstellungen)
- Hinzugefügt: Einstellungen innerhalb der Gamemodes "Single Out" und "Double Out"
- Änderung: Der "Title" im Tab-Fenster wird nun dynmaisch anhand der Route generiert.
- Änderung: Neues "Dart"-Favicon.

## [1.2.2] - 2024-04-13
- Hinzugefügt: In den Gamemodes "Single Out" und "Double Out" kann zum 1. vorherigen Spieler zurückgekehrt werden.
- Hinzugefügt: In den Gamemodes "Single Out" und "Double Out" ist es nun möglich den Aktivitätsstatus des Spielers am Ende einer Runde zu setzen.
- Fix: Berechnung des Tabellenfeldes "Höchster Wurf" innerhalb der Gamemodes "Single Out" und "Double Out" kann nun nicht mehr größer als 180 sein.
- Fix: Einige Checkouts wurden korregiert und hinzugefügt, da Sie entweder nicht möglich waren oder fehlten. 

## [1.2.1] - 2024-04-12
- Hinzugefügt: In den Gamemodes "Single Out" und "Double Out" wurde die Tabelle um "Höchster Wurf" erweitert.
- Hinzugefügt: "Reset"-Button innerhalb der "Preset" Komponente um Lokal-Storage Daten einfach zu verwerfen.
- Hinzugefügt: "Zurück"-Button innerhalb des Spieles um wieder zur "Preset" Komponente zurückzukehren.
- Änderung: "Runden Avarage" heißt nun "Runden Durchschnitt"
- Änderung: Wenn die Seite neulädt soll ein setupGame erfolgen, um Fehler zu vermeiden.


## [1.2.0] - 2024-04-11
- Hinzugefügt: Changelogs
- Hinzugefügt: Erster Prototyp für eine Lokal-Storage variante um Daten innerhalb des Computers zu speichern.
- Hinzugefügt: Neue Dart Korregierungsvariante für die Gamemodes "Single Out" und "Double Out".
- Änderung: Eigener Pfad für alle Gamemodes 
- Entfernt: "DartComponent"

## [>1.1.0] - 2024-04-01
- Preset Komponente mit 3 Gamemodes. (Single Out, Double Out, Around the Clock)
- Klickbare Dartscheibe mit Zählfunktion.
- Basis Komponenten für alle Gamemodes.
- Allgemeine Funktionen für Dart Scorer.