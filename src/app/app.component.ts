import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ankit portfolio';

  downloadResume() {

    // Path to the PDF file in the assets folder
    const pdfUrl = 'assets/files/AnkitNegiResume.pdf';

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'AnkitNegiResume.pdf'; // Specify the name for the downloaded file

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically trigger a click on the link to start the download
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);

  }

}
