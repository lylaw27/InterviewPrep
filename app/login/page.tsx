'use client'
import { login, signup } from './actions'
import { Image } from '@nextui-org/react'
import Script from 'next/script'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

declare global {
  function handleSignInWithGoogle(response: { credential: any; }): void;
}

export default function LoginPage({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}) {
  const router = useRouter();
  const supabase = createClient(); 
  globalThis.handleSignInWithGoogle = async function (response: { credential: any; }) {
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: response.credential,
  });
  router.push("/myquestion")
  }
  const signupAction = signup.bind(null, searchParams.paying);
  const loginAction = login.bind(null, searchParams.paying);

  return (
    <div className="flex h-screen bg-midnight justify-center items-center">
      <Script src="https://accounts.google.com/gsi/client" async></Script>
      <div>
      <div className="flex overflow-hidden bg-white rounded-md shadow-lg">
        <div className="p-10 bg-white flex-1">
          <div className="flex justify-center">
            <Image className="rounded-full" src="/avatar.png" alt="logo" width={70} height={70}></Image>
          </div>
          <h3 className="my-4 text-2xl font-semibold text-gray-700"></h3>
          <form action="#" className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                autoFocus
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
                <a href="#" className="text-sm text-midnight hover:underline focus:text-blue-600">Forgot Password?</a>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                />
              <label htmlFor="remember" className="text-sm font-semibold text-gray-500">Remember me</label>
            </div>
            <div>
              <button
                formAction={loginAction}
                type="submit"
                className="w-full px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 bg-midnight rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                Log in
              </button>
            </div>
            <div>
              <button
                formAction={signupAction}
                type="submit"
                className="w-full px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 bg-midnight rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                Sign Up
              </button>
            </div>
            <div className="flex flex-col space-y-5">
              <span className="flex items-center justify-center space-x-2">
                <span className="h-px bg-gray-400 w-14"></span>
                <span className="font-normal text-gray-500">or </span>
                <span className="h-px bg-gray-400 w-14"></span>
              </span>
              <div className="flex flex-col items-center justify-center space-y-4">
              <div id="g_id_onload" data-nonce="" data-client_id="9967080356-qfhll261md5tvibrf3i1qm95ur14tkhj.apps.googleusercontent.com" data-context="signin" data-ux_mode="popup" data-callback="handleSignInWithGoogle" data-itp_support="true"></div>
              <div className="g_id_signin" data-type="standard" data-shape="pill" data-theme="filled_blue" data-text="signin_with" data-size="large" data-locale="zh-HK" data-logo_alignment="left"></div>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  )
}
