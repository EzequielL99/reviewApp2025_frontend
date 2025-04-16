import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateReviewView from "@/views/reviews/CreateReviewView";
import EditReviewView from "./views/reviews/EditReviewView";
import ReviewDetailsView from "./views/reviews/ReviewDetailsView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";

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

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
