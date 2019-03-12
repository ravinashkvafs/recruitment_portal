import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  messages = ['How are you ?', 'Hope you are fine...', 'Thanks for connecting with us !'];
  rank = 0;
  _h1;
  cbType = (e) => {
    this._h1 = document.getElementsByTagName("h1")[0];
    this._h1.style.webkitAnimation = 'none';
    setTimeout(() => {

      this._h1.innerHTML = this.messages[this.rank];
      let time = this.messages[this.rank].length / 4;

      this._h1.style.webkitAnimation = `typewriter ${time}s steps(30) 1s 1 normal both`;

      this.rank = (this.rank + 1) % this.messages.length;

      console.log('time:', time, 'rank:', this.rank);
    }, 1000);
  };


  constructor() {
    console.log('Loaded Blog!');
  }

  ngOnInit() {
    // Code for Chrome, Safari and Opera
    document.getElementById("myTypewriter").addEventListener("webkitAnimationEnd", this.cbType);

    // Standard syntax
    document.getElementById("myTypewriter").addEventListener("animationend", this.cbType);
  }

  height_progress: number = 0;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const total_height = document.getElementById("body").scrollHeight;

    const non_visible_height = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    const visible_height = window.innerHeight;

    this.height_progress = (non_visible_height / (total_height - visible_height)) * 100;

    if (non_visible_height > 500 || true) {
      console.log('You are 500px from the top to bottom');
    }
    // else
    //   this.height_progress = false;

  }
}
