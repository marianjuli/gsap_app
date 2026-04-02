import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { performanceImages, performanceImgPositions } from "../constants/index.js";
import {useMediaQuery} from "react-responsive";

const Performance = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const sectionRef = useRef(null); //we create a reference to the section element that we want to animate. This allows us to target the section for our GSAP animations and scroll triggers.

    useGSAP(
        () => {
            const sectionEl = sectionRef.current;
            if (!sectionEl) return;

            // Text Animation
            gsap.fromTo(
                ".content p",
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: ".content p", //we trigger the animation when the paragraph element comes into view
                        start: "top bottom", //the animation starts when the top of the paragraph hits the bottom of the viewport
                        end: "top center", //the animation ends when the top of the paragraph hits the center of the viewport
                        scrub: true, //the animation is linked to the scroll position, so it will play forward as you scroll down and reverse as you scroll up
                        invalidateOnRefresh: true, //this ensures that the animation is recalculated if the viewport size changes, which is important for responsive design
                    },
                }
            );

            if (isMobile) return;

            // Image Positioning Timeline
            const tl = gsap.timeline({
                defaults: { duration: 2, ease: "power1.inOut", overwrite: "auto" }, //we set default properties for all animations in the timeline, including a duration of 2 seconds, an easing function for smooth transitions, and overwrite set to "auto" to prevent conflicts between animations
                scrollTrigger: {
                    trigger: sectionEl, //we trigger the timeline when the section element comes into view
                    start: "top bottom",//the timeline starts when the top of the section hits the bottom of the viewport
                    end: "bottom top",//the timeline ends when the bottom of the section hits the top of the viewport
                    scrub: 1,   //the timeline is linked to the scroll position with a delay of 1 second, allowing for smooth and responsive animations as the user scrolls through the section
                    invalidateOnRefresh: true,
                },
            });

            // Position Each Performance Image
            performanceImgPositions.forEach((item) => {
                if (item.id === "p5") return;

                const selector = `.${item.id}`;
                const vars = {};

                if (typeof item.left === "number") vars.left = `${item.left}%`; //if a left position exists, then we move it that percentage to the left
                if (typeof item.right === "number") vars.right = `${item.right}%`; //if a right position exists, then we move it that percentage to the right
                if (typeof item.bottom === "number") vars.bottom = `${item.bottom}%`; //if a bottom position exists, then we move it that percentage to the bottom  

                if (item.transform) vars.transform = item.transform;//if a transform property exists, then we apply that transform to the image

                tl.to(selector, vars, 0);
            });
        },
        { scope: sectionRef, dependencies: [isMobile] }
    );

    return (
        <section id="performance" ref={sectionRef}>
            <h2>Next-level graphics performance. Game on.</h2>

             <div className="wrapper">
                {performanceImages.map((item, index) => (
                    <img
                        key={index}
                        src={item.src}
                        className={item.id}
                        alt={item.alt || `Performance Image #${index + 1}`}
                    />
                ))}
             </div>

            <div className="content">
                <p>
                    Run graphics-intensive workflows with a responsiveness that keeps up
                    with your imagination. The M4 family of chips features a GPU with a
                    second-generation hardware-accelerated ray tracing engine that renders
                    images faster, so{" "}
                    <span className="text-white">
            gaming feels more immersive and realistic than ever.
          </span>{" "}
                    And Dynamic Caching optimizes fast on-chip memory to dramatically
                    increase average GPU utilization — driving a huge performance boost
                    for the most demanding pro apps and games.
                </p>
            </div>
        </section>
    )
}
export default Performance