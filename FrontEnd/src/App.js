import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import HomePage from "./pages/HomePage";
import LostReports from "./pages/LostReports";
import FoundReports from "./pages/FoundReports";

import CollegeReports from "./pages/CollegeReports";
import UserPage from "./pages/UserPage";
import EditPage from "./pages/EditPage";
import ChatPage from "./pages/ChatPage";

import ItemLost from "./pages/lost-item";
import ItemFound from "./pages/found-item";


function App() {
  return (
    <Router>
      <Routes>

        {/* DEFAULT PAGE */}
        <Route path="/" element={<LoginPage />} />

        {/* AUTH */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* MAIN APP PAGES */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/lost" element={<LostReports />} />
        <Route path="/found" element={<FoundReports />} />

        <Route path="/reports" element={<CollegeReports />} />
        <Route path="/foundp" element={<FoundPage />} />
        <Route path="/lostp" element={<LostPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/chat" element={<ChatPage />} />

        {/* POST ITEM SCREENS */}
        <Route path="/lost-item" element={<ItemLost />} />
        <Route path="/found-item" element={<ItemFound />} />

      </Routes>
    </Router>
  );
}

export default App;
