import { Component, AfterViewInit, ViewChildren, ElementRef, QueryList, OnInit, HostListener, ViewChild } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private elRef: ElementRef) { }

  // Skills
  @ViewChildren('box') boxes!: QueryList<ElementRef>;

  images: string[] = [
    "assets/images/angular.webp",
    "assets/images/html.png",
    "assets/images/css.png",
    "assets/images/sass.png",
    "assets/images/ts.jpeg",
    "assets/images/js.png",
    "assets/images/bt.jpg",
    "assets/images/rxjs.webp",
    "assets/images/API.jpg",
    "assets/images/angularUI.png",
    "assets/images/wireshark.png",
    "assets/images/splunk.png",
  ];

  zAxis: number = 300;
  sX: any;
  sY: any;
  nX: any;
  nY: any;
  desX: number = 0;
  desY: number = 0;
  tX: number = 0;
  tY: number = 10;

  ngOnInit(): void {
    this.updateButtonVisibility();

    // About me
    const hero = document.querySelector('#about-section [data-hero]');

    if (hero) {
      const tl = gsap.timeline();

      tl.to(hero, {
        '--maskSize1': '20%',
        duration: 0.5,
        ease: 'back.out(2)',
      })
        .to(hero, {
          '--maskSize2': '28%',
          '--maskSize3': 'calc(28% + 0.1rem)',
          duration: 0.5,
          delay: 0.5,
          ease: 'back.out(2)',
        });

      window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const x = Math.round((clientX / window.innerWidth) * 100);
        const y = Math.round((clientY / window.innerHeight) * 100);

        gsap.to(hero, {
          '--x': `${x}%`,
          '--y': `${y}%`,
          duration: 0.3,
          ease: 'sine.out',
        });
      });
    }

  }

  ngAfterViewInit(): void {
    this.initializeBoxes();
    if (!this.trackedElementRef) {
      // console.error('Tracked element not found!');
      return;
    }

  }
  @ViewChild('trackedElement') trackedElementRef!: ElementRef;
  @HostListener('document:mousemove', ['$event'])

  onMouseMove2(event: MouseEvent): void {
    if (this.trackedElementRef) {
      const rect = this.trackedElementRef.nativeElement.getBoundingClientRect();
      // console.log(`Element position: ${rect.top}, ${rect.left}`);
    } else {
      // console.warn('Tracked element reference is null!');
    }
  }

  // For SKills Carousel
  initializeBoxes(): void {
    this.boxes.forEach((box, i) => {
      box.nativeElement.style.zIndex = -i * 10;
      box.nativeElement.style.transform = `rotateY(${(7 - i) * (360 / this.boxes.length)}deg) translateZ(${this.zAxis}px)`;
      box.nativeElement.style.transitionDelay = `${i * 0.3}s`;
    });
  }

  applyTransform(): void {
    if (this.tY > 180) this.tY = 180;
    if (this.tY < 0) this.tY = 0;

    const dragContainer = this.elRef.nativeElement.querySelector('.drag-container');
    dragContainer.style.transform = `rotateX(${-this.tY}deg) rotateY(${this.tX}deg)`;
  }


  // Projects Links
  projectLink(projectName: any) {
    if (projectName == "stag") {
      window.open('https://stagnfc.com/#', '_blank');
    } else if (projectName == "speedyssey") {
      window.open('https://www.speedyssey.com/index.html', '_blank');
    } else if (projectName == "mak") {
      window.open('https://maktoday.co.uk/', '_blank');
    } else if (projectName == "nettree") {
      window.open('http://nettree.us/webapp/home', '_blank');
    }
  }

  // svg 
  @HostListener('document:mousemove', ['$event'])
  2(event: MouseEvent) {
    const svg = this.elRef.nativeElement.querySelector('#character');
    const rect = svg.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Calculate angle for eye movement
    const leftEyeX = 30, leftEyeY = 50;
    const rightEyeX = 70, rightEyeY = 50;

    const angleLeftEye = Math.atan2(mouseY - leftEyeY, mouseX - leftEyeX);
    const angleRightEye = Math.atan2(mouseY - rightEyeY, mouseX - rightEyeX);

    // Update pupil positions
    const leftPupil = svg.querySelector('#left-pupil');
    const rightPupil = svg.querySelector('#right-pupil');

    leftPupil.setAttribute('cx', (leftEyeX + Math.cos(angleLeftEye) * 3).toString());
    leftPupil.setAttribute('cy', (leftEyeY + Math.sin(angleLeftEye) * 3).toString());

    rightPupil.setAttribute('cx', (rightEyeX + Math.cos(angleRightEye) * 3).toString());
    rightPupil.setAttribute('cy', (rightEyeY + Math.sin(angleRightEye) * 3).toString());
  }

  // hire me email
  email: any = "2000ankitnegi@gmail.com";
  phoneNumber: any = "+44 7909553721";

  sendEmail() {
    const subject = encodeURIComponent('Subject Here'); // Customize the subject
    const body = encodeURIComponent('Hello, \n\nThis is the body of the email.'); // Customize the body
    window.location.href = `mailto:${this.email}?subject=${subject}&body=${body}`;
  }

  dialPhoneNumber() {
    window.location.href = `tel:${this.phoneNumber}`;
  }

  // scroll to About
  scrollToElement(): void {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // scroll to top
  showButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateButtonVisibility();
  }

  updateButtonVisibility() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showButton = scrollPosition > 200;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}
