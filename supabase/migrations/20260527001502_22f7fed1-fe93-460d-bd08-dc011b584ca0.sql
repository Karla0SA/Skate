REVOKE SELECT, UPDATE, DELETE ON public.contact_messages FROM anon, authenticated;

CREATE POLICY "Deny all reads of contact messages"
ON public.contact_messages
FOR SELECT
TO anon, authenticated
USING (false);

CREATE POLICY "Deny all updates of contact messages"
ON public.contact_messages
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "Deny all deletes of contact messages"
ON public.contact_messages
FOR DELETE
TO anon, authenticated
USING (false);