import { Component, OnInit } from '@angular/core';
import { Book } from '../../shared/models/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../shared/services/book.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  book: Book = {} as Book;
  defaultImage = 'assets/images/defaultImage.jpg';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBook();
  }

  loadBook(): void {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(bookId).subscribe(
      (data) => {
        this.book = data;
      },
      (error) => {
        console.error('Error loading book details:', error);
      }
    );
  }

  deleteBook(): void {
    if (this.book) {
      Swal.fire({
        title: 'Do You Want to Delete This Book?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.bookService.deleteBook(this.book.BookID).subscribe(
            () => {
              Swal.fire(
                'Deleted!',
                'The book has been deleted.',
                'success'
              ).then(() => {
                this.router.navigate(['/home']);
              });
            },
            (error) => {
              console.error('Error deleting book:', error);
            }
          );
        }
      });
    }
  }

  updateBook(): void {
    if (this.book) {
      this.bookService.updateBook(this.book.BookID, this.book).subscribe(
        () => {
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error updating book:', error);
        }
      );
    }
  }

}
