import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function EmailData() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    const username = data.user?.email?.split('@')[0] ?? 'user';
    if (error || !data?.user) {
      redirect('/login')
    }
    return(
        <span>Welcome Back, {username}</span>
    )
}
