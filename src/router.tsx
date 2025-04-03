import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateReviewView from "@/views/reviews/CreateReviewView";
import EditReviewView from "./views/reviews/EditReviewView";
import ReviewDetailsView from "./views/reviews/ReviewDetailsView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/reviews/create" element={<CreateReviewView />} />
          <Route path="/reviews/:reviewId" element={<ReviewDetailsView />} />
          <Route path="/reviews/:reviewId/edit" element={<EditReviewView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
