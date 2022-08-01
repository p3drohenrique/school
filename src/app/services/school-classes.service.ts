import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface ISchoolClass {
  id: string;
  description: string;
  classroom: string;
  courseName: string;
  students: string[];
}

@Injectable({
  providedIn: 'root',
})
export class SchoolClassesService {
  constructor(private firestore: Firestore) {}

  getSchoolClasses(): Observable<ISchoolClass[]> {
    const schoolClassesRef = collection(this.firestore, 'classes');
    return collectionData(schoolClassesRef, { idField: 'id' }) as Observable<
      ISchoolClass[]
    >;
  }

  getSchoolClassById(id: string): Observable<ISchoolClass> {
    const schoolClassDocRef = doc(this.firestore, `classes/${id}`);
    return docData(schoolClassDocRef, {
      idField: 'id',
    }) as Observable<ISchoolClass>;
  }

  addSchoolClass(schoolClass: Omit<ISchoolClass, 'id'>) {
    const schoolClassRefsRef = collection(this.firestore, 'classes');
    return addDoc(schoolClassRefsRef, schoolClass);
  }

  updateSchoolClass(schoolClass: ISchoolClass) {
    const schoolClassDocRef = doc(this.firestore, `classes/${schoolClass.id}`);
    return updateDoc(schoolClassDocRef, {
      description: schoolClass.description,
      classroom: schoolClass.classroom,
      courseName: schoolClass.courseName,
      students: schoolClass.students,
    });
  }

  deleteSchoolClass(schoolClassId: string) {
    const schoolClassDocRef = doc(this.firestore, `classes/${schoolClassId}`);
    return deleteDoc(schoolClassDocRef);
  }
}
