import mongoose from "mongoose";
import dotenv from "dotenv";
import Doctor from "./models/Doctor.js";

dotenv.config();

const doctors = [
  {
    id: "1",
    name: "Dr. Saba Ahmed",
    spec: "Gynecologist",
    available: true,
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
  },
  {
    id: "2",
    name: "Dr. Ahmed Raza",
    spec: "Dermatologist",
    available: true,
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
  },
  {
    id: "3",
    name: "Dr. Muhammad Usman",
    spec: "Pediatricians",
    available: true,
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d",
  },
  {
    id: "4",
    name: "Dr. Rabia Shaheen",
    spec: "Neurologist",
    available: true,
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
  },
  {
    id: "5",
    name: "Dr. Ali Hassan",
    spec: "Neurologist",
    available: true,
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  },
  {
    id: "6",
    name: "Dr. Bilal Khan",
    spec: "General physician",
    available: true,
    img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7",
  },


  {
    id: "7",
    name: "Dr. Komal Riaz",
    spec: "Dermatologist",
    available: true,
    img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54",
  },
  {
    id: "8",
    name: "Dr. Fahad Mahmood",
    spec: "Gastroenterologist",
    available: true,
    img: "https://images.unsplash.com/photo-1612538498456-e861df91d4d0",
  },
  {
    id: "9",
    name: "Dr. Sana Iqbal",
    spec: "Gynecologist",
    available: true,
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde",
  },
  {
    id: "10",
    name: "Dr. Ayesha Noor",
    spec: "Pediatricians",
    available: true,
    img: "https://images.unsplash.com/photo-1598257006458-087169a1f08d",
  },
  {
    id: "11",
    name: "Dr. Hassan Tariq",
    spec: "General physician",
    available: true,
    img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c",
  },
  {
    id: "12",
    name: "Dr. Zain Ali",
    spec: "Neurologist",
    available: true,
    img: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471",
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Doctor.deleteMany(); // optional (clears old data)
    await Doctor.insertMany(doctors);

    console.log("Doctors seeded successfully ✅");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();