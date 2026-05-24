
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text not null,
  anonymous boolean not null default false,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Allow anyone (including unauthenticated) to insert a message
create policy "Anyone can submit a contact message"
on public.contact_messages
for insert
to anon, authenticated
with check (
  length(message) between 1 and 2000
  and length(phone) between 8 and 20
);

-- No public read policy: messages are private; viewable only via service role in backend
