
create table users(
id serial primary key not null,
client_name varchar(255),
email varchar(255),
password varchar(255),
phone_number varchar(255),
is_owned boolean
);

create table menus(
id serial primary key not null,
menu_name varchar(255),
menu_description varchar(255),
other_details varchar(255)
);

create table orders(
id serial primary key not null,
menu_items_id integer REFERENCES menu_items(id),
user_id integer REFERENCES users(id),
is_ready boolean,
accepted boolean
order_menu_items_id integer REFERENCES order_menu_items(id)
);

create table order_menu_items(
id serial primary key not null,
order_item_id integer,
menu_item_id integer REFERENCES menu_items(id),
quantity integer
);


create table menu_items(
id serial primary key not null,
menu_id integer REFERENCES menus(id),
item_name varchar(255),
price integer,
item_description text,
cooking_time integer,
thumbnail varchar(255)
);


