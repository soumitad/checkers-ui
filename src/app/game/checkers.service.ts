import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Space} from './space';

@Injectable()
export class CheckersService {

  private usersUrl: string;
  public selectedSpace: Space;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/checkers/game';
  }

  public getCheckersBoard(): Observable<Space[][]> {
    return this.http.get<Space[][]>(this.usersUrl);
  }
  public setSelectedSpace(space: Space): void {
    console.log('Selected Space ', space);
    this.selectedSpace = space;
  }
  public performMove(space: Space): void {}
}
