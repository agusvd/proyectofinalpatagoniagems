-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 08-07-2023 a las 03:57:32
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `patagoniagems`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_id`
--

CREATE TABLE `categoria_id` (
  `id` int(11) NOT NULL,
  `categoria` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria_id`
--

INSERT INTO `categoria_id` (`id`, `categoria`) VALUES
(1, 'categoria 1'),
(2, 'categoria 2'),
(6, 'categoria 50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes_productos`
--

CREATE TABLE `imagenes_productos` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `imagen` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `precio` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `es_destacado` enum('si','no') NOT NULL DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `categoria_id`, `es_destacado`) VALUES
(3, 'producto 1', 'producto 1', 100, 10, 1, 'no'),
(4, 'producto 2', 'producto 2', 4000, 15, 2, 'no'),
(5, 'producto 3', 'producto 3', 100, 12, 1, 'si'),
(9, 'jabon 2', 'jabon 2', 1500, 10, 1, 'no'),
(10, 'vela 1', 'vela 1', 2000, 5, 1, 'no'),
(12, 'jabon 3', 'jabon 3', 2400, 6, 1, 'no'),
(13, 'jabon 4', 'jabon 4', 2400, 9, 2, 'no'),
(14, 'jabon 5', 'jabon 5', 2000, 2, 2, 'no'),
(15, 'jabon 6', 'jabon 6', 2800, 7, 1, 'no'),
(18, 'tarot 1', 'tarot 1', 15800, 3, 2, 'no'),
(19, 'tarot 2', 'tarot 2', 17000, 4, 2, 'no'),
(20, 'tarot 3', 'tarot 3', 20000, 5, 2, 'no'),
(21, 'joya 1', 'joya 1', 30000, 1, 1, 'no'),
(22, 'joya 2', 'joya 2', 14000, 3, 2, 'no'),
(23, 'collar 1', 'collar 1', 21800, 2, 2, 'no'),
(24, 'collar 3', 'collar 3', 13900, 3, 2, 'no'),
(27, 'otra cosa 1', 'otra cosa 1', 500, 10, 2, 'no'),
(28, 'otra cosa 2', 'otra cosa 2', 1000, 10, 2, 'no'),
(29, 'otra cosa 3', 'otra cosa 3', 1500, 40, 1, 'no'),
(30, 'otra cosa 4', 'otra cosa 4', 1400, 3, 2, 'no'),
(31, 'otra cosa 6', 'orta cosa 6', 7000, 20, 1, 'no');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `email` varchar(150) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `region` varchar(255) DEFAULT NULL,
  `comuna` varchar(255) DEFAULT NULL,
  `nombreCalle` varchar(255) DEFAULT NULL,
  `numeroCalle` int(11) DEFAULT NULL,
  `ciudad` varchar(255) DEFAULT NULL,
  `numeroDepa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `contraseña`, `role`, `region`, `comuna`, `nombreCalle`, `numeroCalle`, `ciudad`, `numeroDepa`) VALUES
(1, 'Agustin', 'Villarroel', 'agus@gmail.com', '$2b$10$.HGssuNG2.iFLQCVoewx6.adML8/yFRpgPBaskftyhq5VbdqQFdgu', 'admin', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Claudio', 'Arias', 'claudio@gmail.com', '$2b$10$l/BQmYG0XwXIq3Wyb/WtH.L90XoFKS9UFoGtkUxfVhW2rO0Fj//Ba', 'user', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Manuel', 'Poto', 'manuel@gmail.com', '$2b$10$1Kb63ot8EVLgwYviIgeDGurAX4V/gd06viLUPRPtEX98H62CVme22', 'user', NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria_id`
--
ALTER TABLE `categoria_id`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `imagenes_productos`
--
ALTER TABLE `imagenes_productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria_id`
--
ALTER TABLE `categoria_id`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `imagenes_productos`
--
ALTER TABLE `imagenes_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `imagenes_productos`
--
ALTER TABLE `imagenes_productos`
  ADD CONSTRAINT `imagenes_productos_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria_id` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
