import {useState,useEffect} from "react"

interface UseCarouselProps{
    totalContent: number;
    interval?: number;
}

export const useCarousel=({totalContent,interval=4000}:UseCarouselProps)=> {
    const [currentIndex,setCurrentIndex] = useState(0)

    useEffect(()=>{
        const timer = setInterval(()=>{
            setCurrentIndex((prevIndex)=>(prevIndex+1)%totalContent)
        },interval)
        return ()=>clearInterval(timer)
    },[totalContent,interval])
  return currentIndex
}
