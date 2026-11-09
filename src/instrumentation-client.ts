import { startAnalytics } from "@/lib/analytics";
import { analyticsAllowed } from "@/lib/consent";

// Runs in the browser before the app hydrates. Visitors who must opt in start analytics from the consent banner instead.
if (analyticsAllowed()) startAnalytics();
