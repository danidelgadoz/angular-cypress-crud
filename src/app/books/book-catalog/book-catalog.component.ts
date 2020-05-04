import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BookService } from '../book.service';
import { Book } from '../book';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-catalog',
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.scss']
})
export class BookCatalogComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  private bookFindAllApi$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.requestFindAllAPI();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.bookFindAllApi$?.unsubscribe();
    this.snackBar.dismiss();
  }

  onNavigateToCreateBookView(): void {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }

  onRefreshListWhenDeleteIsSuccess(idBookDeleted: string): void {
    this.books = [...this.books].filter(book => (book._id !== idBookDeleted));
  }

  private requestFindAllAPI(): void {
    this.bookFindAllApi$ = this.bookService
      .findAll()
      .subscribe(
        (books) => {
          this.books = books;
        },
        (error) => {
          this.snackBar.open('Ups! Error loading books', 'OK', { duration: 5000 });
        }
      );
  }

}
