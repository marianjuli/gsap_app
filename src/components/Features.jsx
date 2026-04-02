import { Canvas } from "@react-three/fiber";
import {features, featureSequence} from "../constants/index.js";
import StudioLights from "./three/StudioLights";
import clsx from "clsx";
import { Suspense, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import MacbookModel from "./models/Macbook.jsx";
import { useMediaQuery } from "react-responsive";
import useMacbookStore from "../store/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ModelScroll = () => {
  const groupRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const { setTexture } = useMacbookStore(); // get access to the setTexture function from the Zustand store which will allow to change the video on scroll



//Preload all feature videos during the initial load of the app. This is done using the useEffect hook, which runs after the component mounts. We create an array of video paths from the featureSequence and then use Promise.all to load all the videos as HTMLVideoElements. Once all videos are loaded, we can be confident that they will play smoothly when we set them as textures on the MacBook screen during scrolling.

 useEffect(() => {
        featureSequence.forEach((feature) => {
            const v = document.createElement('video');//create a new video element for each feature video path. Allows us to load the videos in the background without rendering them in the DOM, which is more efficient and keeps our UI clean.

            Object.assign(v, {
                src: feature.videoPath,
                muted: true,
                playsInline: true,
                preload: 'auto',
                crossOrigin: 'anonymous', //set the crossOrigin attribute to 'anonymous' to allow loading videos from different origins without sending credentials. This is important for security reasons and to ensure that the videos can be used as textures in WebGL without CORS issues.
            });

            v.load();
        })
    }, []);

  useGSAP(() => {
        // 3D MODEL ROTATION ANIMATION
        const modelTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: 'top top',
                end: 'bottom  top',
                scrub: 1,
                pin: true,
            }
        });

        // SYNC THE FEATURE CONTENT
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: 'top center',
                end: 'bottom  top',
                scrub: 1,
            }
        })


// 3D SPIN
        if(groupRef.current) { //check if the groupRef is attached to the 3D model before trying to animate it. This is important because if the ref is not yet attached (for example, if the model is still loading), trying to access groupRef.current.rotation would result in an error. By checking if groupRef.current exists, we ensure that we only attempt to animate the model's rotation once it is fully loaded and ready in the scene.
            modelTimeline.to(groupRef.current.rotation, { y: Math.PI * 2, ease: 'power1.inOut'})
        }
      

         // Content & Texture Sync
        timeline
            .call(() => setTexture('/videos/feature-1.mp4')) //set the texture to the first feature video when the timeline starts. This ensures that the correct video is displayed on the MacBook screen as soon as the user starts scrolling through the features.
            .to('.box1', { opacity: 1, y: 0, delay: 1 }) //animate the first feature box to fade in and move up slightly as it becomes visible. The delay of 1 second allows the video texture to update on the MacBook screen before the content appears, creating a more cohesive and synchronized experience for the user.

            .call(() => setTexture('/videos/feature-2.mp4'))
            .to('.box2', { opacity: 1, y: 0 })

            .call(() => setTexture('/videos/feature-3.mp4'))
            .to('.box3', { opacity: 1, y: 0 })

            .call(() => setTexture('/videos/feature-4.mp4'))
            .to('.box4', { opacity: 1, y: 0})

            .call(() => setTexture('/videos/feature-5.mp4'))
            .to('.box5', { opacity: 1, y: 0 })
    }, []);



  return (
    <group ref={groupRef}>
      <Suspense
        fallback={
          <Html>
            <h1 className="text-white text-3xl ppercase">Loading...</h1>
          </Html>
        }
      >
        {" "}
        //the Suspense component is used to wrap the MacbookModel component,
        which allows us to display a fallback UI (in this case, a simple
        "Loading..." message) while the 3D model is being loaded. This is
        important because loading 3D models can take some time, and we want to
        provide feedback to the user that something is happening while they wait
        for the model to appear.
        <MacbookModel
          scale={isMobile ? 0.05 : 0.08}
          position={[0, -1, 0]}
        />{" "}
        //positioning the MacBook model slightly lower on the Y-axis to ensure
        it is fully visible within the canvas, especially on smaller screens.
        The scale is also adjusted based on whether the user is on a mobile
        device or not, ensuring that the model looks good and fits well within
        the viewport regardless of the device being used.
      </Suspense>
    </group>
  );
};

const Features = () => {
  return (
    <section id="features">
      <h2>See it all in a new light</h2>
      <Canvas id="f-canvas" camera={{}}>
        {/* 3D model and animations will go here.Comes from React 3D Model*/}
        <StudioLights />
        <ambientLight intensity={0.5} />

        <ModelScroll />
      </Canvas>

      <div className="absolute inset-0">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={clsx("box", `box${index + 1}`, feature.styles)}
          >
            <img src={feature.icon} alt={feature.highlight} />
            <p>
              <span className="text-white">{feature.highlight}</span>
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
