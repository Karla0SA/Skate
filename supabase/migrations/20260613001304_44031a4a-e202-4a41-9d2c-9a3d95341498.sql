DROP POLICY "Anyone can submit a contact message" ON public.contact_messages;
ALTER TABLE public.contact_messages DROP COLUMN phone;
UPDATE public.contact_messages SET email = 'desconhecido@exemplo.com' WHERE email IS NULL;
ALTER TABLE public.contact_messages ALTER COLUMN email SET NOT NULL;
CREATE POLICY "Anyone can submit a contact message"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(message) BETWEEN 1 AND 2000
  AND length(email) BETWEEN 3 AND 255
);