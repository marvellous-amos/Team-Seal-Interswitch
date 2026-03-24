-- ═══════════════════════════════════════════════════════════════════
-- NoBeScam — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run
-- ═══════════════════════════════════════════════════════════════════

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── Users Table ──────────────────────────────────────────────────
create table if not exists public.users (
  id              uuid primary key references auth.users on delete cascade,
  email           text,
  character_id    text,                    -- 'chinedu' | 'omotola'
  character_name  text,                    -- 'Chinedu' | 'Omotola'
  business_type   text,                    -- 'food_vendor' | 'sportswear' | 'palm_wine'
  streak_count    integer default 0,
  highest_score   integer default 0,
  current_level   integer default 1,
  total_correct   integer default 0,
  total_wrong     integer default 0,
  reputation_score integer default 100,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ─── User Sessions Table ──────────────────────────────────────────
create table if not exists public.user_sessions (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid references public.users(id) on delete cascade,
  score          integer default 0,
  accuracy       integer default 0,
  level_reached  integer default 1,
  scams_blocked  integer default 0,
  safe_blocked   integer default 0,
  total_answered integer default 0,
  timestamp      timestamptz default now()
);

-- ─── User Answers Table ───────────────────────────────────────────
create table if not exists public.user_answers (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid references public.users(id) on delete cascade,
  scenario_id     integer,                 -- local JS id, not FK
  selected_answer text not null check (selected_answer in ('scam', 'safe')),
  correct         boolean not null,
  response_time   integer,                 -- milliseconds
  created_at      timestamptz default now()
);

-- ─── Row Level Security ───────────────────────────────────────────
alter table public.users enable row level security;
alter table public.user_sessions enable row level security;
alter table public.user_answers enable row level security;

-- Users: own row only
create policy "users_select_own" on public.users
  for select using (auth.uid() = id);

create policy "users_insert_own" on public.users
  for insert with check (auth.uid() = id);

create policy "users_update_own" on public.users
  for update using (auth.uid() = id);

-- Sessions: own rows only
create policy "sessions_select_own" on public.user_sessions
  for select using (auth.uid() = user_id);

create policy "sessions_insert_own" on public.user_sessions
  for insert with check (auth.uid() = user_id);

-- Answers: own rows only
create policy "answers_select_own" on public.user_answers
  for select using (auth.uid() = user_id);

create policy "answers_insert_own" on public.user_answers
  for insert with check (auth.uid() = user_id);

-- ─── Indexes ──────────────────────────────────────────────────────
create index if not exists idx_user_sessions_user_id on public.user_sessions(user_id);
create index if not exists idx_user_answers_user_id on public.user_answers(user_id);

alter table public.user_answers add column if not exists level_at_answer integer;
alter table public.user_answers add column if not exists business_type text;

alter table public.users add column if not exists wallet_id text;
