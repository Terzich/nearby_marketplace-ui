import Marketplace from "./pages/Marketplace/Marketplace";
import Home from "./pages/Home";
import Management from "./pages/Management/Management";
import Navbar from "./navbar/Navbar";
import { Route, Routes } from "react-router-dom";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 12, 14),
  },
  {
    id: "e2",
    title: "New TV",
    amount: 799.49,
    date: new Date(2021, 2, 12),
  },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Marketplace items={DUMMY_EXPENSES}/>} />
          <Route path="/about" element={<Management />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
