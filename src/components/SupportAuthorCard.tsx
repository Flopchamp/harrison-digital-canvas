import { Coffee, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import AuthorIdentity from "@/components/AuthorIdentity";
import type { Profile } from "@/hooks/useProfile";

interface SupportAuthorCardProps {
  profile?: Pick<Profile, "full_name" | "title" | "avatar_url" | "github_url" | "linkedin_url"> | null;
  coffeeUrl?: string | null;
  className?: string;
}

/**
 * End-of-article "who wrote this, and how to connect with or support them"
 * card. Uses Card + the same `glass-card` treatment Projects/Blog cards use —
 * not Footer's bg-card/50 chrome — since this is content-card, not page chrome.
 * Deliberately no whole-card hover effect: unlike a project/post card, nothing
 * happens on a click anywhere in the card, only on its individual buttons, so
 * a card-wide hover would imply an affordance that isn't there.
 * Renders nothing if `profile` hasn't resolved yet (mirrors BlogPost's
 * pre-existing top-of-article byline, likewise conditional on profile data).
 */
const SupportAuthorCard = ({ profile, coffeeUrl, className }: SupportAuthorCardProps) => {
  if (!profile) return null;

  const hasSocialLinks = Boolean(profile.github_url || profile.linkedin_url);

  return (
    <section aria-label="Connect with and support the author" className={cn("mb-12", className)}>
      <Card className="glass-card p-6 md:p-8">
        <AuthorIdentity name={profile.full_name} title={profile.title} avatarUrl={profile.avatar_url} />

        <p className="text-sm text-muted-foreground mt-4 max-w-2xl leading-relaxed">
          Thanks for reading — if this article helped you, here's how you can support the work. It
          helps me keep writing in-depth technical content and maintaining my open-source projects.
        </p>

        {(coffeeUrl || hasSocialLinks) && (
          <div className="flex flex-wrap items-center gap-3 mt-5">
            {coffeeUrl && (
              <Button variant="outline" size="sm" className="social-icon-button" asChild>
                <a href={coffeeUrl} target="_blank" rel="noopener noreferrer">
                  <Coffee className="w-4 h-4" />
                  Buy me a coffee
                </a>
              </Button>
            )}

            {hasSocialLinks && (
              <div className="flex items-center gap-2">
                {profile.github_url && (
                  <Button variant="outline" size="icon" className="social-icon-button" asChild>
                    <a href={profile.github_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {profile.linkedin_url && (
                  <Button variant="outline" size="icon" className="social-icon-button" asChild>
                    <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </Card>
    </section>
  );
};

export default SupportAuthorCard;
