create table estates (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  location text,
  description text,
  tagline text,
  video_url text,
  map_lat numeric,
  map_lng numeric,
  cofo_url text,
  survey_url text,
  brochure_url text,
  hero_images jsonb default '[]',
  site_media jsonb default '[]',
  active boolean default true,
  sold_out boolean default false,
  created_at timestamptz default now()
);

create table plots (
  id uuid primary key default gen_random_uuid(),
  estate_id uuid references estates(id) on delete cascade,
  size_sqm int not null,
  outright_price bigint not null,
  plan_3m_monthly bigint,
  plan_6m_monthly bigint,
  plots_left int default 0,
  status text default 'available',
  created_at timestamptz default now()
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  estate_id uuid references estates(id),
  plot_id uuid references plots(id),
  name text not null,
  phone text not null,
  email text,
  size_sqm int,
  inspection_date text,
  inspection_time text,
  guests int default 1,
  amount_paid bigint default 0,
  payment_ref text,
  payment_status text default 'pending',
  status text default 'pending',
  notes text,
  created_at timestamptz default now()
);

create table faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int default 0
);

create table settings (
  id int primary key default 1,
  brand_name text default 'Realtor Debbie',
  logo_url text,
  whatsapp text,
  email text,
  instagram text,
  facebook text,
  primary_color text default '#0B6E4F',
  constraint single_row check (id = 1)
);
insert into settings (id) values (1);

alter table estates enable row level security;
alter table plots enable row level security;
alter table bookings enable row level security;
alter table faqs enable row level security;
alter table settings enable row level security;

create policy "public read estates" on estates for select using (true);
create policy "public read plots" on plots for select using (true);
create policy "public read faqs" on faqs for select using (true);
create policy "public read settings" on settings for select using (true);
create policy "public insert bookings" on bookings for insert with check (true);

-- SEED DATA — APO WASSA
insert into estates (slug, name, location, tagline, description, map_lat, map_lng, hero_images)
values (
  'access-gate-estate',
  'Access Gate Estate, APO WASSA',
  'Along APO-KARSHI Express Way, By Tarred Road',
  'C of O Verified · Buy & Build · 2 Mins to Tarred Road',
  'Access Gate Estate is a fully serviced residential estate located along APO-KARSHI Express Way, by tarred road. C of O title, buy and build immediately.',
  8.98, 7.42,
  '[]'::jsonb
);

insert into plots (estate_id, size_sqm, outright_price, plan_3m_monthly, plan_6m_monthly, plots_left, status)
select id, 180, 900000, 330000, 170000, 12, 'available' from estates where slug='access-gate-estate';
insert into plots (estate_id, size_sqm, outright_price, plan_3m_monthly, plan_6m_monthly, plots_left, status)
select id, 300, 1500000, 550000, 280000, 8, 'available' from estates where slug='access-gate-estate';
insert into plots (estate_id, size_sqm, outright_price, plan_3m_monthly, plan_6m_monthly, plots_left, status)
select id, 500, 2500000, 900000, 460000, 4, 'available' from estates where slug='access-gate-estate';
insert into plots (estate_id, size_sqm, outright_price, plan_3m_monthly, plan_6m_monthly, plots_left, status)
select id, 1000, 4800000, 1700000, 880000, 2, 'available' from estates where slug='access-gate-estate';

insert into faqs (question, answer, sort_order) values
('Is the road tarred?', 'Yes. Video proof is available in the Media section.', 1),
('Is the C of O verifiable?', 'Yes, you can verify at AGIS (Abuja Geographic Information Systems).', 2),
('Can I pay in installments?', 'Yes — 3 months or 6 months plans available.', 3),
('Can I build immediately?', 'Yes. This is a Buy & Build estate.', 4),
('Are there extra fees?', 'No. Price includes documentation.', 5);
