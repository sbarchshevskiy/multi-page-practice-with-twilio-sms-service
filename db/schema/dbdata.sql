insert into menus(id, menu_name, description, other_details)
values(100, 'marcos_deli', 'amazing chewy stuff', 'avaiable all week');
insert into menus(id, menu_name, description, other_details)
values(200, 'marcos_deli', 'fluffy duffu', 'avaiable all week');
insert into menus(id, menu_name, description, other_details)
values(300, 'marcos_deli', 'saussage paradise', 'avaiable all week');
insert into menus(id, menu_name, description, other_details)
values(400, 'peggy sue specials', 'breakfast all day', 'avaiable weekends');
insert into menus(id, menu_name, description, other_details)
values(500, 'chef chipolino', 'yesterdays osso bucco', 'avaiable tomorrow');
insert into menus(id, menu_name, description, other_details)
values(600, 'specials', 'health gigantic snack','meat lovers');


insert into menu_items
(id, menu_id, item_name, price, item_description, cooking_time, thumbnail)
values(10, 100, 'piquente', 10, 'you will not be hungry by the time year ends', 20, 'https://bit.ly/30sTyHr');
insert into menu_items
values(20, 200, 'caliente', 10, 'your ex will be jealous', 10, 'https://bit.ly/38o0dae');
insert into menu_items
values(30, 300, 'mucho caliente', 10, 'best since you finished high school', 5, 'https://bit.ly/38smh3H');
insert into menu_items
values(40, 400, 'mucho caliente piquente', 10, 'just like your mamma cooked', 25, 'https://bit.ly/3cfrYCZ');
insert into menu_items
values(50, 500, 'vamos a la playa, je vais boire la mer', 10, 'you will not be hungry by the time year ends', 15, 'https://bit.ly/2OfmCzC');


insert into users(id, client_name, email, password, phone_number, is_owner)
values(111, 'ricardo', 'ricardo@lasvegas.com', 'allInBets', '5559871432', true);
insert into users(id, client_name, email, password, phone_number, is_owner)
values(222, 'mojo', 'mojo@trump.com', 'maga', '445693932', false);
insert into users(id, client_name, email, password, phone_number, is_owner)
values(333, 'maria', 'chica@loca.com', 'mananamanana', '5345551432', true);
insert into users(id, client_name, email, password, phone_number, is_owner)
values(444, 'hose', 'rich_guy@poor.com', 'money-talks', '3224455533', false);
insert into users(id, client_name, email, password, phone_number, is_owner)
values(555, 'silvia', 'silvia@private-killers.com', 'silencer', '9993222133', false);


insert into order_menu_items(id, order_item_id, menu_item_id, quantity)
values(101, 150, 200, 1);
insert into order_menu_items(id, order_item_id, menu_item_id, quantity)
values(202, 250, 300, 2);
insert into order_menu_items(id, order_item_id, menu_item_id, quantity)
values(303, 350, 100, 4);
insert into order_menu_items(id, order_item_id, menu_item_id, quantity)
values(404, 450, 200, 2);
insert into order_menu_items(id, order_item_id, menu_item_id, quantity)
values(505, 550, 500, 3);


insert into orders(id, menu_items_id, user_id, is_ready, accepted, order_menu_item_id)
values(901, 100, 10, true, true, 101);
insert into orders(id, menu_items_id, user_id, is_ready, accepted, order_menu_item_id)
values(902, 200, 20, true, true, 101);
insert into orders(id, menu_items_id, user_id, is_ready, accepted, order_menu_item_id)
values(903, 300, 30, false, true, 303);
insert into orders(id, menu_items_id, user_id, is_ready, accepted, order_menu_item_id)
values(904, 100, 10, false, true, 404);
insert into orders(id, menu_items_id, user_id, is_ready, accepted, order_menu_item_id)
values(905, 400, 50, false, true, 101);
insert into orders(id, menu_items_id, user_id, is_ready, accepted, order_menu_item_id)
values(906, 100, 10, false, false, 202);





