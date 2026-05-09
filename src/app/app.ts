import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, EditorComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = "Magasin de vaisseaux de l'Empire";
  editMode = false;

  editorConfig = {
    licenseKey: 'gpl',
    menubar: true,
    height: 200,
    plugins: 'lists link image',
    toolbar: 'undo redo | bold italic underline | forecolor | bullist numlist | link',
  };

}
