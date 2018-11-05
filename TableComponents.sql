CREATE TABLE `RecipeIngredients` (
  `LineID` int(10) UNSIGNED NOT NULL,
  `Recipe` varchar(100) NOT NULL,
  `Ingredient` varchar(100) NOT NULL,
  `Quantity` tinyint(2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `RecipeIngredients`
  ADD PRIMARY KEY (`LineID`);

ALTER TABLE `RecipeIngredients`
  MODIFY `LineID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;COMMIT;

INSERT INTO `RecipeIngredients` (`LineID`, `Recipe`, `Ingredient`, `Quantity`) VALUES
(1, 'Ore Washing Plant', 'Iron Plate', 1),
(2, 'Ore Washing Plant', 'Bucket', 2),
(3, 'Ore Washing Plant', 'Basic Machine Casing', 1),
(4, 'Ore Washing Plant', 'Electric Motor', 2),
(5, 'Ore Washing Plant', 'Electronic Circuit', 1),
(6, 'Bucket', 'Steel Ingot', 3),
(7, 'Basic Machine Casing', 'Steel Plate', 8),
(8, 'Electric Motor', 'Tin Item Casing', 2),
(9, 'Electric Motor', 'Coil', 2),
(10, 'Electric Motor', 'Iron Ingot', 1),
(11, 'Electronic Circuit', 'Iron Plate', 1),
(12, 'Electronic Circuit', 'Redstone', 2),
(13, 'Electronic Circuit', 'Insulated Copper Cable', 6),
(14, 'Tin Item Casing', 'Tin Plate', 1),
(15, 'Coil', 'Iron Ingot', 1),
(16, 'Coil', 'Copper Cable', 8),
(17, 'Insulated Copper Cable', 'Copper Cable', 1),
(18, 'Insulated Copper Cable', 'Rubber', 1),
(19, 'Copper Cable', 'Copper Wire', 1),
(20, 'Copper Wire', 'Copper Strip', 1),
(21, 'Copper Strip', 'Copper Plate', 1);

CREATE TABLE `Ingredients` (
  `IngID` int(10) UNSIGNED NOT NULL,
  `Ingredient` varchar(100) NOT NULL,
  `Mod` varchar(100) NOT NULL,
  `QtyCraft` tinyint(2) UNSIGNED NOT NULL,
  `Category` tinyint(1) UNSIGNED NOT NULL,
  `Image` varchar(100) NOT NULL DEFAULT 'default.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `Ingredients`
  ADD PRIMARY KEY (`IngID`);

ALTER TABLE `Ingredients`
  MODIFY `IngID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;COMMIT;

INSERT INTO `Ingredients` (`IngID`, `Ingredient`, `Mod`, `QtyCraft`, `Category`, `Image`) VALUES
(1, 'Ore Washing Plant', 'IC2', 1, 1, 'ic2-ore-washing-plant.png'),
(2, 'Bucket', 'Minecraft', 1, 1, 'bucket.png'),
(3, 'Basic Machine Casing', 'IC2', 1, 1, 'ic2-basic-machine-casing.png'),
(4, 'Electric Motor', 'IC2', 1, 1, 'ic2-electric-motor.png'),
(5, 'Electronic Circuit', 'IC2', 1, 1, 'ic2-electronic-circuit.png'),
(6, 'Tin Item Casing', 'IC2', 2, 1, 'ic2-tin-item-casing.png'),
(7, 'Coil', 'IC2', 1, 1, 'ic2-coil.png'),
(8, 'Insulated Copper Cable', 'IC2', 1, 1, 'ic2-insulated-copper-cable.png'),
(9, 'Copper Cable', 'IC2', 2, 1, 'ic2-copper-cable.png'),
(10, 'Copper Wire', 'IE', 1, 1, 'default.png'),
(11, 'Copper Strip', 'TFC', 2, 1, 'default.png'),
(12, 'Iron Ingot', 'Minecraft', 1, 0, 'iron-ingot.png'),
(13, 'Iron Plate', 'TFC', 1, 0, 'iron-plate.png'),
(14, 'Steel Ingot', 'TFC', 1, 0, 'steel-ingot.png'),
(15, 'Steel Plate', 'TFC', 1, 0, 'steel-plate.png'),
(16, 'Copper Ingot', 'TFC', 1, 0, 'copper-ingot.png'),
(17, 'Copper Plate', 'TFC', 1, 0, 'copper-plate.png'),
(18, 'Tin Ingot', 'TFC', 1, 0, 'tin-ingot.png'),
(19, 'Tin Plate', 'TFC', 1, 0, 'tin-plate.png'),
(20, 'Redstone', 'Minecraft', 1, 0, 'redstone.png'),
(21, 'Rubber', 'TFC', 1, 0, 'rubber.png');


INSERT INTO `Ingredients` (`Ingredient`, `Mod`, `QtyCraft`, `Category`, `Image`) VALUES
('IE Refinery', 'IE', 1, 1, 'default.png'),
('Steel Scaffolding', 'IE', 12, 1, 'default.png'),
('Light Engineering Block', 'IE', 4, 1, 'default.png'),
('Sheet Metal', 'IE', 6, 1, 'default.png'),
('Heavy Engineering Block', 'IE', 4, 1, 'default.png'),
('Steel Fence', 'IE', 3, 1, 'default.png'),
('Iron Mechanical Component', 'IE', 1, 1, 'default.png'),
('Steel Mechanical Component', 'IE', 1, 1, 'default.png'),
('Piston', 'Minecraft', 1, 1, 'piston.png'),
('Steel Rod', 'IE', 2, 1, 'steel-rod.png'),
('Electrum Ingot', 'IE', 1, 0, 'electrum-ingot.png'),
('Wood Planks', 'Minecraft', 1, 0, 'wood-planks.png'),
('Stone', 'Minecraft', 1, 0, 'stone.png'),
('Redstone', 'Minecraft', 1, 0, 'redstone.png');


INSERT INTO `RecipeIngredients` (`Recipe`, `Ingredient`, `Quantity`) VALUES
('IE Refinery', 'Steel Scaffolding', 8),
('IE Refinery', 'Light Engineering Block', 6),
('IE Refinery', 'Sheet Metal', 24),
('IE Refinery', 'Heavy Engineering Block', 3),
('Steel Scaffolding', 'Steel Ingot', 3),
('Steel Scaffolding', 'Steel Fence', 3),
('Light Engineering Block', 'Iron Ingot', 4),
('Light Engineering Block', 'Copper Ingot', 3),
('Light Engineering Block', 'Iron Mechanical Component', 2),
('Heavy Engineering Block', 'Steel Ingot', 4),
('Heavy Engineering Block', 'Steel Mechanical Component', 2),
('Heavy Engineering Block', 'Piston', 2),
('Heavy Engineering Block', 'Electrum Ingot', 1),
('Sheet Metal', 'Iron Plate', 4),
('Steel Fence', 'Steel Rod', 6),
('Iron Mechanical Component', 'Iron Ingot', 4),
('Iron Mechanical Component', 'Copper Ingot', 1),
('Steel Mechanical Component', 'Steel Ingot', 4),
('Steel Mechanical Component', 'Copper Ingot', 1),
('Piston', 'Iron Ingot', 1),
('Piston', 'Wood Planks', 3),
('Piston', 'Stone', 4),
('Piston', 'Redstone', 1),
('Steel Rod', 'Steel Ingot', 1);

INSERT INTO `Recipes` (`RecipeID`, `Recipe`, `Category`) VALUES
(2, 'IE Refinery', 1);