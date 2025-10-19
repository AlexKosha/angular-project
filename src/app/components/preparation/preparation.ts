import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MOCK_DATA, QuestionItem } from '../category/category.config';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationModal } from '../delete-confirmation-modal/delete-confirmation-modal';
import { GenerateAnswerModal } from '../generete-answer-modal/generete-answer-modal';
import { MatButtonModule } from '@angular/material/button';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { get } from 'lodash';
import { PreparationService } from '../../services/preparation';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-preparation',
  imports: [MatTableModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './preparation.html',
  styleUrl: './preparation.scss',
})
export class Preparation implements OnInit, OnDestroy {
  displayedColumns: string[] = ['position', 'question', 'actions'];
  dataSource = new MatTableDataSource<QuestionItem>();
  category: string = '';
  isLoading = false;

  private destroy$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public preparationService: PreparationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        takeUntil(this.destroy$),
        switchMap((queryParams) => {
          this.category = queryParams['tabName'] || '';
          this.isLoading = true;
          return this.preparationService.getPreparationQuestionsByCategory(this.category);
        })
      )
      .subscribe((res) => {
        // TODO - use service instead of mocks
        this.isLoading = false;
        this.dataSource = res.data as any;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateAnswer(question: Partial<QuestionItem>, id: number): void {
    this.preparationService.updatePreparationQuestionById(question, id).subscribe((res) => {
      console.log(res);
    });
  }

  openGenerateDialog(question: QuestionItem, index: number): void {
    const dialogRef = this.dialog.open(GenerateAnswerModal, {
      width: '500px',
      data: {
        ...question,
        index,
      },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log('The dialog was closed', result);
      if (result) {
        // TODO - call the service for updating an answer
        this.updateAnswer({ answer: result }, question.id);
      }
    });
  }

  openDeleteDialog(question: QuestionItem): void {
    const dialogRef = this.dialog.open(DeleteConfirmationModal, {
      width: '333px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log('The dialog was closed', result);
      if (result) {
        console.log('Question would be deleted.', question);
        // TODO - call the service for deleting an answer
        this.deleteAnswer(this.category, question.id);
      }
    });
  }

  deleteAnswer(categoryName: string, id: number): void {
    this.preparationService.deletePreparationQuestionById(id).subscribe((res) => console.log(res));
  }
}
