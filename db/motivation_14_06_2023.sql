-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Июн 14 2023 г., 17:11
-- Версия сервера: 10.4.28-MariaDB
-- Версия PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `motivation`
--

-- --------------------------------------------------------

--
-- Структура таблицы `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL COMMENT 'ID',
  `first_name` varchar(50) NOT NULL COMMENT 'Имя',
  `last_name` varchar(50) NOT NULL COMMENT 'Фамилия',
  `middle_name` varchar(50) DEFAULT NULL COMMENT 'Отчество',
  `birthday` date DEFAULT NULL COMMENT 'День рожедния',
  `likes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`likes`)),
  `position_id` int(4) DEFAULT NULL COMMENT 'ID Должности',
  `block` text DEFAULT NULL COMMENT 'Отдел',
  `salary` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Зарплата',
  `target_completion` decimal(5,2) NOT NULL DEFAULT 0.00 COMMENT 'Выполнение плана',
  `bonuses` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Премия и бонусы',
  `vacation_days` int(2) DEFAULT NULL COMMENT 'Дней отпуска',
  `position_days` int(4) DEFAULT NULL COMMENT 'Дней в компании',
  `avatar_img` text DEFAULT NULL COMMENT 'Аватар'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `employees`
--

INSERT INTO `employees` (`id`, `first_name`, `last_name`, `middle_name`, `birthday`, `likes`, `position_id`, `block`, `salary`, `target_completion`, `bonuses`, `vacation_days`, `position_days`, `avatar_img`) VALUES
(1, 'Дмитрий', 'Немков', 'Александрович', '2003-03-18', '[2,9,10]', 1, 'Центральный Аппарат - Блок клиентских продаж', 50000.00, 110.00, 6000.00, 3, 33, 'https://imgtr.ee/images/2023/06/04/b0YEM.jpg'),
(2, 'Петр', 'Петров', 'Петрович', '2001-01-04', '[9]', 2, 'Уральский банк - Блок центрального Урала', 56000.00, 120.10, 12000.00, 9, 120, 'https://imgtr.ee/images/2023/06/03/SXD7U.jpg'),
(9, 'Семен', 'Семенов', 'Семенович', '2001-01-04', '[9]', 1, 'Уральский банк - Блок центрального Урала', 28400.00, 85.00, 1200.00, 3, 55, 'https://imgtr.ee/images/2023/06/03/SXW5i.png'),
(10, 'Александр', 'Немков', 'Владимировоич', '1994-06-15', '[9,1]', 1, 'Уральский банк - Блок центрального Урала', 25500.00, 63.00, 1600.00, 1, 14, 'https://imgtr.ee/images/2023/06/03/SXCdc.png'),
(11, 'Иван', 'Иванов', 'Иванович', '1996-03-05', '[9,1,2,10]', 1, 'Уральский банк - Блок центрального Урала', 39500.00, 132.00, 9500.00, 21, 324, 'https://imgtr.ee/images/2023/06/04/b0Qys.png');

--
-- Триггеры `employees`
--
DELIMITER $$
CREATE TRIGGER `onAddEmployee` AFTER INSERT ON `employees` FOR EACH ROW BEGIN
INSERT INTO searchEmployees (id, fio, avatar_img) VALUES (NEW.id, CONCAT(NEW.last_name, ' ', NEW.first_name, ' ', NEW.middle_name), NEW.avatar_img);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `onAvatar` AFTER UPDATE ON `employees` FOR EACH ROW BEGIN 
UPDATE searchEmployees SET avatar_img = NEW.avatar_img WHERE id = NEW.id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL COMMENT 'ID',
  `employee_id` int(11) NOT NULL COMMENT 'ID Сотрудника',
  `stars` decimal(2,1) DEFAULT NULL COMMENT 'Звездный рейтинг',
  `balls` int(11) DEFAULT NULL COMMENT 'Баллы',
  `execution_plan` decimal(5,2) DEFAULT NULL COMMENT 'Выполнение плана',
  `month_sales` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Месячные продажи',
  `year_sales` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Годовые продажи',
  `last_sales` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Последние продажи'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `rating`
--

