import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:4000/api/books/';

  // get book by id
  getBook(id: number){
    return this.http.get<Book>(this.baseUrl + id);
  }

  // get all books
  getAllBooks(){
    return this.http.get<Book[]>(this.baseUrl);
  }

  // add new book
  // http://localhost:4000/api/books/addbook
  addBook(book: Book){
    return this.http.post(this.baseUrl + 'addbook', book);
  }


  // update book
  // http://localhost:4000/api/books/editbook/id
  updateBook(id: number, book: Book){
    return this.http.put(this.baseUrl + 'editbook/' + id, book);
  }

  // delete book
  // http://localhost:4000/api/books/deletebook/id
  deleteBook(id: number){
    return this.http.delete(this.baseUrl + 'deletebook/' + id);
  }

}
