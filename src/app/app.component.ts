import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  formGroup!: FormGroup;
  title = '';
  favorates: any = [];
  names = ['inbox', 'sent', 'fav'];
  // subnames = ['Amazone', 'Flipkart', 'Microsoft'];
  subnames = [
    { name: 'Amazone', read: false },
    { name: 'Flipkart', read: false },
    { name: 'Microsoft', read: false },
  ];
  inbox = false;
  sent = false;
  fav = false;
  desc = '';
  heading = '';
  index!: number;

  favorateDatas!: string;
  isRead: any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.favorateDatas = localStorage.getItem('fav') || 'no data';

    this.formGroup = this.fb.group({
      searchText: [''],
    });
  }

  clickName(name: string) {
    this.heading = name;
    if (name.includes('inbox')) {
      this.inbox = true;
    } else if (name.includes('fav')) {
      this.fav = true;
      this.inbox = false;
      this.title = '';
    }
  }

  clickSubName(sub: any, index: number) {
    this.isRead = this.subnames.filter((d) => d.read === false);

    this.title = sub.name;
    this.index = index;
    if (sub.name.includes('Amazone')) {
      this.subnames.map((d) => {
        if (d.name === 'Amazone') {
          d.read = true;
        }
      });

      this.desc = 'hjbjhgjhjhbjjhbfsdfhsdhfsdfjjhdfjfsbgjbfbfgfhg';
    } else if (sub.name.includes('Flipkart')) {
      this.desc = 'hjsdbfjsdfhbdfjbjdfbbfjdf';
      this.subnames.map((d) => {
        if (d.name === 'Flipkart') {
          d.read = true;
        }
      });
    } else if (sub.name.includes('Microsoft')) {
      this.desc = 'kjhjkdfhhjdfhdjkfhdf';
      this.subnames.map((d) => {
        if (d.name === 'Microsoft') {
          d.read = true;
        }
      });
    }
  }

  addToFav() {
    // localStorage.setItem('fav', this.desc);

    this.favorates.push({ subname: this.title, desc: this.desc });
  }

  deleteList(title: string) {
    console.log(title);
    // this.subnames.filter((d) => d !== title)
    console.log(this.index);

    this.subnames.splice(1, this.index);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchData' })
export class SearchPipe implements PipeTransform {
  transform(value: any, searchData: any): any {
    console.log(searchData);
    if (searchData.searchText === '') {
      return value;
    } else {
      return value.filter((d: any) =>
        d.name.toLowerCase().includes(searchData.searchText)
      );
    }
  }
}
