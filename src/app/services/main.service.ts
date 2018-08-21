import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database/database';
import {Http, Headers} from '@angular/http';


@Injectable()



export class MainService { constructor(private afDB:AngularFireDatabase, private http: Http) {}
    cursos: any = [];
    callBack: boolean = false;

    API_END_POINT = 'https://laboratoriovivo-3d943.firebaseio.com';

    public getCursos() {
        return this.afDB.list('cursos/');
    }
    public buscarCurso(id){
        return this.cursos.filter((curso) => {return curso.id == id})[0] || null;
    }
    public guardarCurso(curso) {
        this.afDB.database.ref('cursos/'+curso.id).set(curso);
    }

    public saveUser(user) {
        this.afDB.database.ref('users/' + user.uId).set(user);
    }

    public saveAdmin(admin) {
        this.afDB.database.ref('administrator/' + admin.uId).set(admin);
    }

    public saveEvent(event) {
        this.afDB.database.ref('events/' + event.id).set(event);
    }

    public editEvent(event) {
        this.afDB.database.ref('events/' + event.id).update(event);
    }

    public getEvents() {
        //return this.afDB.list('events/');
        return this.http.get(this.API_END_POINT+'/events.json')
    }



    public getUser(id) {
        return this.afDB.object('users/' + id);
    }

    public editarCurso(curso) {
        this.afDB.database.ref('cursos/'+curso.id).set(curso);
    }
    public getCurso(id) {
        return this.afDB.object('cursos/'+id);
    }
}
