const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Airbus" },
        { name: "ATR" },
        { name: "Boeing" },
        { name: "Bombardier" },
        { name: "Embraer" },
        { name: "Engineering" },
        { name: "Aircraft Engine Run-up" },
        { name: "Aircraft General Familiarization" },
        { name: "Auditors training" },
        { name: "Aviation legislation" },
        { name: "Barescope Inspection" },
        { name: "Component Maintenance" },
        { name: "Engineering (CAMO)" },
        { name: "EWIS" },
        { name: "Fuel Tank Safety" },
        { name: "Ground Handling" },
        { name: "Human Factors" },
        { name: "Instructors Training" },
        { name: "Logistics" },
        { name: "Safety Management System (SMS)" },
      ],
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
