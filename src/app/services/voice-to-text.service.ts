import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoiceToTextService {
  recognition: any;
  isRecording: boolean = false;

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
    this.isRecording = true;
    // Überprüfen, ob die Web Speech API verfügbar ist
    if (this.recognition) {
      try {
        this.recognition.onresult = (event: any) => {
          const results = event.results;
          const transcripts = Array.from(results).map((result: any) => result[0].transcript);
          const latestTranscript = transcripts.pop(); // Aktuellsten erkannten Text abrufen
          console.log('Erkannter Text:', latestTranscript);

          if (latestTranscript.includes(codeword)) {
            callback(latestTranscript); // Aufruf des Callbacks mit dem erkannten Transkript
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
      this.isRecording = false;
    }
  }
}
