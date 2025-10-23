import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { findAnswerById, MOCK_DATA_ANSWERS, QuestionItem } from '../category/category.config';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { TypingAnimation } from '../../directives/typing-animation';
import { OpenAiIntegration } from '../../services/open-ai-integration';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-generate-answer-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule, TypingAnimation],
  templateUrl: './generete-answer-modal.html',
  styleUrl: './generete-answer-modal.scss',
})
export class GenerateAnswerModal implements OnInit {
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<GenerateAnswerModal>,
    @Inject(MAT_DIALOG_DATA)
    public data: QuestionItem & { index: number },
    public openApi: OpenAiIntegration
  ) {}

  ngOnInit(): void {
    if (!this.data.answer) {
      if (this.data.index < 4) {
        this.data.answer = findAnswerById(this.data.id, MOCK_DATA_ANSWERS);
        return;
      }
      this.regenerateAnswer();
    }
  }
  regenerateAnswer() {
    // TODO - call the service
    this.isLoading = true;
    // Simulate an API call or any asynchronous operation
    this.openApi
      .askQuestion(this.data.question)
      .pipe(
        catchError((err) => {
          console.warn(err);
          this.isLoading = false;
          return of('Error with OpenAI');
        })
      )
      .subscribe((res) => {
        this.data.answer = res;
        this.isLoading = false;
      });
  }

  saveAnswer() {
    this.dialogRef.close(this.data.answer);
  }
}
