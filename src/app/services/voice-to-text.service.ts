import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoiceToTextService {
  recognition: any;

  constructor() {
    // Überprüfen, ob die Web Speech API verfügbar ist
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.lang = 'de-DE';
    } else {
      console.error('Die Web Speech API wird in diesem Browser nicht unterstützt.');
    }
  }

  startListening(codeword: string, callback: (transcript: string) => void): void {
    // Überprüfen, ob die Web Speech API verfügbar ist
    if (this.recognition) {
      let codewordDetected = false; // Flag, um zu überprüfen, ob das Codewort bereits erkannt wurde
  
      try {
        this.recognition.onresult = (event: any) => {
          const results = event.results;
          const transcript = results[results.length - 1][0].transcript;
          console.log('Erkannter Text:', transcript);
  
          if (!codewordDetected && transcript.includes(codeword)) {
            console.log("Codewort wurde gesagt:", codeword);
            codewordDetected = true; // Setze die Flag auf true, um anzuzeigen, dass das Codewort erkannt wurde
          }
  
          if (codewordDetected) {
            if (transcript === "Treffer") {
              console.log("T20");
              codewordDetected = false;
            }
          }
        };
  
        this.recognition.start();
      } catch (error) {
        console.error('Fehler beim Starten der Spracherkennung:', error);
      }
    } else {
      console.error('Web Speech API wird in diesem Browser nicht unterstützt.');
    }
  }
  

  stopListening(): void {
    // Überprüfen, ob die Web Speech API verfügbar ist
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}
