drop table if exists resources;

drop type if exists resources_status;

create type resources_status as enum ('approved', 'pending');

create table
  resources (
    id bigint primary key generated always as identity not null,
    created_at timestamptz default now () not null,
    url text unique not null,
    title text unique not null,
    description text not null default '',
    status resources_status default 'pending' not null,
    slug text unique not null
  );