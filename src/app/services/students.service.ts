/* eslint-disable */
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
import { map } from 'rxjs/operators';

interface IAddress {
  zipCode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface IStudent {
  id: string;
  name: string;
  email: string;
  phone: string;
  bornDate: string;
  address: IAddress;
}

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private firestore: Firestore) {}

  getStudents(): Observable<IStudent[]> {
    const studentsRef = collection(this.firestore, 'students');
    return collectionData(studentsRef, { idField: 'id' }) as Observable<
      IStudent[]
    >;
  }

  getStudentById(id: string): Observable<IStudent> {
    const studentDocRef = doc(this.firestore, `students/${id}`);
    return docData(studentDocRef, { idField: 'id' }) as Observable<IStudent>;
  }

  getStudentsByIds(ids: string[]): Observable<IStudent[]> {
    const studentsRef = collection(this.firestore, 'students');
    return collectionData(studentsRef, { idField: 'id' }).pipe(
      map((actions) => actions.filter((item) => ids.includes(item.id)))
    ) as Observable<IStudent[]>;
  }

  addStudent(student: Omit<IStudent, 'id'>) {
    const studentRef = collection(this.firestore, 'students');
    return addDoc(studentRef, student);
  }

  updateStudent(student: IStudent) {
    const studentDocRef = doc(this.firestore, `students/${student.id}`);
    return updateDoc(studentDocRef, {
      name: student.name,
      email: student.email,
      phone: student.phone,
      bornDate: student.bornDate,
      address: student.address,
    });
  }

  deleteStudent(studentId: string) {
    const studentDocRef = doc(this.firestore, `students/${studentId}`);
    return deleteDoc(studentDocRef);
  }
}
