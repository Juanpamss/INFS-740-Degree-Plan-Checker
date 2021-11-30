export class Course {
  dcode: string;
  cno: number;
  name: string;
  description: string;
  credits: number;
  type: string;
  difficulty: number;
  avgGrade: string;
  avgGPA: number;
  program: string

  constructor(dcode, cno, name, description, credits, type, difficulty, avgGrade, avgGPA, program) {
    this.dcode = dcode;
    this.cno = cno;
    this.name = name;
    this.description = description;
    this.credits = credits;
    this.type = type;
    this.difficulty = difficulty;
    this.avgGrade = avgGrade;
    this.avgGPA = avgGPA;
    this.program = program
  }
}
