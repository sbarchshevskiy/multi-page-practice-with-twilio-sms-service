DROP TABLE IF EXISTS users, menus, orders, menu_items, order_menu_items;

create table users(
id serial primary key not null,
name varchar(255),
email varchar(255),
password varchar(255),
phone_number varchar(255),
is_owner boolean
);

create table menus(
id serial primary key not null,
name varchar(255),
description varchar(255)
);

create table orders(
id serial primary key not null,
user_id integer REFERENCES users(id) ON DELETE CASCADE,
is_ready boolean,
is_accepted boolean,
time_created TIMESTAMP
);

create table menu_items(
id serial primary key not null,
menu_id integer REFERENCES menus(id) ON DELETE CASCADE,
name varchar(255),
price integer,
description text,
cooking_time integer,
thumbnail varchar(255)
);

create table order_menu_items(
id serial primary key not null,
order_id integer REFERENCES orders(id) ON DELETE CASCADE,
menu_item_id integer REFERENCES menu_items(id) ON DELETE CASCADE,
quantity integer
);




