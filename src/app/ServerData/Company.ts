import { Events } from './Events';
import { Student } from "./Student"

export class Company{
    id;
    name;
    address;
    students:Array<Student>=[];
    events: Array<Events>=[];
}