import {useMediaQuery} from "react-responsive";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";




const Highlights = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" }); //we use the useMediaQuery hook from the react-responsive library to determine if the user is on a mobile device.
  // This allows us to conditionally render or style components based on the screen size, ensuring a responsive design that looks good on both desktop and mobile devices.

  useGSAP(
    () => {
      gsap.to([".left-column, .right-column"], {
        scrollTrigger: {
          trigger: "#highlights", //we trigger the animation when the highlights section comes into view
          start: isMobile ? "bottom bottom" : "top top",
        },
        y: 0,
        opacity: 1,
        stagger: 0.5, //we stagger the  animation of the left and right columns by 0.5 seconds, creating a more dynamic and visually appealing entrance effect as the user scrolls through the highlights section.
        ease: "power1.out",
        duration: 1,
      });
    },
    { dependencies: [isMobile], revertOnUpdate: true },
  );

  return (
    <section id="highlights">
      <h2>There's never been a better time to upgrade</h2>
      <h3>Here's what you get with the new MacBook Pro</h3>

      <div className="masonry">
        <div className="left-column">
          <div>
            <img src="/laptop.png" alt="laptop" />
            <p>Fly through demanding tasks up to 9.8x faster</p>
          </div>

          <div>
            <img src="/sun.png" alt="Sun" />
            <p>A stunning Liquid Retina XDR display</p>
          </div>
        </div>

        <div className="right-column">
          <div className="apple-gradient">
            <img src="/ai.png" alt="AI" />
            <p>
              Built for <br />
              <span>Apple Intelligence</span>
            </p>
          </div>

          <div>
            <img src="/battery.png" alt="Battery" />
            <p>
              Up to <br />
              <span className="green-gradient">
                {""}14 more hours{""}
              </span>{" "}
              of battery life
              <span className="text-dark-100"> (Up to 24 hours total.)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