INSERT INTO `rating` (`id`, `employee_id`, `stars`, `balls`, `execution_plan`, `month_sales`, `year_sales`, `last_sales`) VALUES
(1, 1, 5.0, 100, 105.10, '[{\"date\":\"2023-01-01\",\"sales\":16404},{\"date\":\"2023-02-01\",\"sales\":33171},{\"date\":\"2023-03-01\",\"sales\":37063},{\"date\":\"2023-04-01\",\"sales\":23062},{\"date\":\"2023-05-01\",\"sales\":35919},{\"date\":\"2023-06-01\",\"sales\":37924}]', '[{\"date\":\"2023-01-01\",\"sales\":189712},{\"date\":\"2022-01-01\",\"sales\":213684},{\"date\":\"2021-01-01\",\"sales\":112767}]', '[{\"date\":\"2023-01-30\",\"sales\":9949},{\"date\":\"2023-01-29\",\"sales\":6296},{\"date\":\"2023-01-28\",\"sales\":4502},{\"date\":\"2023-01-27\",\"sales\":5588},{\"date\":\"2023-01-26\",\"sales\":5594},{\"date\":\"2023-01-25\",\"sales\":3829},{\"date\":\"2023-01-24\",\"sales\":4096},{\"date\":\"2023-01-23\",\"sales\":9926},{\"date\":\"2023-01-22\",\"sales\":4991},{\"date\":\"2023-01-21\",\"sales\":2456},{\"date\":\"2023-01-20\",\"sales\":8546},{\"date\":\"2023-01-19\",\"sales\":9606},{\"date\":\"2023-01-18\",\"sales\":4995},{\"date\":\"2023-01-17\",\"sales\":3439},{\"date\":\"2023-01-16\",\"sales\":8080},{\"date\":\"2023-01-15\",\"sales\":9646},{\"date\":\"2023-01-14\",\"sales\":8308},{\"date\":\"2023-01-13\",\"sales\":4722},{\"date\":\"2023-01-12\",\"sales\":8857},{\"date\":\"2023-01-11\",\"sales\":9714},{\"date\":\"2023-01-10\",\"sales\":7237},{\"date\":\"2023-01-09\",\"sales\":3267},{\"date\":\"2023-01-08\",\"sales\":9930},{\"date\":\"2023-01-07\",\"sales\":4946},{\"date\":\"2023-01-06\",\"sales\":8210},{\"date\":\"2023-01-05\",\"sales\":6569},{\"date\":\"2023-01-04\",\"sales\":8207},{\"date\":\"2023-01-03\",\"sales\":8556},{\"date\":\"2023-01-02\",\"sales\":5136},{\"date\":\"2023-01-01\",\"sales\":2139}]'),
(2, 2, 4.5, 94, 125.50, '[{\"date\":\"2023-01-01\",\"sales\":17192},{\"date\":\"2023-02-01\",\"sales\":8535},{\"date\":\"2023-03-01\",\"sales\":42322},{\"date\":\"2023-04-01\",\"sales\":32640},{\"date\":\"2023-05-01\",\"sales\":21572},{\"date\":\"2023-06-01\",\"sales\":43651}]', '[{\"date\":\"2023-01-01\",\"sales\":107862},{\"date\":\"2022-01-01\",\"sales\":332229},{\"date\":\"2021-01-01\",\"sales\":251497}]', '[{\"date\":\"2023-01-30\",\"sales\":7322},{\"date\":\"2023-01-29\",\"sales\":2851},{\"date\":\"2023-01-28\",\"sales\":3767},{\"date\":\"2023-01-27\",\"sales\":5017},{\"date\":\"2023-01-26\",\"sales\":3070},{\"date\":\"2023-01-25\",\"sales\":6785},{\"date\":\"2023-01-24\",\"sales\":9000},{\"date\":\"2023-01-23\",\"sales\":2484},{\"date\":\"2023-01-22\",\"sales\":3456},{\"date\":\"2023-01-21\",\"sales\":8868},{\"date\":\"2023-01-20\",\"sales\":9273},{\"date\":\"2023-01-19\",\"sales\":5855},{\"date\":\"2023-01-18\",\"sales\":3222},{\"date\":\"2023-01-17\",\"sales\":6590},{\"date\":\"2023-01-16\",\"sales\":4960},{\"date\":\"2023-01-15\",\"sales\":3650},{\"date\":\"2023-01-14\",\"sales\":8831},{\"date\":\"2023-01-13\",\"sales\":4087},{\"date\":\"2023-01-12\",\"sales\":3723},{\"date\":\"2023-01-11\",\"sales\":2015},{\"date\":\"2023-01-10\",\"sales\":3826},{\"date\":\"2023-01-09\",\"sales\":5855},{\"date\":\"2023-01-08\",\"sales\":2716},{\"date\":\"2023-01-07\",\"sales\":9369},{\"date\":\"2023-01-06\",\"sales\":8196},{\"date\":\"2023-01-05\",\"sales\":3861},{\"date\":\"2023-01-04\",\"sales\":8209},{\"date\":\"2023-01-03\",\"sales\":5589},{\"date\":\"2023-01-02\",\"sales\":7245},{\"date\":\"2023-01-01\",\"sales\":4173}]'),
(3, 9, 5.0, 60, 60.00, NULL, NULL, NULL),
(4, 10, 1.5, 34, 33.00, NULL, NULL, NULL),
(5, 11, 5.0, 140, 132.00, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL COMMENT 'ID',
  `role_name` varchar(10) NOT NULL COMMENT 'Короткое название должности на англ',
  `role_desc` varchar(70) NOT NULL COMMENT 'Полное название должности'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `roles`
--

INSERT INTO `roles` (`id`, `role_name`, `role_desc`) VALUES
(1, 'KM', 'Клиентский менеджер'),
(2, 'RKM', 'Руководитель клиентского менеджера');

-- --------------------------------------------------------

--
-- Структура таблицы `salaries`
--

CREATE TABLE `salaries` (
  `id` int(11) NOT NULL COMMENT 'ID',
  `employee_id` int(11) NOT NULL COMMENT 'ID Сотрудника',
  `salary_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'История выплат зарплаты'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `salaries`
--

INSERT INTO `salaries` (`id`, `employee_id`, `salary_data`) VALUES
(1, 1, '[{\"date\":\"2023-06-05\",\"salary\":50000,\"bonuse\":6000},{\"date\":\"2023-05-05\",\"salary\":50000,\"bonuse\":2000},{\"date\":\"2023-04-05\",\"salary\":45000,\"bonuse\":7000},{\"date\":\"2023-03-05\",\"salary\":45000,\"bonuse\":3500},{\"date\":\"2023-02-05\",\"salary\":45000,\"bonuse\":2500},{\"date\":\"2023-01-05\",\"salary\":40000,\"bonuse\":3000}]'),
(2, 2, '[{\"date\":\"2023-06-05\",\"salary\":56000,\"bonuse\":12000},{\"date\":\"2023-05-05\",\"salary\":52000,\"bonuse\":10500},{\"date\":\"2023-04-05\",\"salary\":52000,\"bonuse\":8000},{\"date\":\"2023-03-05\",\"salary\":52000,\"bonuse\":8000},{\"date\":\"2023-02-05\",\"salary\":47500,\"bonuse\":4500},{\"date\":\"2023-01-05\",\"salary\":47500,\"bonuse\":2500}]');

-- --------------------------------------------------------

--
-- Структура таблицы `searchEmployees`
--

CREATE TABLE `searchEmployees` (
  `id` int(11) NOT NULL DEFAULT 0 COMMENT 'ID',
  `fio` varchar(152) DEFAULT NULL COMMENT 'ФИО',
  `avatar_img` text DEFAULT NULL COMMENT 'Аватар'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `searchEmployees`
--

INSERT INTO `searchEmployees` (`id`, `fio`, `avatar_img`) VALUES
(1, 'Немков Дмитрий Александрович', 'https://imgtr.ee/images/2023/06/04/b0YEM.jpg'),
(2, 'Петров Петр Петрович', 'https://imgtr.ee/images/2023/06/03/SXD7U.jpg'),
(9, 'Семенов Семен Семенович', 'https://imgtr.ee/images/2023/06/03/SXW5i.png'),
(10, 'Немков Александр Владимирович', 'https://imgtr.ee/images/2023/06/03/SXCdc.png'),
(11, 'Иванов Иван Иванович', 'https://imgtr.ee/images/2023/06/04/b0Qys.png');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL COMMENT 'ID',
  `employee_id` int(11) NOT NULL COMMENT 'ID Сотрудника',
  `login` varchar(50) NOT NULL COMMENT 'Логин',
  `password` varchar(255) NOT NULL COMMENT 'Пароль'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `employee_id`, `login`, `password`) VALUES
(1, 1, 'nemkov-da', '$2a$07$1LbepC3x0SNYF1d/g1MVROX2DuQtdoRL8acBR3qx0IPzw.mMvg7cK'),
(2, 2, 'test', '$2b$07$sTUomRwuXgI5ABnz8q6RCeurPAQzu2NMavbOi1mJ923N.oCjJTcOO');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `position_id` (`position_id`);

--
-- Индексы таблицы `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Индексы таблицы `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `salaries`
--
ALTER TABLE `salaries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Индексы таблицы `searchEmployees`
--
ALTER TABLE `searchEmployees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employee_id` (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employee_id` (`employee_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `salaries`
--
ALTER TABLE `salaries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=3;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`position_id`) REFERENCES `roles` (`id`);

--
-- Ограничения внешнего ключа таблицы `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);

--
-- Ограничения внешнего ключа таблицы `salaries`
--
ALTER TABLE `salaries`
  ADD CONSTRAINT `salaries_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);

--
-- Ограничения внешнего ключа таблицы `searchEmployees`
--
ALTER TABLE `searchEmployees`
  ADD CONSTRAINT `searchemployees_ibfk_1` FOREIGN KEY (`id`) REFERENCES `employees` (`id`);

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
