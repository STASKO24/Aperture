import {gsap} from "gsap";
import {CustomEase} from "gsap/CustomEase";
import {SplitText} from "gsap/SplitText";
import {Flip} from "gsap/Flip";

gsap.registerPlugin(SplitText, CustomEase, Flip);


document.addEventListener("DOMContentLoaded", () => {
    document.fonts.ready.then(() => {
        const introImages = document.querySelectorAll('.intro-img');
        // const preloaderOverlay = document.querySelector('.preloader-overlay');
        // const preloader = preloaderOverlay.querySelector('.preloader');


        const introImgWidth = introImages[0].offsetWidth;
        const introImgGap = 40;
        const introImgRowWidth = introImgWidth * 7 + introImgGap * 6;
        const intoImgRowX = (window.innerWidth - introImgRowWidth) / 2;
        const introImgRowOffsetX = intoImgRowX - window.innerWidth * 1.3;


        introImages.forEach((img, i) => {
            const centredX = intoImgRowX + i * (introImgWidth + introImgGap) + introImgWidth / 2 - window.innerWidth / 2;
            const centredOffsetX = introImgRowOffsetX + i * (introImgWidth + introImgGap) + introImgWidth / 2 - window.innerWidth / 2;


            gsap.set(img, {
                x: centredOffsetX,
            })

            img.dataset.centredX = centredX;
        })

        SplitText.create('.hero-heading, .nav-item, .nav-logo, .hero-subheading', {
            type: 'lines',
            linesClass: 'line',
            mask: 'lines',
            autoSplit: true,
        })

        gsap.set('.line', {
            y: '125%'
        })

        const tl = gsap.timeline({delay: 1});

        // tl.from(preloader, {
        //     scaleX: 0,
        //     duration: 1.2,
        //     ease: "power2.out",
        //     onComplete: () => {
        //         gsap.set(preloader, {transformOrigin: "right"})
        //     }
        // })
        //
        // tl.to(preloader, {
        //     scaleX: 0,
        //     ease: "power2.out",
        //     duration: 1,
        // })
        // tl.to(preloaderOverlay, {
        //     clipPath: 'polygon(0% 0%, 100% 0, 100% 0%, 0% 0%)',
        //     duration: 1.5,
        //     ease: "power2.out",
        // }, '<0.75')

        introImages.forEach((img) => {
            tl.to(img, {
                x: parseFloat(img.dataset.centredX),
                ease: 'power3.out',
                duration: 1.5,
            }, "<0.025")
        })


        tl.to('.intro-img:nth-child(1), .intro-img:nth-child(2), .intro-img:nth-child(3)', {
            x: '-100vw', ease: 'power2.in',
            duration: 1.25
        })

        tl.to('.intro-img:nth-child(5), .intro-img:nth-child(6), .intro-img:nth-child(7)', {
            x: '100vw', ease: 'power2.in',
            duration: 1.25
        }, '<')

        tl.add(() => {
            const heroImg = document.querySelector('.hero-img');
            const heroImgState = Flip.getState(heroImg);
            heroImg.classList.add('fullscreen');

            Flip.from(heroImgState, {duration: 2, ease: 'power3.inOut'});
        }, '<')

        tl.to('.hero-heading .line', {
            y: '0%',
            ease: 'power3.out',
            duration: 1,
        }, '<1.5')

        tl.to('.hero-subheading .line', {
            y: '0%',
            ease: 'power3.out',
            duration: 1,
        }, '<')


        tl.to('.nav-item .line, .nav-logo .line', {
            y: '0%',
            ease: 'power3.out',
            duration: 1,
        }, '<0.25')
    })


})