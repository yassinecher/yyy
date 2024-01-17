import React from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Product } from '@/types'

const Details = (props: { motherboardId: Product | undefined }) => {

    return (
        <div>


            <Popover >
                <PopoverTrigger asChild>
                  <Btn/>
                </PopoverTrigger>
                <PopoverContent className="w-80 dark:bg-black mr-7 mb-0">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Dimensions</h4>
                            <p className="text-sm text-muted-foreground">
                                Set the dimensions for the layer.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="width">Width</Label>
                                <Input
                                    id="width"
                                    defaultValue="100%"
                                    className="col-span-2 h-8"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="maxWidth">Max. width</Label>
                                <Input
                                    id="maxWidth"
                                    defaultValue="300px"
                                    className="col-span-2 h-8"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="height">Height</Label>
                                <Input
                                    id="height"
                                    defaultValue="25px"
                                    className="col-span-2 h-8"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="maxHeight">Max. height</Label>
                                <Input
                                    id="maxHeight"
                                    defaultValue="none"
                                    className="col-span-2 h-8"
                                />
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover></div>
    )
}
const Btn=()=>{
    return (<>
      <button className='fixed bottom-0 right-0 z-50 mr-7 mb-7'>
                        <div className='shadow-md dark:bg-black drop-shadow hover:opacity-100 opacity-80  bg-amber-50 rounded-full p-2 border '
                        ><div className='bg-amber-500 text-white  fixed border rounded-full p-1 w-6 h-6 translate-x-10 -translate-y-4 text-xs'>?</div><svg version="1.0"
                            width="50" height="50" viewBox="0 0 1280.000000 765.000000"
                        >

                                <g transform="translate(0.000000,765.000000) scale(0.100000,-0.100000)"
                                    fill="currentColor" stroke="none">
                                    <path d="M9620 7641 c-69 -21 -130 -73 -166 -141 -18 -34 -19 -144 -19 -3675
0 -3531 1 -3641 19 -3675 26 -49 74 -98 121 -123 l40 -22 1500 0 1500 0 40 22
c47 25 95 74 121 123 18 34 19 144 19 3675 0 3531 -1 3641 -19 3675 -26 49
-74 98 -121 123 l-40 22 -1485 2 c-817 1 -1496 -2 -1510 -6z m2384 -823 c9
-12 16 -32 16 -43 0 -11 -7 -31 -16 -43 l-15 -22 -939 0 -939 0 -15 22 c-9 12
-16 32 -16 43 0 11 7 31 16 43 l15 22 939 0 939 0 15 -22z m0 -320 c22 -31 20
-64 -4 -88 -20 -20 -33 -20 -950 -20 -917 0 -930 0 -950 20 -24 24 -26 57 -4
88 l15 22 939 0 939 0 15 -22z m-203 -610 c52 -15 117 -73 140 -122 22 -49 25
-143 6 -189 -65 -155 -273 -193 -389 -70 -61 64 -78 171 -41 253 50 110 168
163 284 128z m147 -1400 c7 -7 12 -29 12 -49 0 -74 74 -69 -961 -69 -916 0
-929 0 -949 20 -22 22 -26 60 -10 91 10 19 32 19 953 19 720 0 946 -3 955 -12z
m0 -390 c7 -7 12 -29 12 -49 0 -74 74 -69 -961 -69 -916 0 -929 0 -949 20 -22
22 -26 60 -10 91 10 19 32 19 953 19 720 0 946 -3 955 -12z m0 -390 c7 -7 12
-29 12 -49 0 -74 64 -69 -967 -69 -910 0 -923 0 -943 20 -22 22 -26 60 -10 91
10 19 32 19 953 19 720 0 946 -3 955 -12z m0 -390 c7 -7 12 -29 12 -49 0 -74
64 -69 -967 -69 -910 0 -923 0 -943 20 -22 22 -26 60 -10 91 10 19 32 19 953
19 720 0 946 -3 955 -12z m222 -1329 c21 -12 47 -38 59 -59 20 -37 21 -49 21
-432 0 -393 0 -395 -22 -428 -13 -18 -36 -43 -51 -54 -27 -20 -42 -21 -315
-24 -282 -3 -288 -2 -332 20 -33 17 -51 35 -67 68 -23 43 -23 50 -23 415 0
211 4 385 10 404 5 19 20 45 32 59 45 49 63 51 367 52 270 0 285 -1 321 -21z"/>
                                    <path d="M109 7597 c-29 -16 -54 -40 -74 -72 l-30 -48 -3 -2801 c-3 -3086 -7
-2846 58 -2913 67 -68 -94 -63 1919 -63 1617 0 1821 -2 1821 -15 0 -15 -78
-1007 -82 -1055 l-3 -25 -677 -5 c-813 -6 -733 11 -733 -156 l0 -108 34 -23
34 -23 2024 0 c2206 0 2081 -3 2103 55 14 36 13 168 -1 199 -26 55 -32 56
-724 56 -598 0 -635 1 -635 18 0 9 -18 240 -40 512 -22 272 -40 512 -40 533
l0 37 1818 0 c1736 0 1819 1 1857 19 58 26 101 80 115 143 8 39 10 779 8 2833
-3 2568 -4 2782 -20 2810 -20 38 -63 78 -105 99 -29 15 -392 16 -4306 16
l-4274 0 -44 -23z m8526 -2937 l0 -2675 -4207 -3 -4208 -2 0 2680 0 2680 4208
-2 4207 -3 0 -2675z"/>
                                </g>
                            </svg>
                        </div>
                    </button>
    </>)
}
export default Details