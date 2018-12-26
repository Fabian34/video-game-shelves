import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Videogame } from '../../models/videogame.model';
import { VideogamesService } from '../../services/videogames.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videogame-form',
  templateUrl: './videogame-form.component.html',
  styleUrls: ['./videogame-form.component.scss']
})
export class VideogameFormComponent implements OnInit {

  videogameForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(	private formBuilder: FormBuilder, 
  				private videogamesService: VideogamesService,
              	private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.videogameForm = this.formBuilder.group({
      title: ['', Validators.required],
      platform: ['', Validators.required],
      synopsis: ''
    });
  }
  
  onSaveVideogame() {
    const title = this.videogameForm.get('title').value;
    const platform = this.videogameForm.get('platform').value;
    const synopsis = this.videogameForm.get('synopsis').value;
    const newVideogame = new Videogame(title, platform);
    newVideogame.synopsis = synopsis;
    if(this.fileUrl && this.fileUrl !== '') {
      newVideogame.photo = this.fileUrl;
    }
    this.videogamesService.createNewVideogame(newVideogame);
    this.router.navigate(['/videogames']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.videogamesService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}

