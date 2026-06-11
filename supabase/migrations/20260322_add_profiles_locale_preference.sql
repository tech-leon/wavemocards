alter table public.profiles
add column if not exists locale_preference text not null default 'zh-TW';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_locale_preference_check'
  ) then
    alter table public.profiles
    add constraint profiles_locale_preference_check
    check (locale_preference in ('zh-TW', 'en', 'ja'));
  end if;
end $$;
