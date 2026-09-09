-- Run this AFTER the user has created an account in PhoneHub.
-- Replace the email below with the admin account email.
update public.profiles
set role = 'admin'
where email = 'YOUR_ADMIN_EMAIL@example.com';

-- Verify:
select id, email, role from public.profiles where email = 'YOUR_ADMIN_EMAIL@example.com';
