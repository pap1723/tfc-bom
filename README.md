# Bill of Materials for the PFAA Modpack for TFC

This program is written in JavaScript, NodeJS, ReactJS, and SQL.

### Program Design
The program is a helper application for a Minecraft modpack. The modpack is called Per Fabrica Ad Astra and it is built inside of the TerraFirmaCraft mod. The recipe designs for this particular pack are very involved and detailed. They require many different raw materials and sub-components to create a finished good. Keeping track of all of the required materials is difficult to do, so this program is designed to allow the user to "order" finished goods. Once the goods are ordered, the program uses a database to determine the total number of raw materials and the components that also need to be crafted.

### Features
* Dynamically created list of available finished goods based on a SQL database
* Bill of Materials Program breaks out the Sub-Assemblies and the Raw Materials required to craft the finished good
* User can set the number of components they already have on hand and the program will subtract these (and their corresponding raw materials) from the recipe
* While this program was written for a specific purpose, the underlying framework will support any system that utilizes a Bill of Materials

### Improvements Needed
* All code requires refactoring and clean-up
* Database needs to be restructured. It was designed as a relational database, but it was before I learned the proper way to setup and design a proper database.

### Why Was this Created?
This was my final project for my Web Development class in 2018. We were given a lot of leeway in the project we would choose. The only requirement is that the program should be written with JavaScript and have a client-side and server-side functionality. I elected to learn ReactJS and NodeJS in order to complete this project.
