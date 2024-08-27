import { Component, OnInit } from '@angular/core';
import { BookService } from '../../shared/services/book.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../shared/models/book';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  searchTerm: string = '';
  defaultImage = 'assets/images/defaultImage.jpg';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.error('Error loading books:', error);
      }
    );
  }

  filteredBooks(): Book[] {
    return this.books.filter((book) =>
      book.Title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
