/**
 * Companion Field Notes design reminder: only three fixed public routes keep the Tier 1 journey focused.
 */
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SiteShell } from "./components/SiteShell";
import Home from "./pages/Home";
import Services from "./pages/Services";
import RequestVisit from "./pages/RequestVisit";

function Routes() {
  return <Switch><Route path="/" component={Home} /><Route path="/services" component={Services} /><Route path="/request" component={RequestVisit} /><Route component={Home} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><SiteShell><Routes /></SiteShell></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
