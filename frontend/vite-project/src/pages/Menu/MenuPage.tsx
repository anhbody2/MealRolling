import { motion } from "motion/react"
import React, { useRef, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "#components/ui/pixelact-ui/card"
import { Button } from "#components/ui/pixelact-ui/button"
import { Button as NButton } from "@base-ui/react"
import { Drawer, DrawerTrigger, DrawerContent } from "#components/ui/pixelact-ui/drawer"
import { PageIndicator } from "#components/ui/pixelact-ui/indicator";
import Floating, {
    FloatingElement,
} from "#components/fancy/image/parallax-floating"
export default function MenuPage() {
    const exampleImages = [
        "/src/assets/meals/food1.png",
        "/src/assets/meals/food2.png",
        "/src/assets/meals/food3.png",
        "/src/assets/meals/food3.png",
        "/src/assets/meals/food1.png",
        "/src/assets/meals/food2.png",
        "/src/assets/meals/food3.png",
        "/src/assets/meals/food3.png",
        "/src/assets/meals/food1.png",

    ]
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = 4;
    return (
        <>
            <main className="relative min-h-screen overflow-hidden bg-[#111]">
                {/* Parallax layers */}
                <Drawer>
                    <DrawerTrigger asChild>
                        <NButton className="absolute -bottom-[40px] left-0 z-20 flex flex-col items-center justify-center text-center ">
                            <img src="/src/assets/menuicon.png" className="w-72 h-72 " alt="" /></NButton>
                    </DrawerTrigger>
                    <DrawerContent className="bg-amber-100">
                        <div className="relative">
                            {/* Page indicator */}
                            <PageIndicator
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                className="absolute left-1/2 top-3 -translate-x-1/2"
                            />

                            {/* Your menu content */}
                           
                        </div>
                        <div className="grid grid-cols-1 gap-4 mx-4 md:my-0 md:mx-12 md:grid-cols-2 lg:grid-cols-3">
                            {exampleImages.map((product) => (
                                <motion.div initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}>
                                    <Card className="flex flex-row overflow-hidden">
                                        {/* Image */}
                                        <div className="w-32 md:w-48 shrink-0">
                                            <img
                                                src={product}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex min-w-0 flex-1 flex-col">
                                            <CardHeader>
                                                <CardTitle className=" font-bold  truncate text-lime-700">
                                                    HP+50%
                                                </CardTitle>

                                                <CardDescription className="text-lime-700">
                                                    WC+10
                                                </CardDescription>
                                            </CardHeader>

                                            <CardContent className="flex-1 text-red-400">
                                                <p className="font-bold">
                                                    HUNG-30%
                                                </p>
                                            </CardContent>

                                            <CardFooter>
                                                <Button size="sm">35$</Button>
                                            </CardFooter>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </DrawerContent>
                </Drawer>
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
                            src="/src/assets/Menubackground.png"
                            alt="Fireplace background"
                            className="block h-auto w-full select-none object-contain"
                            draggable={false}
                        />
                    </FloatingElement>


                    {/* FIRE / FOREGROUND */}
                    {/* <FloatingElement
                        depth={1}
                        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                    >
                        <img
                            src="/src/assets/front.png"
                            alt="Fire"
                            className="block h-auto w-full select-none object-contain"
                            draggable={false}
                        />
                    </FloatingElement> */}
                </Floating>
            </main>


        </>
    )
}