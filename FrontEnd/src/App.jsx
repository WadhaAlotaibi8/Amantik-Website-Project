import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CollegeReports from "./pages/CollegeReports";
import FoundReports from "./pages/FoundReports";
import LostReports from "./pages/LostReports";
import UserPage from "./pages/UserPage";
import EditPage from "./pages/EditPage";
import FoundPage from "./pages/FoundPage";
import LostPage from "./pages/LostPage";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ItemLost from "./pages/lost-item";
import ItemFound from "./pages/found-item";



function App() {
  return (
    <Routes>

      {/* AUTH */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* MAIN PAGES */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/reports" element={<CollegeReports />} />

      {/* FOUND & LOST REPORT LISTS */}
      <Route path="/found" element={<FoundReports />} />
      <Route path="/foundreports" element={<FoundReports />} />
      <Route path="/lost" element={<LostReports />} />
      <Route path="/lostreports" element={<LostReports />} />

      {/* OTHER PAGES */}
      <Route path="/user" element={<UserPage />} />
      <Route path="/edit-profile" element={<EditPage />} />
      <Route path="/foundup" element={<FoundPage />} />
      <Route path="/lostp" element={<LostPage />} />
      <Route path="/chat" element={<ChatPage />} />

      {/* SUBMIT FORMS */}
      <Route path="/lost-item" element={<ItemLost />} />
      <Route path="/found-item" element={<ItemFound />} />

      {/* DETAILS */}
      <Route path="/found-details/:id" element={<FoundPage />} />
      <Route path="/lost-details/:id" element={<LostPage />} />
     

      <Route path="/lost/:id" element={<LostPage />} />
      <Route path="/found/:id" element={<FoundPage />} />



    </Routes>
  );
}

export default App;
