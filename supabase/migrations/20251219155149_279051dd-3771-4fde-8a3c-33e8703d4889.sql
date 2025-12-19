-- Add email column to trusted_contacts for email notifications
ALTER TABLE public.trusted_contacts 
ADD COLUMN email text;