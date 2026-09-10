import { motion } from "motion/react"
import React, { useRef } from "react"
import Floating, {
    FloatingElement,
} from "#components/fancy/image/parallax-floating"
import SimpleMarquee from "#components/fancy/blocks/simple-marquee"
import { Button } from "#components/ui/pixelact-ui/button"
import { Button as PixelButton } from "#components/ui/button"
export default function LandingPage() {
    const exampleImages = [
        "/src/assets/meals/food1.png",
        "/src/assets/meals/food2.png",
        "/src/assets/meals/food3.png",
    ]
    const MarqueeItem = ({ children }: { children: React.ReactNode }) => (
        <div className="mx-2 sm:mx-3 md:mx-4 hover:scale-105 cursor-pointer duration-300 ease-in-out">
            {children}
        </div>
    )
    const container = useRef<HTMLDivElement>(null)
    return (
        <>
            <main className="relative min-h-screen overflow-hidden bg-[#111]">
            
                {/* Hero content */}
                <div className="pointer-events-none relative z-20 flex min-h-screen flex-col items-center justify-center text-center -translate-y-1/6" >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex w-full justify-center"
                    >
                        <svg
                            viewBox="0 0 800 300"
                            className="w-full max-w-4xl overflow-visible"
                        >
                            <defs>
                                <path
                                    id="textCurve"
                                    d="M 100 200 Q 400 25 700 200"
                                />
                            </defs>

                            <text
                                className="fill-orange-400 font-bold text-[64px]"
                            >
                                <textPath
                                    href="#textCurve"
                                    startOffset="50%"
                                    textAnchor="middle"
                                >
                                    Roll Your Lunch
                                </textPath>
                            </text>
                            <text
                                className="fill-gray-100 font-bold text-[65px] -translate-y-[5px] "
                                stroke="#3b2415"
                                strokeWidth="3"
                                paintOrder="stroke"
                            >
                                <textPath
                                    href="#textCurve"
                                    startOffset="50%"
                                    textAnchor="middle"
                                >
                                    Roll Your Lunch
                                </textPath>
                            </text>
                        </svg>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="mt-4 max-w-xl"
                    >
                        <PixelButton>Discover delicious meals and ingredients.</PixelButton>
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mt-4 max-w-xl text-white/80"
                    >
                        <Button className="pointer-events-auto">
                            Get Started
                        </Button>
                    </motion.p>

                </div>
                {/* Parallax layers */}
                <Floating
                    sensitivity={.7}
                    className="absolute inset-0 h-full w-full overflow-hidden"
                >

                    {/* BACKGROUND */}
                    <FloatingElement
                        depth={0.5}
                        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                    >
                        <img
                            src="/src/assets/back.png"
                            alt="Fireplace background"
                            className="block h-auto w-full select-none object-contain"
                            draggable={false}
                        />
                    </FloatingElement>


                    {/* FIRE / FOREGROUND */}
                    <FloatingElement
                        depth={1}
                        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                    >
                        <img
                            src="/src/assets/front.png"
                            alt="Fire"
                            className="block h-auto w-full select-none object-contain"
                            draggable={false}
                        />
                    </FloatingElement>
                    <SimpleMarquee
                        className="fixed bottom-[20px] left-0 w-full"
                        baseVelocity={8}
                        repeat={4}
                        draggable={false}
                        scrollSpringConfig={{ damping: 50, stiffness: 400 }}
                        slowDownFactor={0.1}
                        slowdownOnHover
                        slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
                        scrollAwareDirection={true}
                        scrollContainer={container}
                        useScrollVelocity={true}
                        direction="left"
                    >
                        {exampleImages.map((src, i) => (
                            <MarqueeItem key={i}>
                                <img
                                    src={src}
                                    alt={`Image ${i + 1}`}
                                    className="h-18 w-26 sm:h-26 sm:w-32 md:h-32 md:w-40 object-cover"
                                />
                            </MarqueeItem>
                        ))}
                    </SimpleMarquee>
                </Floating>
            </main>
        </>
    )

}