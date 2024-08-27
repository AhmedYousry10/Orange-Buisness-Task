import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found/not-found.component';
import { HomeComponent } from './home/home/home.component';
import { AuthorsDetailsComponent } from './author-details/authors-details/authors-details.component';
import { BookDetailsComponent } from './book-details/book-details/book-details.component';
import { AuthorsComponent } from './author/authors/authors.component';

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "authors", component: AuthorsComponent},
  { path: "authorDetails" , component: AuthorsDetailsComponent},
  { path: "bookDetails/:id" , component: BookDetailsComponent},

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent}
];
