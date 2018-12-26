import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Videogame } from '../models/videogame.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class VideogamesService {

  videogames: Videogame[] = [];
  videogamesSubject = new Subject<Videogame[]>();

  constructor() {
    this.getVideogames();
  }

  emitVideogames() {
    this.videogamesSubject.next(this.videogames);
  }

  saveVideogames() {
    firebase.database().ref('/videogames').set(this.videogames);
  }

  getVideogames() {
    firebase.database().ref('/videogames')
      .on('value', (data: DataSnapshot) => {
          this.videogames = data.val() ? data.val() : [];
          this.emitVideogames();
        }
      );
  }

  getSingleVideogame(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/videogames/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  
  createNewVideogame(newVideogame: Videogame) {
    this.videogames.push(newVideogame);
    this.saveVideogames();
    this.emitVideogames();
  }

  removeVideogame(videogame: Videogame) {
    if(videogame.photo) {
      const storageRef = firebase.storage().refFromURL(videogame.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimée!');
        },
        (error) => {
          console.log('Impossible de supprimer la photo! : ' + error);
        }
      );
    }
    const videogameIndexToRemove = this.videogames.findIndex(
      (videogameEl) => {
        if(videogameEl === videogame) {
          return true;
        }
      }
    );
    this.videogames.splice(videogameIndexToRemove, 1);
    this.saveVideogames();
    this.emitVideogames();
  }
  
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              //console.log('downloadURL : ', downloadURL);
              resolve(downloadURL);
            });
          }
        );
      }
    );
  }
}