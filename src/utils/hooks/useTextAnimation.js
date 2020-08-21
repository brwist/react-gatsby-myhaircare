import { useLayoutEffect } from 'react';
import gsap, { Expo } from 'gsap';

export const useTextAnimationSecondary = (
  { element, lineWidth = 3, lineContinuationPx = 10 },
  dependendies = []
) => {
  useLayoutEffect(() => {
    if (!element.current) {
      return;
    }

    const svg = element.current.querySelector('svg');
    const titleContent = element.current.textContent;

    element.current.innerHTML = '';
    element.current.insertAdjacentHTML(
      'afterbegin',
      `
        ${svg ? svg.outerHTML : ''}
        <span class="ml11">
          <span class='text-wrapper'>
          <span class='line line1'></span>
          <span class='all-letters'>${titleContent}</span>
        </span>
      </span>
    `
    );

    const line = element.current.querySelector('.line');
    const allLetters = element.current.querySelector('.all-letters');

    var textWrapper = element.current.querySelector('.ml11 .all-letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /([^\x00-\x80]|\w)/g,
      "<span class='l'>$&</span>"
    );

    const letters = element.current.querySelectorAll('.l');

    const tl = gsap.timeline();

    tl
      .fromTo(line, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.7, ease: Expo.easeOut })
      .fromTo(line, { x: 0 }, { x: allLetters.getBoundingClientRect().width + lineContinuationPx, duration: 0.7, ease: Expo.easeOut }, '+=0.1')
      .fromTo(letters, { opacity: 0 }, { opacity: 1, stagger: 0.035, duration: 0.6, ease: Expo.easeOut }, '-=0.7' )
      .fromTo(line, { opacity: 1 }, { opacity: 0, duration: 0.7, ease: Expo.easeOut }, '-=0.5' )

  }, [element, ...dependendies]);
};