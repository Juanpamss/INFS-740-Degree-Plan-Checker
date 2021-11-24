import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MajorFilterComponent } from './major-filter/major-filter.component';
import { FormsModule } from '@angular/forms';
import {StoreModule} from "@ngrx/store";
import {schedulerReducer} from "./state/scheduler.reducer";
import { CourseSelectorComponent } from './course-selector/course-selector.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionComponent } from './accordion/accordion.component';
import { MyFilterPipe } from './pipes/MyFilterPipe';
import { ScheduleContentComponent } from './schedule-content/schedule-content.component';
import { SemesterCardComponent } from './semester-card/semester-card.component';
import { EstimatedGradeComponent } from './estimated-grade/estimated-grade.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    MajorFilterComponent,
    CourseSelectorComponent,
    AccordionComponent,
    MyFilterPipe,
    ScheduleContentComponent,
    SemesterCardComponent,
    EstimatedGradeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({
      courseList: schedulerReducer,
      selectedCourses: schedulerReducer,
      prereqList: schedulerReducer,
      semesterData: schedulerReducer
    }),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
