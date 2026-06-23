import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/src/lib/supabase/server';
import { createClient } from '@supabase/supabase-js';

// Admin client - service role key use karta hai
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { password, token } = await req.json();

    if (!password || !token) {
      return NextResponse.json(
        { error: 'Password and token are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Normal client - password_resets table ke liye
    const supabase = await createSupabaseServerClient();

    // Token verify karo
    const { data: resetRecord, error: queryError } = await supabase
      .from('password_resets')
      .select('email')
      .eq('token', token)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (queryError || !resetRecord) {
      console.error('[reset-password] Token validation error:', queryError);
      return NextResponse.json(
        { error: 'Reset link has expired or is invalid. Please request a new one.' },
        { status: 400 }
      );
    }

    const email = resetRecord.email;

    // Admin client se user dhundo - listUsers ki jagah filter use karo
    const { data: usersData, error: getUserError } = await supabaseAdmin.auth.admin.listUsers({
      // page aur perPage set karo taake sab load na ho
    });

    if (getUserError || !usersData?.users) {
      console.error('[reset-password] Error listing users:', getUserError);
      return NextResponse.json(
        { error: 'An error occurred. Please try again.' },
        { status: 500 }
      );
    }

    const user = usersData.users.find((u) => u.email === email);

    if (!user) {
      console.error('[reset-password] User not found for email:', email);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 400 }
      );
    }

    // Admin client se password update karo
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      password,
    });

    if (updateError) {
      console.error('[reset-password] Update error:', updateError.message);
      return NextResponse.json(
        { error: updateError.message || 'Failed to reset password' },
        { status: 400 }
      );
    }

    // Token delete karo - use ho gaya
    await supabase
      .from('password_resets')
      .delete()
      .eq('token', token);

    console.log('[reset-password] Password reset successful for:', email);

    return NextResponse.json(
      { success: true, message: 'Password reset successful. Please sign in with your new password.' },
      { status: 200 }
    );

  } catch (err) {
    console.error('[reset-password API] Error:', err);
    return NextResponse.json(
      { error: 'An error occurred while resetting your password' },
      { status: 500 }
    );
  }
}