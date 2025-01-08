import React from "react";

import { Card } from "@/components/ui/card"
  



export function ChatBoxCentering({children}: {children: React.ReactNode}) {
    return(
        <div className="min-h-screen flex justify-center items-center">
            {children}
        </div>
    )
}

export function ChatBoxCard({children}: {children: React.ReactNode}) {
    return(
        <Card className="w-[1200px] h-[650px]">
           {children}
        </Card>
    )
}

export function ChatBoxContents({children}: {children: React.ReactNode}) {
    return(
        <div className="bg-gray-200 h-[610px] w-[1150px] mx-auto mt-4 border border-black rounded-md">
            {children}
        </div>
    )
}

export function ChatBoxInnerContainer({children}: {children: React.ReactNode}) {
    return(
        <div className="w-full display: flex flex-col text-black">
            <div className="py-2 border border-black bg-blue-400">
                {children}
            </div>
        </div>
    )
}