import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ""
  answerSelected2:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false


  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    } else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
      this.answerSelected2 = quizz_questions.results2[finalAnswer as keyof typeof quizz_questions.results2]
    }
  }


  async checkResult(answers: string[]): Promise<string> {
    const counters: { [key: string]: number } = { "A": 0, "B": 0, "C": 0, "D": 0 };

    for (const answer of answers) {
      counters[answer]++;
    }

    let maxCounter = 0;
    let result: string = "";

    for (const key in counters) {
      if (counters[key] > maxCounter) {
        maxCounter = counters[key];
        result = key;
      }
    }

    return result;
  }

}
