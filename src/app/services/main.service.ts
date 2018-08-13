import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database/database';
import {Http} from '@angular/http';


@Injectable()



export class MainService { constructor(private afDB:AngularFireDatabase, private http: Http) {}
    cursos: any = [];
    callBack: boolean = false;

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
