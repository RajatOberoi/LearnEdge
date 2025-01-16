import {clerkMiddleware,createRouteMatcher} from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isStudentRoute = createRouteMatcher(['/user/(.*)'])
const isTeacherRoute = createRouteMatcher(['/teacher/(.*)'])

export default clerkMiddleware(async(auth,req)=>{
    
    const {sessionClaims} = await auth()

    const claims = sessionClaims as {
        userInfo?:{
            userType?: 'student'|'teacher'|null
        },
        [key: string]: any
    }

    const userType = claims?.userInfo?.userType || null;  

    if (isStudentRoute(req)) {
      if (!userType || userType !== 'student') {
        const url = new URL(userType ? '/teacher/courses' : '/', req.url);
        return NextResponse.redirect(url);
      }
    }
  
    if (isTeacherRoute(req)) {
      if (!userType || userType !== 'teacher') {
        const url = new URL(userType ? '/user/courses' : '/', req.url);
        return NextResponse.redirect(url);
      }
    }
  
    return NextResponse.next();
  

})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
      ],    
}