create table user (
  id int primary key auto_increment not null,
  username varchar(50) not null,
  email varchar(255) not null unique,
  hashed_password varchar(255) not null,
  is_admin boolean not null,
  percentage_score DECIMAL(5,2) default 0.00,
  rate int,
  created_at timestamp default current_timestamp()
);

create table question (
  id INT PRIMARY KEY AUTO_INCREMENT,
    intitule TEXT NOT NULL,
    option1 VARCHAR(255) NOT NULL,
    option2 VARCHAR(255) NOT NULL,
    option3 VARCHAR(255) NOT NULL,
    option4 VARCHAR(255) NOT NULL,
    correct_option INT NOT NULL,
    difficulty VARCHAR(50),
    theme VARCHAR(50),
    is_valid boolean
);

create table user_results (
  id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    question_id INT,
    is_correct boolean,
    FOREIGN KEY(user_id) REFERENCES user(id),
    FOREIGN KEY(question_id) REFERENCES question(id)
);
  
 

