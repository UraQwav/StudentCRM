import { Company } from './Company';
import { Events } from './Events';

export class Student{
    id;
    name;
    kurs;
    spec;
    public companies: Array<Company>=[];
    public events: Array<Events>=[];
}