import { NextResponse } from "next/server";



export function middleware() {
    return NextResponse.redirect(new URL('/dashboard'));
}


const config = {
    matcher: '/dashboard'
};

export default config;