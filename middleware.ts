import {NextRequest, NextResponse} from 'next/server'
import {getToken} from 'next-auth/jwt'

export const middleware = async (req: NextRequest) => {

    const session = await getToken({
        req,
        secret: process.env.JWT_SECRET,
        secureCookie: process.env.NODE_ENV === 'production'
    })

    if (req.nextUrl.pathname === '/') {
        if (!session) return NextResponse.redirect(new URL('/login', req.url))
    } else if (req.nextUrl.pathname === '/login' && session) {
        return NextResponse.redirect(new URL('/', req.url))
    }
}