import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { QuestionItem } from './category.config';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { DeleteConfirmationModal } from '../delete-confirmation-modal/delete-confirmation-modal';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { CategoriesService } from '../../services/categories';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, TruncatePipe, MatProgressSpinnerModule],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category implements OnInit, OnDestroy {
  displayedColumns: string[] = ['position', 'question', 'answer', 'actions'];
  dataSource = new MatTableDataSource<QuestionItem>();
  category: string = '';
  isLoading = false;

  private destroy$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    public categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(1);
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((param) => {
          this.category = param.get('categoryId') || '';
          this.isLoading = true;
          return this.categoriesService.getQuestionsByCategory(this.category);
        })
      )
      .subscribe((response) => {
        this.isLoading = false;
        this.dataSource = response.data as any;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  deleteAnswer(id: number): void {
    this.categoriesService
      .deleteCategoryQuestionById(id)
      .pipe(switchMap(() => this.categoriesService.getQuestionsByCategory(this.category)))
      .subscribe((response) => {
        console.log(response);
        this.dataSource = response.data as any;
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
        this.deleteAnswer(question.id);
      }
    });
  }
}
