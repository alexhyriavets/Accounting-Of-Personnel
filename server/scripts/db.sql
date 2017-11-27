create table person (
    id int primary key auto_increment,
    fullName varchar(255) not null,
    patronymic varchar(255) not null,
    birthDate date not null,
    sex varchar(7) not null,
    adress varchar(255) not null,
    scienceDegree varchar(100)
);

create table position (
    code varchar(5) primary key,
    name varchar(100) not null,
    salary float not null   
);

create table subdivision (
  id int primary key auto_increment,
    name varchar(255) not null
);

create table department (
  id int primary key auto_increment,
    name varchar(255) not null
);

create table sub_dep (
    id int primary key auto_increment,
    subdivision_id int not null,
    department_id int not null,
    
    foreign key(subdivision_id) references subdivision(id),
    foreign key(department_id) references department(id)
);

create table staffing (
  id int primary key auto_increment,
    subdivision_id int not null,
    position_code varchar(7) not null,
    quantity int not null,
    
    foreign key(subdivision_id) references subdivision(id),
    foreign key(position_code) references position (code)
);

create table employee(
    tab_number int primary key,
    arrivalDate date not null,
    dismissalDate date,
    employment varchar(25) not null,
    rate float not null,
    subdivision_id int not null,
    department_id int not null,
    person_id int not null,
    position_code varchar(7) not null,
    
    foreign key(subdivision_id) references subdivision(id),
    foreign key(position_code) references position (code),
    foreign key(department_id) references department(id),
    foreign key(person_id) references person(id)
    
);

insert into person (fullname,patronymic,birthDate,sex,adress,scienceDegree) values
    ('Aleksandr Ivaniv', 'Ivanovich', '1997-11-10', 'male', 'Kiev city,Pushkina 25','bachelor'),
    ('Bezdyhaniuk Vlad', 'Oegovich', '1997-05-01', 'male', 'Kiev city,Katushkina 26','bachelor'),
    ('Gluhova Ludmila', 'Stepanovna', '1997-07-10', 'female', 'Lviv city,Vorovskoho 12', null);
    
insert into position (code,name,salary) values
	('8.183','Director',15000),
    ('8.129','Accountant',7000),
    ('8.158','Developer',12000);
    
insert into subdivision (name) values
	('Kiev factory'),
    ('Lviv factory'),
    ('Warsaw factory');
    
insert into department (name) values 
	('Bookkeeping'),
    ('Managment'),
    ('PR');
   
insert into sub_dep (subdivision_id,department_id) values
	(1,2),
    (1,3),
    (2,1),
    (3,2);
    
insert into staffing(subdivision_id,position_code,quantity) values 
	(1,'8.183',1),
    (2,'8.129',1),
    (3,'8.158',1);
    
insert into employee(tab_number,arrivalDate,dismissalDate,employment,rate,subdivision_id,department_id,person_id,position_code) values
	(38590,'2017-05-08',null,'staffer',1,1,3,1,'8.158'),
    (18953,'2017-02-02','2017-09-10','staffer',1,2,1,3,'8.129'),
    (38591, '2016-11-05',null,'moonlighter',0.5,1,2,2,'8.158');