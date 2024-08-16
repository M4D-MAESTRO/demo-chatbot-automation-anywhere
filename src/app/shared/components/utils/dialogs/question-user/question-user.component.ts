import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from './../../../../services/user/user.service';
import { UserDto } from './../../../../interfaces/users/user.dto';

@Component({
  selector: 'app-question-user',
  templateUrl: './question-user.component.html',
  styleUrls: ['./question-user.component.scss'],
})
export class QuestionUserComponent implements OnInit, OnDestroy {

  @Input()
  showDialog = false;

  @Input()
  selectedUser: UserDto;

  @Input()
  user_id: string;

  @Output()
  closeEvent: EventEmitter<boolean> = new EventEmitter();

  private subscriptions = new Subscription();

  constructor(
    private readonly userService: UserService,
  ) { }

  ngOnInit() {
    console.log(this.selectedUser);
    if (this.selectedUser) {
      this.showDialog = true;
      console.log('Entrou');
    } else {
      this.loadUser();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  loadUser() {
    if (!this.selectedUser && !this.user_id) {
      this.close();
      return;
    }

    const sub = this.userService.findById(this.user_id)
      .subscribe(data => {
        this.selectedUser = data;
        this.showDialog = true;
      });
    this.subscriptions.add(sub);
  }

  close() {
    this.showDialog = false;

    this.closeEvent.emit(this.showDialog);
  }
}
