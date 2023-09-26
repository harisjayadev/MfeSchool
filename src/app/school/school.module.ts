import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SchoolRoutingModule } from './school-routing.module';
import { TeacherComponent } from './components/teacher/teacher.component';


@NgModule({
  declarations: [TeacherComponent],
  imports: [CommonModule, SchoolRoutingModule, FormsModule, ReactiveFormsModule],
  //exports: [...EXPORTS],
})
export class SchoolModule {
  //static exports = EXPORTS; // prevents from components being tree-shaked in production
}
