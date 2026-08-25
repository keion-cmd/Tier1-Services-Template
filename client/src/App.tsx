/**
 * Companion Field Notes design reminder: the core Tier 1 journey has three routes;
 * the optional Location Page is a user-authorized extension for this demo.
 */
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SiteShell } from "./components/SiteShell";
import Home from "./pages/Home";
import Location from "./pages/Location";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import About from "./pages/About";
import Proof from "./pages/Proof";
import FAQ from "./pages/FAQ";
import Team from "./pages/Team";
import DoctorDetail from "./pages/DoctorDetail";
import Resources from "./pages/Resources";
import ArticleDetail from "./pages/ArticleDetail";
import NewClients from "./pages/NewClients";

function Routes() {
  return <Switch><Route path="/" component={Home} /><Route path="/about" component={About} /><Route path="/services" component={Services} /><Route path="/services/:slug" component={ServiceDetail} /><Route path="/proof" component={Proof} /><Route path="/faq" component={FAQ} /><Route path="/location" component={Location} /><Route path="/team" component={Team} /><Route path="/team/:slug" component={DoctorDetail} /><Route path="/resources" component={Resources} /><Route path="/resources/:slug" component={ArticleDetail} /><Route path="/new-clients" component={NewClients} /><Route component={Home} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><SiteShell><Routes /></SiteShell></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
