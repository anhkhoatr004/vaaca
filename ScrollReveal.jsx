import { useEffect } from 'react';

const ScrollReveal = () => {
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observe all elements with vaaca-reveal class
    const elements = document.querySelectorAll('.vaaca-reveal');
    elements.forEach((el) => {
      revealObserver.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        revealObserver.unobserve(el);
      });
    };
  }, []);

  return null;
};

export default ScrollReveal;
