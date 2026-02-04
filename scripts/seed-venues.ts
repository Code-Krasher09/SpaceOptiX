import "dotenv/config";
import { connectDb } from "../src/lib/db";
import { Venue } from "../src/lib/models/Venue";

const venues = [
  {
    name: "Main Auditorium",
    code: "AUD-001",
    type: "AUDITORIUM",
    capacity: 500,
    location: { building: "Block A", floor: 1 },
    facilities: ["Projector", "Sound System", "Stage"],
    status: "ACTIVE",
  },
  {
    name: "Computer Lab 1",
    code: "LAB-101",
    type: "LAB",
    capacity: 60,
    location: { building: "Block C", floor: 2 },
    facilities: ["PCs", "AC", "Whiteboard"],
    status: "ACTIVE",
  },
  {
    name: "Physics Lab",
    code: "LAB-201",
    type: "LAB",
    capacity: 40,
    location: { building: "Block B", floor: 2 },
    facilities: ["Lab Benches", "Safety Gear"],
    status: "ACTIVE",
  },
  {
    name: "Seminar Hall",
    code: "AUD-010",
    type: "AUDITORIUM",
    capacity: 120,
    location: { building: "Block A", floor: 2 },
    facilities: ["Projector", "AC"],
    status: "ACTIVE",
  },
  {
    name: "Classroom 3A",
    code: "CR-3A",
    type: "CLASSROOM",
    capacity: 80,
    location: { building: "Block D", floor: 3 },
    facilities: ["Whiteboard", "Projector"],
    status: "ACTIVE",
  },
  {
    name: "Sports Ground",
    code: "GRD-001",
    type: "GROUND",
    capacity: 800,
    location: { building: "Outdoor", floor: 0 },
    facilities: ["Lighting", "Changing Rooms"],
    status: "ACTIVE",
  },
];

async function seed() {
  await connectDb();

  const results = await Promise.all(
    venues.map((venue) =>
      Venue.updateOne({ code: venue.code }, { $set: venue }, { upsert: true }),
    ),
  );

  const upserted = results.filter((result) => result.upsertedCount > 0).length;
  const updated = results.length - upserted;

  // eslint-disable-next-line no-console
  console.log(`Seeded venues: ${upserted} inserted, ${updated} updated.`);
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  });
